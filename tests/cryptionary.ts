import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Cryptionary } from "../target/types/cryptionary";

describe("cryptionary", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Cryptionary as Program<Cryptionary>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
