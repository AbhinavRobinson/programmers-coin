import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { ProgrammersCoin } from "../../src/types/ProgrammersCoin";
import { ProgrammersCoin__factory } from "../../src/types/factories/ProgrammersCoin__factory";

task("deploy:ProgrammersCoin")
  .addParam("Supply", "10000000000000000000000") // 10e22
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const pgcFactory: ProgrammersCoin__factory = <ProgrammersCoin__factory>(
      await ethers.getContractFactory("ProgrammersCoin")
    );
    const pgc: ProgrammersCoin = <ProgrammersCoin>await pgcFactory.deploy(taskArguments.Supply);
    await pgc.deployed();
    console.log("PGC deployed to: ", pgc.address);
  });
