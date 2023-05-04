use anchor_lang::prelude::*;

declare_id!("6rJpiQg5bnMN3tS8UbonhhDCedNTX1rWzQFGMsPdV6kv");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Heyyy it worked");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(
        init,
        payer
    )]
}

#[derive(Accounts)]
pub struct Data<'info> {
    #[account(mut)]
    pub signer : Signer<'info>,
    #[account(mut)]
    pub dupsigner : Signer<'info>
}
