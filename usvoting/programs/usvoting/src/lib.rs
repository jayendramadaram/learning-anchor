use anchor_lang::prelude::*;
declare_id!("2yh64WuwZYVJmsvgYn7g1vtXr9rzKg1HJqXok3hUVZ3n");


#[program]
pub mod usvoting {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.votebox.vote_status  = true;
        Ok(())
    }

    pub fn casevote(ctx : Context<GiveVote> , vote_type : String) -> Result<()> {
        if ctx.accounts.votebox.vote_status {   
            match vote_type.as_str() {
                "helen"  => {
                    msg!("Voting for helen");
                    ctx.accounts.votebox.democratic += 1;
                },
                "trump" => {
                    msg!("Voting for Trump");
                    ctx.accounts.votebox.republic += 1;
                },
                _ => {
                    msg!("Vroo who the heck are you voting for");
                }
            }
        }
        Ok(())
    }

    pub fn endvote(ctx : Context<GiveVote>) -> Result<()> {

        ctx.accounts.votebox.vote_status = false;
        
            let message = if ctx.accounts.votebox.democratic > ctx.accounts.votebox.republic {
                "Cool helen won".to_string()
            } else {
                "Hell yeah TRUMP WON".to_string()    
            };
            msg!(&message);
        
        Ok(())
    }
}


#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = signer,
        space = 8  + 1 + 8 + 8 // for account + bool + u64 + u64
    )]
    pub votebox : Account<'info , Vote>,
    #[account(mut)]
    pub signer : Signer<'info>,
    pub system_program: Program<'info, System>,
}


#[account]
#[derive(Default)]
pub struct Vote {
    vote_status : bool,
    democratic : u64,
    republic : u64
}

#[derive(Accounts)]
pub struct GiveVote<'info>  {
    #[account(mut)] 
    pub votebox : Account<'info , Vote>,
    pub signer : Signer<'info>,
}

#[derive(AnchorDeserialize , AnchorSerialize)]
pub enum VoteType {
    Helen,
    Trump
}