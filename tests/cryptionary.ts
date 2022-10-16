import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Cryptionary } from "../target/types/cryptionary";
import * as assert from "assert";

describe("cryptionary", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Cryptionary as Program<Cryptionary>;

  it("Is initialized!", async () => {
    const post = anchor.web3.Keypair.generate();

    await program.rpc.sendPost("Apple", "testhash", {
      accounts: {
        post: post.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [post],
    });
  });

  it("can send a new post", async () => {
    const post = anchor.web3.Keypair.generate();
    await program.rpc.sendPost("Apple", "testhash", {
      accounts: {
        post: post.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [post],
    });

    const postAccount = await program.account.post.fetch(post.publicKey);
    console.log(postAccount);
    assert.equal(
      postAccount.author.toBase58(),
      program.provider.wallet.publicKey.toBase58()
    );
    assert.equal(postAccount.correctGuess, "Apple");
  });

  it("can send a new tweet from a different author", async () => {
    const otherUser = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(
      otherUser.publicKey,
      1000000000
    );
    await program.provider.connection.confirmTransaction(signature);
    const post = anchor.web3.Keypair.generate();

    await program.rpc.sendPost("apple", "testhash", {
      accounts: {
        post: post.publicKey,
        author: otherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [otherUser, post],
    });

    const postAccount = await program.account.post.fetch(post.publicKey);
    assert.equal(postAccount.author.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(postAccount.correctGuess, "apple");
  });

  it("can fetch all tweets", async () => {
    const postAccounts = await program.account.post.all();
    assert.equal(postAccounts.length, 3);
  });

  it("can filter posts by author", async () => {
    const authorPublicKey = program.provider.wallet.publicKey;
    const postAccounts = await program.account.post.all([
      {
        memcmp: {
          offset: 8,
          bytes: authorPublicKey.toBase58(),
        },
      },
    ]);

    assert.equal(postAccounts.length, 2);
    assert.ok(
      postAccounts.every((postAccount) => {
        return (
          postAccount.account.author.toBase58() === authorPublicKey.toBase58()
        );
      })
    );
  });

  it("can guess account", async () => {
    const postAccounts = await program.account.post.all();
    const otherUser = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(
      otherUser.publicKey,
      1000000000
    );
    await program.provider.connection.confirmTransaction(signature);
    const post = anchor.web3.Keypair.generate();

    const account = postAccounts[0];
    console.log(account);

    program.rpc.guess("Apple", {
      accounts: {
        post: post.publicKey,
        author: otherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [otherUser, post],
    });
    const pa = await program.account.post.all();
    console.log(pa);
  });
});
