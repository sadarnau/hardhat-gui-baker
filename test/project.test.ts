// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import path from "path";

import { useEnvironment } from "./helpers";

describe("test", function () {
  useEnvironment("hardhat-project");

  it("Should run front", async function () {
    this.timeout(100000);
    await this.hre.run("front");
  });
});
