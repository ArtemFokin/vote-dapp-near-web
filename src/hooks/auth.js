import { useCallback, useMemo } from "react";
import { useNear } from "../components/NearProvider/NearProvider";

export const useCheckAuth = () => {
  const { wallet } = useNear();
  const isAuth = useMemo(() => !!wallet.getAccountId(), [wallet]);
  return isAuth;
};

export const useLogin = () => {
  const { wallet, config } = useNear();
  const login = useCallback(
    (successUrl) => {
      console.log({ successUrl });
      wallet.requestSignIn({
        contractId: config.contractName,
        title: "Near Vote",
        successUrl,
      });
    },
    [wallet, config]
  );
  return login;
};

export const useLogout = () => {
  const { wallet } = useNear();
  const logout = useCallback(() => {
    wallet.signOut();
    window.location.reload();
  }, [wallet]);
  return logout;
};
