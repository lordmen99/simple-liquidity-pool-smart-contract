// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UnderlyingToken is ERC20, Ownable {
    constructor() ERC20("Underyling Token", "ULT") {}

    // Faucet function for testing purposes
    function faucet(address to) external {
        _mint(to, 100 ether);
    }
}
