import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Usvoting } from "../target/types/usvoting";
import { expect } from "chai";

describe("usvoting", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Usvoting as Program<Usvoting>;
  const ballot = anchor.web3.Keypair.generate()

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().accounts({
      votebox: ballot.publicKey
    }).signers([ballot]).rpc();
    console.log("Your transaction signature", tx);
    let ballotData = await program.account.vote.fetch(ballot.publicKey)
    expect(ballotData.voteStatus).to.be.true

  });

  it("Voting for Demorcats", async () => {
    const tx = await program.methods.casevote("helen").accounts({
      votebox: ballot.publicKey,
      signer: ballot.publicKey
    }).signers([ballot]).rpc();

    let ballotData = await program.account.vote.fetch(ballot.publicKey)

    expect(ballotData.democratic.toNumber()).to.be.equal(1, "Vales arent qual somthing messed up")

    for (let index = 0; index < 5; index++) {
      const tx = await program.methods.casevote("helen").accounts({
        votebox: ballot.publicKey,
        signer: ballot.publicKey
      }).signers([ballot]).rpc();
    }
    ballotData = await program.account.vote.fetch(ballot.publicKey)
    expect(ballotData.democratic.toNumber()).to.be.equal(6, "Vales arent 5 somthing messed up")

  })
  it("Voting for Republicans", async () => {
    const tx = await program.methods.casevote("trump").accounts({
      votebox: ballot.publicKey,
      signer: ballot.publicKey
    }).signers([ballot]).rpc();

    let ballotData = await program.account.vote.fetch(ballot.publicKey)

    expect(ballotData.republic.toNumber()).to.be.equal(1, "Vales arent qual somthing messed up")

    for (let index = 0; index < 6; index++) {
      const tx = await program.methods.casevote("trump").accounts({
        votebox: ballot.publicKey,
        signer: ballot.publicKey
      }).signers([ballot]).rpc();
    }
    ballotData = await program.account.vote.fetch(ballot.publicKey)
    expect(ballotData.republic.toNumber()).to.be.equal(7, "Vales arent 7 somthing messed up")

  })

  it("Ending the Voting", async () => {
    await program.methods.endvote().accounts({
      votebox: ballot.publicKey,
      signer: ballot.publicKey
    }).signers([ballot]).rpc();
  })
});
