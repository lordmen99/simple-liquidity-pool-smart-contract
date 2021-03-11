var GovernanceToken = artifacts.require("GovernanceToken");
var UnderlyingToken = artifacts.require("UnderlyingToken");
var LiquidityPool = artifacts.require("LiquidityPool");

module.exports = function(deployer) {
   deployer.then(async () => {
        const ult = await deployer.deploy(UnderlyingToken);
        await ult.faucet("0x9f6aEae696a04315D3dc3b9819C1B969D9742CcB")
        const gtk = await deployer.deploy(GovernanceToken);
        await deployer.deploy(LiquidityPool, UnderlyingToken.address, GovernanceToken.address);
        await gtk.transferOwnership(LiquidityPool.address);
    });

};

