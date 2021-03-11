import React from "react";
import { UnsupportedChainIdError } from "@web3-react/core";

import { NoEthereumProviderError } from "@web3-react/injected-connector";

export function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  }
  if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  }

  console.error(error);
  return "An unknown error occurred. Check the console for more details.";
}
