import React, { useState, useEffect, useContext, createContext } from "react";
import { Spin, Row } from "antd";
import * as nearAPI from "near-api-js";

const NearContext = createContext();

const NearProvider = ({ children, config }) => {
  const [near, setNear] = useState();
  const [wallet, setWallet] = useState();
  const [contract, setContract] = useState();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const nearInstance = await nearAPI.connect({
        deps: {
          keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
        },
        ...config,
      });
      const walletConnection = new nearAPI.WalletConnection(nearInstance);

      const contract = await new nearAPI.Contract(
        walletConnection.account(),
        config.contractName,
        {
          viewMethods: ["get"],
          changeMethods: ["create", "update", "del"],
          sender: walletConnection.getAccountId(),
        }
      );

      if (!cancelled) {
        setNear(nearInstance);
        setWallet(walletConnection);
        setContract(contract);
      }
    })();
    return () => (cancelled = true);
  }, [config]);

  if (!near || !wallet || !contract) {
    return (
      <Row justify="center">
        <Spin size="large" />
      </Row>
    );
  }

  return (
    <NearContext.Provider value={{ near, wallet, contract, config }}>
      {children}
    </NearContext.Provider>
  );
};

export const useNear = () => {
  const near = useContext(NearContext);
  return near;
};

export default NearProvider;