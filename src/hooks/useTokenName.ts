import { useEffect, useState } from "react";
import { getContract } from "@/lib/getContract";

export function useTokenName() {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchName() {
      try {
        const contract = getContract();
        const n = await contract.name();
        setName(n);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchName();
  }, []);

  return { name, loading, error };
}
