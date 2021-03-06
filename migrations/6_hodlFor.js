const Deploy = require("../utils/Deploy");
const Keys = require("../keys");
const HodlFor = artifacts.require("./HodlFor.sol");

const start = async (deployer, network, accounts) => {
  // if (network === "develop") return;
  const keys = Keys(network);
  const deploy = Deploy(deployer, network);
  const contracts = require(`../build/addresses-${network}.json`);
  const [owner] = accounts;

  // --> deploy hodlFor
  const hodlFor = await deploy(HodlFor, contracts.Purpose, contracts.DUBI, contracts.Hodler);

  console.log("Transferring ownership to Athene...");
  await hodlFor.transferOwnership(keys.athene, {
      from: owner
    })
    .then(console.log)
    .catch(console.log);
};

module.exports = start;