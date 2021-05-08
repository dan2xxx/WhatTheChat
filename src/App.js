import './App.css'
import Web3 from 'web3'
import React from 'react'
import { Chat } from './Chat'
import { Registration } from './Registration'
import { Admin } from './Admin'
import { abi, tokenAbi } from './abi'


const address = '0xb72AEBB7f505005eca4eaCf068FAA296e0609298'
const tokenAddress = '0x23489422cE5bf94ED42b42248cd04246c64d8719'

function AppContainer() {

  const [web3, setWeb3] = React.useState(null)

  React.useEffect(() => {

    if (window.ethereum) {
      window.ethereum.enable()
      let web3 = new Web3(window.ethereum)
      setWeb3(web3)
      console.log('Provider: metamask')
    } else {
      let web3 = new Web3('wss://rinkeby.infura.io/ws/v3/5bdef920720a4ae9bc517ee52259b412')
      setWeb3(web3)
      console.log('Provider: infura')
    }


  }, [])



  return (
    <div>

      {web3 ? <App web3={web3} /> : null}
    </div>
  )
}


function App(props) {

  const [account, setAccount] = React.useState(null)
  const [messages, setMessages] = React.useState([])
  const [contract, setContract] = React.useState(null)
  const [token, setToken] = React.useState(null)
  const [premNotification, setpremNotification] = React.useState('')
  const [chatOwner, setChatOwner] = React.useState()
  const [isOwner, setIsOwner] = React.useState(false)


  const transferOwnership = async (newOwner) => {
    let res = await props.web3.eth.getAccounts()

    if (res.length > 0) {
      const [from] = res
      contract.methods.transferOwnership(newOwner).send({from})
    }
}

  const addMessage = (message) => {

    props.web3.eth.getAccounts().then((res) => {
      if (res.length > 0) {
        contract.methods.addMessage(message).send({
          from: `${res}`
        })
      }
    })


  }

  const getEvents = async (contract) => {
    let arrayOfEvents = await contract.getPastEvents("NewMessage", { fromBlock: 1 })
    let loadedMessages = []

    if (arrayOfEvents.length === 0) {
      return 
    }

    if (arrayOfEvents.length < 20) {
      for (let i = 0; i < arrayOfEvents.length; i++) {
        loadedMessages.push(arrayOfEvents[i].returnValues)
      }
    } else {
      for (let i = arrayOfEvents.length - 20; i < arrayOfEvents.length; i++) {
        loadedMessages.push(arrayOfEvents[i].returnValues)
      }
    }



    setMessages(loadedMessages)
    setpremNotification('')
  }

  const ifOwner = async (owner) => {
    let res = await props.web3.eth.getAccounts()

    if (res.length > 0) {
      const [addr] = res
      if (addr === owner) {
        setIsOwner(true)
      }
    }
 
}

  const getOwner = async (contract) => {
    const owner = await contract.methods.owner().call()
    setChatOwner(owner)
    ifOwner(owner)
  }

  const isPremium = async () => {
    const res = await props.web3.eth.getAccounts()

    if (res.length > 0) {
      let name = await contract.methods.registeredAddresses(res[0]).call()
      if (name) {
        return true
      } else {
        return false
      }

    }
  }

  const buy = async (name, amount, otherAddress) => {
    
    const wei = `${amount}000000000000000000`
    let res = await props.web3.eth.getAccounts()
    
    
      if (res.length > 0) {
        const [from] = res
        let addressToPremium

        if (otherAddress) {
          addressToPremium = otherAddress
        } else {
          addressToPremium = from
        }
        await token.methods.approve(address, wei).send({from})
        await contract.methods.register(name, wei, addressToPremium).send({from})
      }
    }    

  const mint = async () => {
      let res = await props.web3.eth.getAccounts()
      
      
        if (res.length > 0) {
          token.methods.mint(res[0], '100000000000000000000').send({
            from: `${res}`
          })
        }
      }   





  React.useEffect(() => {

    //creating contract instance and initializing events
    if (abi) {
      var instance = new props.web3.eth.Contract(abi, address)
      setContract(instance)
      getEvents(instance)
      getOwner(instance)
    }

    //creating token instance 
    if (tokenAbi) {
      const tokenInstance = new props.web3.eth.Contract(tokenAbi, tokenAddress)
      setToken(tokenInstance)
      }

    //setting account
    props.web3.eth.getAccounts().then((res) => {
      const [newAccount] = res
      setAccount(newAccount)
    })


    //subscribe to chat event
    props.web3.eth.subscribe('logs', {
      address: '0xb72AEBB7f505005eca4eaCf068FAA296e0609298',
      topics: ['0xd139c8de132b273212c7748176bea519724854faab652bbd83b7967a75f1ac0f']
    }, function (error, result) {
      if (!error)
      console.log('Reload messages')
      getEvents(instance)
    })
      .on("connected", function (eventId) {
        console.log(eventId);
      })
      .on("data", function (data) {
        console.log(data);
      })
      .on("changed", function (log) {
      });

  

      



}, [props.web3])


return (
  <div className="App">

    {messages.length > 0
      ? <div>
        <Chat messages={messages} addMessage={addMessage} chatOwner={chatOwner} />
        <Registration buyPremium={buy} notification={premNotification} mint={mint} />
      </div>
      : <h1>Initializing...</h1>}

      {isOwner ? <Admin contract={contract} account={account}/> : null}

    

  </div>
);
}

export default AppContainer;
