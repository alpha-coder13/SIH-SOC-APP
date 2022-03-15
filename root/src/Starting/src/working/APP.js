import './APP.css';
import Mainscreen from './components/main/mainscreen';
import Auth from './components/auth/auth';
import React from 'react';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      state:0,
      userdata: {}
    }
    this.pull_data=this.pull_data.bind(this);
  }
  pull_data = (data)=>{
    this.setState({state:1,userdata:data});
  }
  render(){
    return (
      <div className="App">
        {
          (this.state.state===0)?<Auth authenticate={this.pull_data}/>:<Mainscreen data={this.state.userdata}/>
        }
      </div>
    );
  }
}

export default App;