import React from 'react';
import classes from './styles/Chat.module.css'

export const Chat = (props) => {

    const [name, setName] = React.useState('')
    const [input, setInput] = React.useState('')

    const printMessages = () => {

        if (props.messages) {
            const messageItem = props.messages[0]
            return <div className={classes.message}><span style={{fontWeight: '700'}}>{messageItem.name}</span> : {messageItem.message}</div>
        }

    }





    return (
        <div className={classes.container}>

            <h1>What the chat?</h1>
            <div className={classes.feed}>
                {printMessages()}
            </div>
            

            <div className={classes.inputForm}>
                <input classname={classes.nameInput} onChange={(e) => setName(e.target.value) } value={name} placeholder='Your name'></input>
                <input classname={classes.textInput} onChange={(e) => setInput(e.target.value)} value={input} placeholder='Enter message'></input>
                <button onClick={() => props.addMessage(name, input)}>Send</button>
            </div>

        </div>
    )
}