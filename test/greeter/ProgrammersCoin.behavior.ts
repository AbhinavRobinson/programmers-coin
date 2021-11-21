import { expect } from "chai";

export function shouldBehaveLikeProgrammersCoin(): void {
  it("should have a name, symbol and supply", async function () {
    expect(await this.pgc.name()).to.equal("Programmers Coin");
    expect(await this.pgc.symbol()).to.equal("PGC");
    expect(await this.pgc.totalSupply()).to.equal("10000000000000000000000");
  });
}
