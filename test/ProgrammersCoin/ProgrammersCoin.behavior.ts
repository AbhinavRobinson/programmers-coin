import { expect } from "chai";

export function shouldBehaveLikeProgrammersCoin(): void {
  it("should have a name, symbol and supply", async function () {
    expect(await this.pgc.name()).to.equal("Programmers Coin");
    expect(await this.pgc.symbol()).to.equal("PGC");
    expect(await this.pgc.totalSupply()).to.equal("1".padEnd(23, "0"));
  });

  it("should have a balance of 10e23 for admin", async function () {
    expect(await this.pgc.balanceOf(await this.pgc.signer.getAddress())).to.equal("1".padEnd(23, "0"));
  });

  it("should have a balance of 0 for other accounts", async function () {
    expect(await this.pgc.balanceOf(this.others[0].getAddress())).to.equal("0");
  });

  it("should approve 10e17 to others", async function () {
    await this.pgc.approve(this.others[0].getAddress(), "1".padEnd(17, "0"));
    expect(await this.pgc.allowance(await this.pgc.signer.getAddress(), this.others[0].getAddress())).to.equal(
      "1".padEnd(17, "0"),
    );
  });

  it("should transfer 10e17 to others", async function () {
    await this.pgc.transfer(this.others[0].getAddress(), "1".padEnd(17, "0"));
    expect(await this.pgc.balanceOf(this.others[0].getAddress())).to.equal("1".padEnd(17, "0"));
  });

  it("should have a balance of 10e23-10e17 for admin", async function () {
    expect(await this.pgc.balanceOf(await this.pgc.signer.getAddress())).to.equal("999999".padEnd(22, "0"));
  });
}
