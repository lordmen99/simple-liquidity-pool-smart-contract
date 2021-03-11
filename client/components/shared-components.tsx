import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  padding: 30px;
  background-color: rgb(33, 36, 41);
  border-radius: 10px;
  -webkit-box-shadow: 0px 5px 20px 6px rgba(41, 41, 41, 1);
  -moz-box-shadow: 0px 5px 20px 6px rgba(41, 41, 41, 1);
  box-shadow: 0px 5px 20px 6px rgba(41, 41, 41, 1);
  min-width: 380px;
  margin: 10px;
`;

export const AmountInput = styled.input`
  border: 0;
  border-radius: 12px;
  background-color: transparent;
  font-size: 20px;
  color: white;
  &:focus {
    outline: 0;
  }
`;
export const InputOuterContainer = styled.div`
  margin: 20px 0px 20px 0px;
  padding: 20px;
  border: 1px solid rgb(44, 47, 54);
  border-radius: 12px;
`;

export const MaxButton = styled.button`
  height: 100%;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 8px;
  background-color: rgba(21, 61, 111, 0.44);
  color: rgb(109, 168, 255);
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  &:hover {
    border: 1px solid rgb(33, 114, 229);
  }
`;

export const SelectedCurrency = styled.span`
  margin-left: 10px;
  font-weigth: bold;
  font-size: 18px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: rgb(195, 197, 203);
`;

export const BoxTitle = styled.h2`
  margin: 0px;
  font-size: 12px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 20px;
  background-color: #cc0e74;
  border: none;
  color: white;
  border-radius: 20px;
  font-size: 20px;
  &:focus {
    outline: 0;
  }
  cursor: pointer;
`;

export const TextButton = styled.label`
  font-size: 12px;
  color: rgb(195, 197, 203);
  &:hover {
    color: rgb(109, 168, 255);
  }
  cursor: pointer;
  margin-top: 10px;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  ${(p) => p.spaceBetween && "justify-content: space-between;"}
  ${(p) => p.alignCenter && "align-items: center;"}

  ${(p) => p.smYPadding && "padding: 10px 0px 10px 0px;"}
  ${(p) => p.mdYPadding && "padding: 20px 0px 20px 0px;"}
  ${(p) => p.lgYPadding && "padding: 30px 0px 30px 0px;"}
  ${(p) => p.xlYPadding && "padding: 40px 0px 40px 0px;"}

  ${(p) => p.smXPadding && "padding: 0px; 10px 0px 10px"}
  ${(p) => p.mdXPadding && "padding: 0px 20px 0px 20px;"}
  ${(p) => p.lgXPadding && "padding: 0px 30px 0px 30px;"}
  ${(p) => p.xlXPadding && "padding: 0px 40px 0px 40px;"}
`;
