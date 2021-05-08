import React from 'react';
import classes from './styles/Chat.module.css'

export const Admin = (props) => {

    const [newOwner, setnewOwner] = React.useState('')

    const transferOwnership = async () => {
        await props.contract.methods.transferOwnership(newOwner).send({
            from: props.account
        })

      }

    return (
        <div className={classes.adminPanel}>
            <div><button>Withdraw tokens</button></div>
            <div><button onClick={transferOwnership}>Transfer ownership</button></div>
        </div>
    )
}