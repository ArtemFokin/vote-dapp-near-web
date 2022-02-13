import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState();

  useEffect(() => {
    let cancelled = false;
    (() => {
      setLoading(true);
      const state = await wallet.account().state();
      if (!cancelled) {
        setUserState(state);
        setLoading(false);
      }
    })();
    return () => (cancelled = true);
  }, [wallet]);

  return [userState, loading];
};
