import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { ProgrammersCoin } from "../../src/types/ProgrammersCoin";
import { Signers } from "../types";
import { shouldBehaveLikeProgrammersCoin } from "./ProgrammersCoin.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("ProgrammersCoin:Deploy", function () {
    beforeEach(async function () {
      const supply: string = "10000000000000000000000";
      const pgcArtifact: Artifact = await artifacts.readArtifact("ProgrammersCoin");
      this.pgc = <ProgrammersCoin>await waffle.deployContract(this.signers.admin, pgcArtifact, [supply]);
    });

    shouldBehaveLikeProgrammersCoin();
  });
});
