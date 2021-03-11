import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { injected } from "../utils";
import { Box, BoxTitle, Button } from "./shared-components";

export const ConnectWallet = () => {
  const { connector, activate } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <Box>
      <BoxTitle style={{ fontSize: "18px", marginBottom: "10px" }}>
        You need to connect your Ethereum address.
      </BoxTitle>
      <Button
        onClick={() => {
          setActivatingConnector(injected);
          activate(injected);
        }}
      >
        Connect
      </Button>
    </Box>
  );
};
