import React from 'react';
import classes from './styles/Chat.module.css'

export const Chat = (props) => {

    const [name, setName] = React.useState('')
    const [input, setInput] = React.useState('')

    const printMessages = () => {

        //debugger

        if (props.messages) {
            return props.messages.map(messageItem => 
            <div className={classes.message}><span style={{ fontWeight: '700' }}>{messageItem.name}</span> : {messageItem.message}</div>)}

    }





    return (
        <div className={classes.container}>

            <h1>What the chat?</h1>
            <div className={classes.feed}>
                {printMessages()}
            </div>


            <div className={classes.inputForm}>
                <input className={classes.nameInput} onChange={(e) => setName(e.target.value)} value={name} placeholder='Your name'></input>
                <input className={classes.textInput} onChange={(e) => setInput(e.target.value)} value={input} placeholder='Enter message'></input>
                <button onClick={() => props.addMessage(name, input)}>Send</button>
            </div>

        </div>
    )
}