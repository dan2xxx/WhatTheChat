import React from 'react';
import classes from './styles/Chat.module.css'

export const Chat = (props) => {

    const [name, setName] = React.useState('')
    const [input, setInput] = React.useState('')
    const feed = React.useRef()

    const toDate = (unixDate) => {
        let date = new Date(unixDate * 1000)
        let hours = date.getHours()
        let minutes = "0" + date.getMinutes()
        let seconds = "0" + date.getSeconds()
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
        return formattedTime
    }

    const printMessages = () => {

        if (props.messages) {
            return props.messages.map(messageItem =>
                <div className={classes.message}>{toDate(messageItem.timestamp)} <span style={{ fontWeight: '700' }}>{messageItem.name}</span> : {messageItem.message}</div>)
        }
    }

    React.useEffect(() => {
        feed.current.scrollTop = feed.current.scrollTop + (feed.current.scrollHeight - feed.current.clientHeight)
    }, [props.messages])



    return (
        <div className={classes.container}>

            <h1>What the chat?</h1>
            <div className={classes.feed} ref={feed}>
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