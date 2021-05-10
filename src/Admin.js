import React from 'react';
import classes from './styles/Chat.module.css'

export const Admin = (props) => {

    const [newOwner, setnewOwner] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [showOwnerForm, setshowOwnerForm] = React.useState(false)
    const [showWithdwarForm, setshowWithdwarForm] = React.useState(false)
    const [balance, setBalance] = React.useState(0)

    

    const getBallance = async () => {
        const ballanceOfChat = await props.token.methods.balanceOf(props.address).call()
        setBalance(ballanceOfChat / 1000000000000000000)
    }

    const transferOwnership = async () => {
        await props.contract.methods.transferOwnership(newOwner).send({
            from: props.account
        })
      }

    const withdraw = async () => {
        const wei = `${amount}000000000000000000`
        await props.contract.methods.withdrawFunds(wei).send({from: props.account})
        getBallance()
    }

    React.useEffect(() => {
        getBallance()
    },[])

    
    return (
        <div>

        
        <div className={classes.adminPanel}>
            <div>
            <button  onClick={() => {showWithdwarForm ? setshowWithdwarForm(false) : setshowWithdwarForm(true)}}>Withdraw tokens</button>
            </div>
            
            <div>
            <button onClick={() => {showOwnerForm ? setshowOwnerForm(false) : setshowOwnerForm(true)}}>Transfer ownership</button>
            </div>
        </div>

        {showOwnerForm 
        ?  <div className={classes.adminPanel} style={{marginRight: '120px', marginBottom: '10px'}}>
            <input style={{}}value={newOwner} onChange={(e) => setnewOwner(e.target.value)} placeholder='New owner'></input>
            <button onClick={transferOwnership}>Transfer</button>
        </div> 
        : null}

        {showWithdwarForm 
        ?  <div className={classes.adminPanel} style={{marginRight: '120px', marginBottom: '65px'}}>
            <input style={{}}value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={`Max: ${balance}`}></input>
            <button onClick={withdraw}>Withdraw</button>
        </div> 
        : null}
       


        </div>
    )
}