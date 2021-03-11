import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { TextButton, Button, Box } from "./shared-components";

import UnderlyingTokenContract from "../contracts/UnderlyingToken.json";

export const Faucet = () => {
  const [showFaucet, setShowFaucet] = useState(false);
  const { library, account } = useWeb3React<any>();

  const mintTokens = async () => {
    try {
      const networkId = await library.eth.net.getId();
      const deployedNetwork = UnderlyingTokenContract.networks[networkId];
      const underlyingTokenContractInstance = new library.eth.Contract(
        UnderlyingTokenContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      await underlyingTokenContractInstance.methods.faucet(account).call();
      await underlyingTokenContractInstance.methods.balanceOf(account).call();
      setShowFaucet(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!showFaucet && (
        <TextButton onClick={() => setShowFaucet(true)}>Show Faucet</TextButton>
      )}
      {showFaucet && (
        <>
          <TextButton onClick={() => setShowFaucet(false)}>
            Hide Faucet
          </TextButton>
          <Box>
            <Button onClick={() => mintTokens()}>Mint 100 ULT</Button>
          </Box>
        </>
      )}
    </>
  );
};
