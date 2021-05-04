import './App.css'
import Web3 from 'web3'
import React from 'react'
import { Chat } from './Chat'
import { abi } from './abi'


const address = '0x7896E010042efD99dCB76C3f150156C1544C4030'

if (window.ethereum) {
  window.ethereum.enable()
  var web3 = new Web3(window.ethereum)
  console.log('Provider: metamask')
} else {
  var web3 = new Web3('wss://rinkeby.infura.io/ws/v3/5bdef920720a4ae9bc517ee52259b412')
  console.log('Provider: infura')
}


function App() {

  const [messages, setMessages] = React.useState([])
  const [contract, setContract] = React.useState(null)
  const [account, setAccount] = React.useState('')


  const connectToMetaMask = async () => {
    if (window.ethereum) {
      await window.ethereum.enable()
      web3 = new Web3(window.ethereum)
    }
  }

  const getMessages = async (instance) => {

    const length = await instance.methods.messagesLength().call()
    let loadedMessages = []

    for (let i = 0; i < length; i++) {
      loadedMessages.push((await instance.methods.messages(i).call()))
    }
    setMessages(loadedMessages)
  }

  const addMessage = async (name, message) => {

    const resp = await contract.methods.addMessage(name, message).send({
      from: `${account}`
    })
    console.log(resp)
  }

  React.useEffect(() => {

    //setting current account to state
    web3.eth.getAccounts().then((res) => {
      setAccount(res)
    })

    //crating contract instance
    if (abi) {
      var instance = new web3.eth.Contract(abi, address)
      setContract(instance)
      getMessages(instance).then(console.log('messages collected'))
    }

    //subscribe to event
    var subscription = web3.eth.subscribe('logs', {
      address: '0x7896E010042efD99dCB76C3f150156C1544C4030',
      topics: ['0xd139c8de132b273212c7748176bea519724854faab652bbd83b7967a75f1ac0f']
    }, function (error, result) {
      if (!error)
        console.log(result)
      console.log('Reload messages')
      getMessages(instance)
    })
      .on("connected", function (NewMessage) {
        console.log(NewMessage);
      })
      .on("data", function (event) {
        console.log(event);
      })
      .on("changed", function (log) {
      });

    console.log(subscription)

  }, [])






  return (
    <div className="App">


      {messages.length > 0
        ? <Chat messages={messages} addMessage={addMessage} />
        : <h1>Initializing...</h1>}

      {window.ethereum && !web3.currentProvider.isMetaMask
        ? <button className='connectButton' onClick={connectToMetaMask}>Connect to metamask manualy </button>
        : null}


    </div>
  );
}

export default App;
