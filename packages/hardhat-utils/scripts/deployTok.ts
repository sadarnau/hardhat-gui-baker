import { ethers } from "hardhat";

async function main() {
  const SamToken = await ethers.getContractFactory("SamToken");
  const samToken = await SamToken.deploy("10000000000000000000000000000000");

  await samToken.deployed();

  console.log(`SamToken deployed to ${samToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
