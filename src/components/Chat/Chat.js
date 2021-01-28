import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './Chat.css'
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

let socket;


const Chat = ({ location })=>{
     const [isConnected,setIsConnected]=useState(false)
     const [id,setId]=useState('')
    const [oldData, setOldData] = useState([]);
    // const [clients, setClients] = useState([]);
     //const [answer, setAnswer] = useState();


     const [users, setUsers] = useState('');
     const [message, setMessage] = useState('');
     const [messages, setMessages] = useState([]);
     const [room, setRoom] = useState(' ');
    const [name, setName] = useState('');
   
    
    
    
    const ENDPOINT = 'https://codi-server.herokuapp.com';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        // var connectionOptions =  {
        //     "force new connection" : true,
        //     "reconnectionAttempts": "Infinity", 
        //     "timeout" : 10000,                  
        //     "transports" : ["websocket"]
        // };
        socket = io('https://codi-server.herokuapp.com');
        setRoom(room);
        setName(name)

        console.log(socket)
    
        socket.on("connect", () => {
          setIsConnected(true);
        });

        socket.on("pong!", (additionalStuff) => {
          console.log("the server answered!", additionalStuff);
        });
        
        socket.emit("whoami")
        socket.on("youare", (answer) => {
          setId(answer.id );
          
        });
        socket.on("disconnect", () => {
          setIsConnected(false);
        });

        socket.on("room", (old_messages) => {
          setMessages(old_messages);
          //setMessages(messages => [ ...messages, old_messages ]);
          //console.log(messages)
        });

        socket.on('peeps', (clients) => {
         setUsers(clients)
         //  console.log(this.state.users)
         }) 
        // this.socket.on("room", (old_messages) => {
        //   this.setState({oldMessages:old_messages})
        //  // console.log(this.state.oldMessages)
        // });

      }, [ENDPOINT, location.search]);

      // sendAnswer=()=>{
      //   const body={
      //     text:answer,
      //     id:id,
      //     name:name }
      //   this.socket.send(body,(message_from_server)=>console.log(message_from_server))
      // }
      // handleAnswer=(e)=>{
      //   e.preventDefault();
      //   setAnswer(e.target.value)
      //   console.log(answer)
    
      // }

    //   useEffect(() => {
    //     socket.on('message', message => {
    //       setMessages(messages => [ ...messages, message ]);
    //     });

    //     socket.on("roomData", ({ users }) => {
    //         setUsers(users);
    //       });
    // },[])

    const sendMessage=(event)=>{
        event.preventDefault()
        if (message){

          const body={
            text:message,
            id:id,
            name:name }

            socket.send(body,(message_from_server)=>console.log(message_from_server))
            setMessage('')
        }
    }

    //console.log(name,messages)
      

    return (
        <div className="outerContainer">
          <h1> status:{isConnected ? "connected" : "disconnected"}</h1>
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} n={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
    )
}
export default Chat;

{/* <input value={message}
                onChange={(event)=>setMessage(event.target.value)}
                onKeyPress={event=>event.key==='Enter'? sendMessage(event):null} /> */}