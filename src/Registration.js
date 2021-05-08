import React from 'react';
import classes from './styles/Chat.module.css'

export const Registration = (props) => {

    const [buyForm, setBuyForm] = React.useState(false)
    const [name, setName] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [amount, setAmount] = React.useState('')


    const buyPrem = () => {
        setBuyForm(false)
        props.buyPremium(name, amount, address)
    }


    return (
        <div className={classes.premium}>
            <button onClick={() => props.mint()}>Ask for tokens</button>
            <div style={{ color: 'red' }}>{props.notification}</div>

            {buyForm
                ? <div>
                    <input className={classes.buyInput} placeholder='Your name' value={name} onChange={e => setName(e.target.value)}></input>
                    <input className={classes.buyInput} placeholder='Amount of tokens' value={amount} onChange={e => setAmount(e.target.value)}></input>
                    <input className={classes.buyInput} placeholder='Option for other address' value={address} onChange={e => setAddress(e.target.value)}></input>
                    <button onClick={buyPrem}>Buy!</button>
                    <button onClick={() => setBuyForm(false)}>Cancel</button>
                    
                </div>

                : <button onClick={() => setBuyForm(true)}>Buy premium</button>

            }

            


        </div>
    )
}