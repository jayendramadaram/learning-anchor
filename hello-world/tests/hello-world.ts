import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloWorld } from "../target/types/hello_world";
import { expect } from "chai";

describe("hello-world", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloWorld as Program<HelloWorld>;
  let alice: anchor.web3.Keypair;

  before(async () => {
    alice = anchor.web3.Keypair.generate();
  });

  it("Is initialized!", async () => {
    const tx0 = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx0);
    expect(tx0).to.be.ok;
  });

  it("Calling whatever method with Alice", async () => {
    const tx1 = await program.methods.whatever("ALICEEEEEEEEE").accounts({
      dupsigner: alice.publicKey
    }).signers([alice]).rpc()

    console.log("Transaction:", tx1);
    // console.log("Logs:", tx1.logs);
  });

  it("Calling whatever method with Bob", async () => {
    const bob = anchor.web3.Keypair.generate();
    const tx2 = await program.methods.whatever("BOBBB").accounts({
      dupsigner: bob.publicKey
    }).signers([bob]).rpc();
    console.log("Transaction:", tx2);
    // console.log("Logs:", tx2.logs);
  });
});
