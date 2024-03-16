// import assert from 'assert';

// import anchor from '@project-serum/anchor';
const assert = require('assert')
const anchor = require('@project-serum/anchor')

const {SystemProgram} = anchor.web3


describe('mycalculatordapp',()=>{
    const provider = anchor.AnchorProvider.local()
    anchor.setProvider(provider)

    const calculator = anchor.web3.Keypair.generate()

    const program = anchor.workspace.Mycalculatordapp

    it('create a calculator',async()=>{
      await program.rpc.create('welcome to Solana',{
        accounts:{
          calculator: calculator.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId
        },
        signers:[calculator]
      })

      const account = await program.account.calculator.fetch(calculator.publicKey)

      assert.ok(account.greeting === 'welcome to Solana')
    })


    it('sum two numbers', async()=>{
      await program.rpc.add(new anchor.BN(2),new anchor.BN(3),{
          accounts:{
            calculator:calculator.publicKey
          }
      })

      const account = await program.account.calculator.fetch(calculator.publicKey)
      assert.ok(account.result.eq(new anchor.BN(5)))
    })

    it('sub two numbers', async()=>{
      await program.rpc.sub(new anchor.BN(2),new anchor.BN(3),{
          accounts:{
            calculator:calculator.publicKey
          }
      })

      const account = await program.account.calculator.fetch(calculator.publicKey)
      assert.ok(account.result.eq(new anchor.BN(-1)))
    })

    it('mul two numbers', async()=>{
      await program.rpc.mul(new anchor.BN(2),new anchor.BN(3),{
          accounts:{
            calculator:calculator.publicKey
          }
      })

      const account = await program.account.calculator.fetch(calculator.publicKey)
      assert.ok(account.result.eq(new anchor.BN(6)))
    })

    it('div two numbers', async()=>{
      await program.rpc.div(new anchor.BN(2),new anchor.BN(3),{
          accounts:{
            calculator:calculator.publicKey
          }
      })

      const account = await program.account.calculator.fetch(calculator.publicKey)
      
      assert.ok(account.result.eq(new anchor.BN(0)))
      assert.ok(account.remainder.eq(new anchor.BN(2)))
    })
})