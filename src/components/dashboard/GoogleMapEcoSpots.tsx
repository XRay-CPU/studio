'use client';


import { useState } from 'react';
import { questData } from '@/data/quests';

// Map quest locations to coordinates for the SVG map
const locationCoords: Record<string, { x: number; y: number }> = {
  'Alaminos, Pangasinan': { x: 120, y: 80 }, // Hundred Islands
  'Bolinao, Pangasinan': { x: 200, y: 160 }, // Patar Beach, Giant Clam
  'Dasol, Pangasinan': { x: 260, y: 120 }, // Dasol Salt Farm
  'San Fabian, Pangasinan': { x: 320, y: 100 }, // Mangrove
  'Villasis, Pangasinan': { x: 80, y: 200 }, // Tupig
  // Add more as needed
};

const spots = questData.map((quest) => {
  const coords = locationCoords[quest.location] || { x: 200, y: 150 };
  return {
    id: quest.id,
    name: quest.title,
    x: coords.x,
    y: coords.y,
    description: quest.description,
    quest: quest.todos[0] || '',
  };
});


export default function GoogleMapEcoSpots() {
  const [activeSpot, setActiveSpot] = useState<null | number>(null);
  const [hoveredSpot, setHoveredSpot] = useState<null | number>(null);

  // Popup box dimensions
  const popupWidth = 380;
  const popupHeight = 70;
  const popupPadding = 10;
  const svgWidth = 400;
  const svgHeight = 300;

  // Helper to keep popup within bounds
  function getPopupPosition(x: number, y: number) {
    let px = x - popupWidth / 2;
    let py = y - 90;
    if (px < popupPadding) px = popupPadding;
    if (px + popupWidth > svgWidth - popupPadding) px = svgWidth - popupWidth - popupPadding;
    if (py < popupPadding) py = popupPadding;
    if (py + popupHeight > svgHeight - popupPadding) py = svgHeight - popupHeight - popupPadding;
    return { px, py };
  }

  return (
    <div className="w-full flex justify-center items-center" style={{ minHeight: 400 }}>
      <svg
        viewBox="0 0 400 300"
        width="100%"
        height="400"
        style={{ background: 'radial-gradient(circle at 60% 60%, #b3e5fc 60%, #0288d1 100%)', borderRadius: 20, boxShadow: '0 2px 12px #0002' }}
      >
        {/* Ocean background */}
        <rect x="0" y="0" width="400" height="300" fill="#b3e5fc" />
        {/* Island landmass with sand and grass */}
        <ellipse cx="200" cy="150" rx="170" ry="110" fill="#ffe082" />
        <ellipse cx="200" cy="150" rx="140" ry="85" fill="#a5d6a7" />
        {/* Some hills for effect */}
        <ellipse cx="140" cy="120" rx="30" ry="18" fill="#81c784" opacity="0.7" />
        <ellipse cx="260" cy="180" rx="22" ry="12" fill="#388e3c" opacity="0.5" />
        {/* Spots */}
        {spots.map((spot, i) => {
          const isActive = activeSpot === i;
          let popupPos = { px: 0, py: 0 };
          if (isActive) {
            popupPos = getPopupPosition(spot.x, spot.y);
          }
          return (
            <g key={spot.name}>
              <circle
                cx={spot.x}
                cy={spot.y}
                r={15}
                fill="#0288d1"
                stroke="#fff"
                strokeWidth={3}
                style={{ cursor: 'pointer', filter: isActive ? 'drop-shadow(0 0 8px #0288d1aa)' : undefined }}
                onClick={() => setActiveSpot(i)}
                onMouseEnter={() => setHoveredSpot(i)}
                onMouseLeave={() => setHoveredSpot(null)}
              />
              {(hoveredSpot === i) && (
                <text
                  x={spot.x}
                  y={spot.y + 30}
                  textAnchor="middle"
                  fontSize={15}
                  fill="#1a237e"
                  style={{ pointerEvents: 'none', userSelect: 'none', fontWeight: 600, opacity: 1, transition: 'opacity 0.2s' }}
                >
                  {spot.name}
                </text>
              )}
              {/* Popup */}
              {isActive && (
                <foreignObject
                  x={popupPos.px}
                  y={popupPos.py}
                  width={popupWidth}
                  height={popupHeight + 40}
                  style={{ overflow: 'visible' }}
                >
                  <div style={{
                    width: popupWidth,
                    height: popupHeight + 40,
                    background: '#fff',
                    border: '2px solid #0288d1',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px #0288d133',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                    <button
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 24,
                        height: 24,
                        border: 'none',
                        background: '#eee',
                        borderRadius: 5,
                        color: '#888',
                        fontSize: 18,
                        cursor: 'pointer',
                        lineHeight: 1,
                      }}
                      onClick={() => setActiveSpot(null)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <div style={{ fontWeight: 'bold', color: '#0288d1', fontSize: 16, marginBottom: 2 }}>{spot.name}</div>
                    <div style={{ fontStyle: 'italic', color: '#444', fontSize: 12, marginBottom: 2 }}>{spot.description}</div>
                    <div style={{ color: '#388e3c', fontWeight: 'bold', fontSize: 13, marginBottom: 8 }}>Quest: {spot.quest}</div>
                    {/* Go to button, links to quest details if possible */}
                    {spot.id && (
                      <a
                        href={`/dashboard/quests/${spot.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '6px 18px',
                          background: '#0288d1',
                          color: '#fff',
                          borderRadius: 8,
                          fontWeight: 600,
                          fontSize: 14,
                          textDecoration: 'none',
                          boxShadow: '0 1px 4px #0288d122',
                          marginTop: 4,
                          transition: 'background 0.2s',
                        }}
                        onClick={e => { e.stopPropagation(); }}
                      >
                        Go to
                      </a>
                    )}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
        {/* SVG filter for popup shadow */}
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
