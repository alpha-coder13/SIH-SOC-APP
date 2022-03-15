import React from 'react';
import axios from 'axios';
import Chat from '../chat/chat';
import './mainscreen.css';

class Mainscreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: this.props.data,
            userdata: []
        }
    }
    componentDidMount=async()=>{
        await axios.get(`http://localhost:5000/user/`)
        .then((res)=>{
            this.setState({userdata: res.data})
            //console.log("Data", this.state.userdata)
        })
    }
    getCurrent=(data)=>{
        this.setState({userdata: data});
        //console.log(data)
    }
    render(){
        return(<div className='mainscreen'>
            <Chat data = {this.props.data}/>
        </div>);
    }
}
export default Mainscreen;