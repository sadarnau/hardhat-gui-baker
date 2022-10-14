// We load the plugin here.
import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/types";
import "../../../src/front";
import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  paths: {
    newPath: "asd",
  },
};

export default config;
