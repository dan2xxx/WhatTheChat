import React from 'react';
import classes from './styles/Chat.module.css'

export const Registration = (props) => {

    const [buyForm, setBuyForm] = React.useState(false)
    const [name, setName] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [timer, setTimer] = React.useState(0)
    const [error, setError] = React.useState('')



    const buy = async (name, amount, otherAddress) => {

        const wei = props.toWei(amount, 'ether');

        if (props.account) {

            let addressToPremium

            if (otherAddress) {
                addressToPremium = otherAddress
            } else {
                addressToPremium = props.account
            }

            const response = await props.contract.methods.premiumUsers(props.account).call()
            const currentName = response.name


            await props.token.methods.approve(props.address, wei).send({ from: props.account })
            await props.contract.methods.register(name ? name : currentName, wei, addressToPremium, amount * 120).send({ from: props.account })
        }
    }



    const buyPrem = async () => {
        if (amount >= 1) {
            setBuyForm(false)
            await buy(name, amount, address)
            setTimer(0)
            getTimer()
            setError('')
        } else {
            setError('Minimum amount: 1 token')
        }
    }


    const getTimer = async () => {
        let response = await props.contract.methods.premiumUsers(props.account).call()
        let expireOfPremium = response.finishTime
        let currentTimeStamp = Math.floor(Date.now() / 1000)
        let timer = (expireOfPremium - currentTimeStamp)
        if (timer > 0) {
            setTimer(timer)
        }

    }


    React.useEffect(() => {
        getTimer()
    }, [])

    React.useEffect(() => {

        let timeout = setTimeout(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }

        }, 1000)


        return () => {
            clearTimeout(timeout)
        }


    }, [timer])


    return (
        <div className={classes.premium}>
            <button onClick={() => props.mint()}>Ask for tokens</button>
            <div style={{ color: 'red' }}>{props.notification}</div>

            {buyForm
                ? <div>
                    <input className={classes.buyInput} placeholder='Your name' value={name} onChange={e => setName(e.target.value)}></input>
                    <div style={{ color: 'red' }}>{error}</div>
                    <input className={classes.buyInput} placeholder='Amount of tokens' value={amount} onChange={e => setAmount(e.target.value)}></input>
                    <input className={classes.buyInput} placeholder='Option for other address' value={address} onChange={e => setAddress(e.target.value)}></input>
                    <button onClick={buyPrem}>Buy!</button>
                    <button onClick={() => setBuyForm(false)}>Cancel</button>

                </div>

                : <button onClick={() => setBuyForm(true)}>Buy premium</button>

            }

            <div style={{ color: 'green' }}>{timer > 0 ? timer : null}</div>


        </div>
    )
}