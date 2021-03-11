import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import UnderlyingTokenContract from "../contracts/UnderlyingToken.json";
import LPTokenContract from "../contracts/LPToken.json";

import {
  Box,
  BoxTitle,
  Flex,
  Label,
  InputOuterContainer,
  Button,
  AmountInput,
  MaxButton,
  SelectedCurrency,
} from "./shared-components";

const formatBalance = (value) => {
  if (!value || value === null) {
    return "Error";
  }
  return `${value} ULT`;
};

export const AddLiquidity = () => {
  const { library, chainId, account } = useWeb3React();

  const [balance, setBalance] = useState();

  const [amount, setAmount] = useState("");

  const [approving, setApproving] = useState(false);
  const [depositing, isDepositing] = useState(false);

  const [isApproved, setIsApproved] = useState(false);

  const addLiquidity = () => {
    if (!isApproved) {
      approveLiquidity();
    } else {
      // Call deposit function
    }
  };

  const approveLiquidity = async () => {
    if (!(parseFloat(amount) > 0)) {
      return;
    }
    try {
      setApproving(true);
      const networkId = await library.eth.net.getId();
      const deployedNetwork = LPTokenContract.networks[networkId];
      const lpTokenContractInstance = new library.eth.Contract(
        UnderlyingTokenContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      await lpTokenContractInstance.methods
        .approve(
          "0x230f4021E5D55ceE65af12d2FCd8df7DC6F85759",
          library.utils.toWei(amount)
        )
        .call();
      setApproving(false);
      setIsApproved(true);
    } catch (error) {
      console.log(error);
      setApproving(false);
    }
  };

  const depositLiquidity = async () => {
    if (!(parseFloat(amount) > 0)) {
      return;
    }
    try {
      setApproving(true);
      const networkId = await library.eth.net.getId();
      const deployedNetwork = LPTokenContract.networks[networkId];
      const lpTokenContractInstance = new library.eth.Contract(
        UnderlyingTokenContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      await lpTokenContractInstance.methods
        .deposit(
          "0x230f4021E5D55ceE65af12d2FCd8df7DC6F85759",
          library.utils.toWei(amount)
        )
        .call();
      setApproving(false);
      setIsApproved(true);
    } catch (error) {
      console.log(error);
      setApproving(false);
    }
  };

  useEffect((): any => {
    let stale = false;

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
        if (!stale) {
          setBalance(ult);
        }
      } catch (error) {
        console.log(error);
        if (!stale) {
          setBalance(null);
        }
      }
    };

    if (account && library) {
      getULTBalance();
      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <Box>
      <BoxTitle>Add Liquidity</BoxTitle>
      <InputOuterContainer>
        <Flex style={{ marginBottom: "10px" }} spaceBetween>
          <Label>Amount</Label>
          <Label>{`Balance: ${formatBalance(balance)}`}</Label>
        </Flex>
        <Flex spaceBetween>
          <AmountInput
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="0.0"
          />
          <Flex style={{ marginLeft: "10px" }} alignCenter>
            <MaxButton onClick={() => setAmount(balance)} type="button">
              MAX
            </MaxButton>
            <SelectedCurrency>ULT</SelectedCurrency>
          </Flex>
        </Flex>
      </InputOuterContainer>
      <Button
        onClick={() => {
          addLiquidity();
        }}
        type="button"
      >
        Approve
      </Button>
    </Box>
  );
};
