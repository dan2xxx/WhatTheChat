(this.webpackJsonpethchat=this.webpackJsonpethchat||[]).push([[0],{205:function(e,n,t){},207:function(e,n,t){},220:function(e,n){},229:function(e,n){},247:function(e,n){},249:function(e,n){},265:function(e,n){},266:function(e,n){},329:function(e,n){},331:function(e,n){},340:function(e,n){},342:function(e,n){},367:function(e,n){},369:function(e,n){},370:function(e,n){},375:function(e,n){},377:function(e,n){},39:function(e,n,t){e.exports={container:"Chat_container__1Ewyf",inputForm:"Chat_inputForm__3_Bjc",nameInput:"Chat_nameInput__1wO07",textInput:"Chat_textInput__1X8c0",message:"Chat_message__2rHLj",feed:"Chat_feed__23_Os"}},390:function(e,n){},402:function(e,n){},405:function(e,n){},410:function(e,n){},421:function(e,n){},424:function(e,n){},477:function(e,n,t){"use strict";t.r(n);var a=t(16),s=t.n(a),i=t(196),r=t.n(i),c=(t(205),t(18)),u=t.n(c),o=t(68),l=t(38),p=(t(207),t(69)),m=t.n(p),d=t(39),f=t.n(d),g=t(11),h=function(e){var n=s.a.useState(""),t=Object(l.a)(n,2),a=t[0],i=t[1],r=s.a.useState(""),c=Object(l.a)(r,2),u=c[0],o=c[1],p=s.a.useRef(),m=function(e){var n=new Date(1e3*e),t=n.getHours(),a="0"+n.getMinutes(),s="0"+n.getSeconds();return t+":"+a.substr(-2)+":"+s.substr(-2)};return s.a.useEffect((function(){p.current.scrollTop=p.current.scrollTop+(p.current.scrollHeight-p.current.clientHeight)}),[e.messages]),Object(g.jsxs)("div",{className:f.a.container,children:[Object(g.jsx)("h1",{children:"What the chat?"}),Object(g.jsx)("div",{className:f.a.feed,ref:p,children:function(){if(e.messages)return e.messages.map((function(e){return Object(g.jsxs)("div",{className:f.a.message,children:[m(e.timestamp)," ",Object(g.jsx)("span",{style:{fontWeight:"700"},children:e.name})," : ",e.message]})}))}()}),Object(g.jsxs)("div",{className:f.a.inputForm,children:[Object(g.jsx)("input",{className:f.a.nameInput,onChange:function(e){return i(e.target.value)},value:a,placeholder:"Your name"}),Object(g.jsx)("input",{className:f.a.textInput,onChange:function(e){return o(e.target.value)},value:u,placeholder:"Enter message"}),Object(g.jsx)("button",{onClick:function(){e.addMessage(a,u),i(""),o("")},children:"Send"})]})]})},y=[{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"sender",type:"address"},{indexed:!1,internalType:"string",name:"name",type:"string"},{indexed:!1,internalType:"string",name:"message",type:"string"},{indexed:!1,internalType:"uint256",name:"timestamp",type:"uint256"}],name:"NewMessage",type:"event"},{inputs:[{internalType:"string",name:"_name",type:"string"},{internalType:"string",name:"_message",type:"string"}],name:"addMessage",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"messages",outputs:[{internalType:"address",name:"sender",type:"address"},{internalType:"string",name:"name",type:"string"},{internalType:"string",name:"message",type:"string"},{internalType:"uint256",name:"timestamp",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"messagesLength",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"_name",type:"string"}],name:"register",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"users",outputs:[{internalType:"address",name:"accountAddress",type:"address"},{internalType:"string",name:"userName",type:"string"},{internalType:"string",name:"status",type:"string"}],stateMutability:"view",type:"function"}];if(window.ethereum){window.ethereum.enable();var b=new m.a(window.ethereum);console.log("Provider: metamask")}else{b=new m.a("wss://rinkeby.infura.io/ws/v3/5bdef920720a4ae9bc517ee52259b412");console.log("Provider: infura")}var j=function(){var e=s.a.useState([]),n=Object(l.a)(e,2),t=n[0],a=n[1],i=s.a.useState(null),r=Object(l.a)(i,2),c=r[0],p=r[1],d=s.a.useState(""),f=Object(l.a)(d,2),j=f[0],x=f[1],w=function(){var e=Object(o.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.ethereum){e.next=4;break}return e.next=3,window.ethereum.enable();case 3:b=new m.a(window.ethereum);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(o.a)(u.a.mark((function e(n){var t,s,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.methods.messagesLength().call();case 2:t=e.sent,s=[],i=0;case 5:if(!(i<t)){e.next=14;break}return e.t0=s,e.next=9,n.methods.messages(i).call();case 9:e.t1=e.sent,e.t0.push.call(e.t0,e.t1);case 11:i++,e.next=5;break;case 14:a(s);case 15:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),O=function(){var e=Object(o.a)(u.a.mark((function e(n,t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.methods.addMessage(n,t).send({from:"".concat(j)});case 2:a=e.sent,console.log(a);case 4:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}();return s.a.useEffect((function(){if(b.eth.getAccounts().then((function(e){x(e)})),y){var e=new b.eth.Contract(y,"0x7896E010042efD99dCB76C3f150156C1544C4030");p(e),v(e).then(console.log("messages collected"))}var n=b.eth.subscribe("logs",{address:"0x7896E010042efD99dCB76C3f150156C1544C4030",topics:["0xd139c8de132b273212c7748176bea519724854faab652bbd83b7967a75f1ac0f"]},(function(n,t){n||console.log(t),console.log("Reload messages"),v(e)})).on("connected",(function(e){console.log(e)})).on("data",(function(e){console.log(e)})).on("changed",(function(e){}));console.log(n)}),[]),Object(g.jsxs)("div",{className:"App",children:[t.length>0?Object(g.jsx)(h,{messages:t,addMessage:O}):Object(g.jsx)("h1",{children:"Initializing..."}),window.ethereum&&!b.currentProvider.isMetaMask?Object(g.jsx)("button",{className:"connectButton",onClick:w,children:"Connect to metamask manualy "}):null]})},x=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,481)).then((function(n){var t=n.getCLS,a=n.getFID,s=n.getFCP,i=n.getLCP,r=n.getTTFB;t(e),a(e),s(e),i(e),r(e)}))};r.a.render(Object(g.jsx)(s.a.StrictMode,{children:Object(g.jsx)(j,{})}),document.getElementById("root")),x()}},[[477,1,2]]]);
//# sourceMappingURL=main.fa6948ff.chunk.js.map