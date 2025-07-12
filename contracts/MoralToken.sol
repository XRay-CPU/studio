// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MoralToken is ERC20, Ownable, ReentrancyGuard {
    using ECDSA for bytes32;

    mapping(bytes32 => bool) private _usedSignatures;
    address public relayer;
    
    event RewardClaimed(
        address indexed recipient,
        uint256 amount,
        string questId,
        uint256 timestamp,
        bytes32 txHash
    );

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        relayer = msg.sender;
    }

    function setRelayer(address _relayer) external onlyOwner {
        relayer = _relayer;
    }

    function executeReward(
        address recipient,
        uint256 amount,
        string calldata questId,
        uint256 timestamp,
        bytes calldata signature
    ) external nonReentrant returns (bool) {
        require(msg.sender == relayer, "Only relayer can execute rewards");
        
        bytes32 messageHash = keccak256(
            abi.encodePacked(recipient, amount, questId, timestamp)
        );
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        // Verify signature
        address signer = ethSignedMessageHash.recover(signature);
        require(signer == relayer, "Invalid signature");
        
        // Prevent replay attacks
        require(!_usedSignatures[messageHash], "Reward already claimed");
        _usedSignatures[messageHash] = true;
        
        // Transfer tokens
        _mint(recipient, amount);
        
        emit RewardClaimed(
            recipient,
            amount,
            questId,
            timestamp,
            messageHash
        );
        
        return true;
    }

    function batchExecuteRewards(
        Reward[] calldata rewards
    ) external nonReentrant returns (bool) {
        require(msg.sender == relayer, "Only relayer can execute rewards");
        
        for (uint i = 0; i < rewards.length; i++) {
            Reward memory reward = rewards[i];
            
            bytes32 messageHash = keccak256(
                abi.encodePacked(
                    reward.recipient,
                    reward.amount,
                    reward.questId,
                    reward.timestamp
                )
            );
            bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
            
            // Verify signature
            address signer = ethSignedMessageHash.recover(reward.signature);
            require(signer == relayer, "Invalid signature");
            
            // Prevent replay attacks
            require(!_usedSignatures[messageHash], "Reward already claimed");
            _usedSignatures[messageHash] = true;
            
            // Transfer tokens
            _mint(reward.recipient, reward.amount);
            
            emit RewardClaimed(
                reward.recipient,
                reward.amount,
                reward.questId,
                reward.timestamp,
                messageHash
            );
        }
        
        return true;
    }

    struct Reward {
        address recipient;
        uint256 amount;
        string questId;
        uint256 timestamp;
        bytes signature;
    }
}
