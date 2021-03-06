// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "./GovernanceToken.sol";
import "./LPToken.sol";
import "./UnderlyingToken.sol";


/*
    A simple liquidity pool smart contract, in which
    liquidity pool providers can deposit a token (Underlying Token)
    and will be rewarded with 
*/

contract LiquidityPool is LPToken {

    mapping(address => uint) public checkpoints;
    UnderlyingToken public underlyingToken;
    GovernanceToken public governanceToken;
    uint constant public REWARD_PER_BLOCK = 1;

    constructor(address _underlyingToken, address _governanceToken) {
        underlyingToken = UnderlyingToken(_underlyingToken);
        governanceToken = GovernanceToken(_governanceToken);
    }

    // Liquidity provider deposits amount into liquidity pool.
    function deposit (uint amount) external {
        require(underlyingToken.balanceOf(msg.sender) >= amount, "Not enough underlying tokens to spend.");

        // Check if it's the first time the liquidity provider is depositing.
        // If it is the first time, assign a checkpoint for the LP.
        // This is used to determine when the liquidity provider deposited.
        if (checkpoints[msg.sender] == 0) {
            checkpoints[msg.sender] = block.number;
        }
        _distributeRewards(msg.sender);
        underlyingToken.transferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, amount);
    }

    // This function lets the liquidity provider withdraw it's rewards and underlying tokens
    // Requirement is to have enough LP Tokens
    function withdraw (uint amount) external {
        require(balanceOf(msg.sender) >= amount, "Not enough LP tokens");
        // Distribute rewards (governance tokens) and send back amount of underlying tokens.
        _distributeRewards(msg.sender);
        underlyingToken.transfer(msg.sender, amount);
        // Figure this out...
        // My understanding is:
        // Burn the amount of LP tokens that are given back. 
        // This should decrease the supply in the market??
        _burn(msg.sender, amount);

        // If the full amount is withdrawn, should the checkpoint be reset?
        // delete checkpoints[msg.sender];
    }

    function _distributeRewards (address beneficiary) internal {
        // Get the block number / time when the LP deposited
        uint checkpoint = checkpoints[beneficiary];

        // Check how long the liquidity provider has had his deposit in the pool.
        uint blockDifference = block.number - checkpoint;
        if (blockDifference > 0) {
            // Calculate the reward distribution amount.
            // Current balance * how long deposited * reward per block constant
            uint distributionAmount = balanceOf(beneficiary) * blockDifference * REWARD_PER_BLOCK;
            // Mint the governance token and distribute it to the Liquidity Provider.
            governanceToken.mint(beneficiary, distributionAmount);
        }
    }
}