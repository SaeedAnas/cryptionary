use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

// declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");
declare_id!("BcLbLvDiJRwsfDb7sPpmUqd3Z7w3i4CFunMyk7me3D2X");

#[program]
pub mod cryptionary {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn send_post(ctx: Context<SendPost>, correct_guess: String) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if correct_guess.chars().count() > 50 {
            return Err(ErrorCode::TopicTooLong.into());
        }

        post.author = *author.key;
        post.timestamp = clock.unix_timestamp;
        post.correct_guess = correct_guess;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
pub struct Post {
    pub author: Pubkey,
    pub timestamp: i64,
    pub correct_guess: String,
    pub num_incorrect: i32,
    pub is_solved: bool,
    // TODO: image_hash
}

// 2. Add some useful constants for sizing propeties.
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const COUNTER_LENGTH: usize = 4;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const BOOL_LENGTH: usize = 1;
const MAX_GUESS_LENGTH: usize = 50 * 4; // 50 chars max.

// 3. Add a constant on the Tweet account that provides its total size.
impl Post {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_GUESS_LENGTH // Guess
        + COUNTER_LENGTH // Guess counter
        + BOOL_LENGTH; // Is_solved
}

#[derive(Accounts)]
pub struct SendPost<'info> {
    #[account(init, payer = author, space = Post::LEN)]
    pub post: Account<'info, Post>,
    #[account(mut)]
    pub author: Signer<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}
