import React from "react";
import Head from "next/head";
import "../styles/global.css";

import { Web3ReactProvider, useWeb3React } from "@web3-react/core";

import Web3 from "web3";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3(provider);
  // library.pollingInterval = 12000;
  return library;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps}>
        <Head>
          <title>Liquidity Mining</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </Component>
    </Web3ReactProvider>
  );
}
