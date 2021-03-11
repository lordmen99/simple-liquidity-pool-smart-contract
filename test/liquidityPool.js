
const { time } = require('@openzeppelin/test-helpers');
const UnderlyingToken = artifacts.require('UnderlyingToken.sol');
const GovernanceToken = artifacts.require('GovernanceToken.sol');
const LiquidityPool = artifacts.require('LiquidityPool.sol');

contract('liquidityPool', accounts => {
  const [admin, trader1, trader2, _] = accounts;
  let underlyingToken, governanceToken, liquidityPool;

  beforeEach(async () => {
    // Deploy token contracts
    underlyingToken = await UnderlyingToken.new();
    governanceToken = await GovernanceToken.new();

    // Deploy LiquidityPool contract with above tokens in constructor
    liquidityPool = await LiquidityPool.new(
      underlyingToken.address, 
      governanceToken.address
    );

    // Transfer governance token ownership to liquidity pool smart contract address.
    // Check what happens if you comment out below code.
    await governanceToken.transferOwnership(liquidityPool.address);

    // Give some tokens to both traders
    await Promise.all([
      underlyingToken.faucet(trader1, web3.utils.toWei('1000')),
      underlyingToken.faucet(trader2, web3.utils.toWei('1000'))
    ]);
  });

  it('should mint 100 governance token', async () => {
    // Approve liquidity pool to take control of 100 ULT from trader1
    // If approval removed, this error will popup:
    // Error: Returned error: VM Exception while processing transaction: 
    // revert ERC20: transfer amount exceeds allowance -- 
    // Reason given: ERC20: transfer amount exceeds allowance.
    await underlyingToken.approve(
      liquidityPool.address, 
      web3.utils.toWei('100'), 
      {from: trader1}
    );

    // LiquidityPool deposits 100 ULT from trader1 into the pool
    // This TX should add a block = give reward of 100 governance tokens
    await liquidityPool.deposit(web3.utils.toWei('100'), {from: trader1});

    // LiquidityPool withdraws 100 ULT for trader 1
    await liquidityPool.withdraw(web3.utils.toWei('100'), {from: trader1});
    const balanceGovToken = await governanceToken.balanceOf(trader1);

    assert(web3.utils.fromWei(balanceGovToken.toString()) === '100');
  });

  it('should mint 400 governance token', async () => {
    // Approve liquidity pool to take control of 100 ULT from trader1
    await underlyingToken.approve(
      liquidityPool.address, 
      web3.utils.toWei('100'), 
      {from: trader1}
    );

    // LiquidityPool deposits 100 ULT from trader1 into the pool
    await liquidityPool.deposit(web3.utils.toWei('100'), {from: trader1});

    // Advance 3 blocks
    await time.advanceBlock(); // + 1 Block
    await time.advanceBlock(); // + 1 Block
    await time.advanceBlock(); // + 1 Block

    // LiquidityPool withdraws 100 ULT for trader 1 (previously approved, does need approval again?)
    await liquidityPool.withdraw(web3.utils.toWei('100'), {from: trader1});
    const balanceGovToken = await governanceToken.balanceOf(trader1);

    assert(web3.utils.fromWei(balanceGovToken.toString()) === '400');
  });

  it('should mint 600 governance token', async () => {
    await underlyingToken.approve(
      liquidityPool.address, 
      web3.utils.toWei('100'), 
      {from: trader1}
    );
    await liquidityPool.deposit(web3.utils.toWei('100'), {from: trader1});
    await time.advanceBlock();
    await time.advanceBlock();
    await time.advanceBlock();
    await time.advanceBlock();
    await underlyingToken.approve(
      liquidityPool.address, 
      web3.utils.toWei('100'), 
      {from: trader1}
    ); //this tx will add a block
    await liquidityPool.deposit(web3.utils.toWei('100'), {from: trader1});
    const balanceGovToken = await governanceToken.balanceOf(trader1);
    assert(web3.utils.fromWei(balanceGovToken.toString()) === '600');
  });
});