import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { Box, Flex, Label } from "./shared-components";

import GovernanceTokenContract from "../contracts/GovernanceToken.json";
import LPTokenContract from "../contracts/LPToken.json";
import UnderlyingTokenContract from "../contracts/UnderlyingToken.json";

export const Rewards = () => {
  const { library, account } = useWeb3React<any>();
  const [gtkBalance, setGTKBalance] = useState(0);
  const [lpTokenBalance, setLPTokenBalance] = useState(0);
  const [ultTokenBalance, setULTokenBalance] = useState(0);

  const getULTBalance = async () => {
    try {
      const networkId = await library.eth.net.getId();
      const deployedNetwork = UnderlyingTokenContract.networks[networkId];
      const underlyingTokenTokenContractInstance = new library.eth.Contract(
        UnderlyingTokenContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const res = await underlyingTokenTokenContractInstance.methods
        .balanceOf(account)
        .call();
      const ult = await library.utils.fromWei(res, "ether");
      setULTokenBalance(ult);
    } catch (error) {
      console.log(error);
    }
  };

  const getGTKBalance = async () => {
    try {
      const networkId = await library.eth.net.getId();
      const deployedNetwork = GovernanceTokenContract.networks[networkId];
      const governanceTokenContractInstance = new library.eth.Contract(
        GovernanceTokenContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const res = await governanceTokenContractInstance.methods
        .balanceOf(account)
        .call();
      const gtk = await library.utils.fromWei(res, "ether");
      setGTKBalance(gtk);
    } catch (error) {
      console.log(error);
    }
  };

  const getLPTokenBalance = async () => {
    try {
      const networkId = await library.eth.net.getId();
      const deployedNetwork = LPTokenContract.networks[networkId];
      const lpTokenContractInstance = new library.eth.Contract(
        LPTokenContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const res = await lpTokenContractInstance.methods
        .balanceOf(account)
        .call();
      const lp = await library.utils.fromWei(res, "ether");
      setLPTokenBalance(lp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGTKBalance();
    getLPTokenBalance();
    getULTBalance();
  }, [account]);

  return (
    <Box>
      <Flex smYPadding spaceBetween>
        <Label>Liquidity Provided</Label>
        <Label>{ultTokenBalance} ULT</Label>
      </Flex>
      <Flex smYPadding spaceBetween>
        <Label>Liquidity Pool Tokens</Label>
        <Label>{lpTokenBalance} LP</Label>
      </Flex>
      <Flex smYPadding spaceBetween>
        <Label>Rewards Earned</Label>
        <Label>{gtkBalance} GTK</Label>
      </Flex>
    </Box>
  );
};
