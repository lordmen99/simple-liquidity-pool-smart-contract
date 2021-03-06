// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This could be something like UNI or AAVE token
contract LPToken is ERC20 {
    constructor() ERC20("LP Token", "LPK") {}
}
