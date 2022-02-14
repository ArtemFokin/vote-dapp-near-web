import { useEffect, useState } from "react";
import { useNear } from "./near";

export const useCurrentUser = () => {
  const { wallet } = useNear();
  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState();

  useEffect(() => {
    let cancelled = false;
    (async () => {
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
