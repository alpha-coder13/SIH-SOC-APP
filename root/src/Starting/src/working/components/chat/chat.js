import React, { Component } from 'react';
import axios from 'axios';
import './chat.css';

class Chat extends Component {
    constructor() {
        super()
        this.changehandler = this.changeHandler.bind(this);
        this.sendhandler = this.sendHandler.bind(this);
        this.refreshHandler = this.refreshHandler.bind(this);
        this.checkNewMessages = this.checkNewMessages.bind(this);
        this.createHandler = this.createHandler.bind(this);
        this.joinHandler = this.joinHandler.bind(this);
    }
    state = { 
        message: "",
        roomID: "",
        email: "",
        messages:[
        ],
        meet: false
     } 
     componentDidMount(){
       this.checkNewMessages();       
       setInterval(()=>{
           this.checkNewMessages();
       }, 1000);
     }
     changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    checkNewMessages(){
        this.refreshHandler()
    }
    sendHandler=async(e)=>{
        e.preventDefault();
        console.log("sent");
        const nsfw=false;
        await axios.post(`https://moderataur.herokuapp.com/api/post/NSFW/v2/status`, { text: this.state.message },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(async res => {
          //console.log(res.data);
          const arr = res.data.true_categories;
            await axios.post(`http://localhost:5000/rooms/message`, { 
                roomID: this.state.roomID,
                email: this.state.email,
                message: this.state.message,
                nsfw: (arr.length>0)?true:false})
            .then(res => {
            console.log(res.data);
            this.setState({message: ""})
            })
        })
        
    }
    refreshHandler=async(e)=>{
        if(e){
            e.preventDefault();
        }
        if(this.state.meet){
            //console.log("res");
            await axios.post(`http://localhost:5000/rooms/getMessages`, { 
                roomID: this.state.roomID})
            .then(res => {
                //console.log(res)
                //console.log(this.state.messages)
              this.setState({messages: res.data.messagedata})
            })
        }
        
    }
    createHandler=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:5000/rooms/newroom`, {  })
        .then(res => {
          this.setState({
            roomID: res.data.roomID,
            meet: true
            })
        })
    }
    joinHandler=(e)=>{
        e.preventDefault();
        this.setState({meet: true});
    }
    render() { if(this.state.meet===true){
        return (<div className='chat'>
            <div className='navbar'><center>Chat app</center><a href={`http://localhost:5000/logout`} className="logout">LOGOUT</a></div>
            <div className='chatarea'>
                {(this.state.messages===undefined)?null:this.state.messages.map((e)=>{
                    return(<div className={ `indmessage ${this.state.email === e.email?`mymessage`:`notmymessage`}`}><div className={(e.nsfw===true?`redmsg`: 'msg')}>{e.email} : {e.message}</div> </div>)
                })}
            </div>
                <div className='data'><label className="label">Email :</label><input type="text" name="email" class="emailbox" value={this.state.email} onChange={this.changeHandler}/>     </div>
                <div className='data'><label className="label">Room ID :</label><input type="text" name="roomID" class="emailbox" value={this.state.roomID} onChange={this.changeHandler}/></div>

                <div className='chatsender'>
                <input type="text" name="message" className="messageboxinner" value={this.state.message} onChange={this.changeHandler}/>
                <button type="submit" name="send" className="sendbutton" onClick={this.sendHandler}>SEND</button>
            </div>
        </div>)
        } else {
            return (<div className='chat'>
                <center><br/><br/><br/><br/><br/><button type="submit" name="send" className="sendbutton" onClick={this.createHandler}>Create New Meet</button><br/><br/>
                <br/><br/>
            <input type="text" name="roomID" className="joinmeetbox" value={this.state.roomID} onChange={this.changeHandler}/>
            <button type="submit" name="send" className="sendbutton" onClick={this.joinHandler}>Join Meet</button></center>
            </div>)
        }
    }
}
 
export default Chat;