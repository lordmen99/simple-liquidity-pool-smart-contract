import React from "react";
import { useWeb3React } from "@web3-react/core";

import {
  AddLiquidity,
  Rewards,
  ConnectWallet,
  Container,
  Label,
  TextButton,
  Faucet,
} from "../components";

import { getErrorMessage } from "../utils";

export default function Home() {
  const { deactivate, active, error } = useWeb3React<any>();

  return (
    <Container>
      {active && <Faucet />}

      {!active && <ConnectWallet />}
      {active && (
        <>
          <AddLiquidity />
          <Rewards />
        </>
      )}

      {(active || error) && (
        <TextButton
          onClick={() => {
            deactivate();
          }}
        >
          Deactivate
        </TextButton>
      )}

      {!!error && (
        <Label style={{ marginTop: 10 }}>{getErrorMessage(error)}</Label>
      )}
    </Container>
  );
}
