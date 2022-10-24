import { task } from "hardhat/config";
import { spawnSync } from "child_process";

task("front", "create front").setAction(async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  await hre.run("compile");
  hre.run("node");
  const contractTest = await hre.ethers.getContractFactory("Coin");
  const deployedContract = await contractTest.deploy(accounts[0].address);
  console.log("deployedContract:", deployedContract.address);

  // spawnSync("ls", { stdio: [process.stdin, process.stdout, process.stderr] });
  spawnSync("cp", ["-r", "artifacts", "../../../contract-front/src"]);
  spawnSync("cp", [
    "-r",
    "typechain-types",
    "../../../front/contract-front/src",
  ]);

  spawnSync("yarn", ["start"], {
    cwd: "../../../contract-front",
    // stdio: [process.stdin, process.stdout, process.stderr],
  });
});
