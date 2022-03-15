import VpnCheck from './request';
import APP from './working/APP';
import {React,Component} from 'react';
import axios from 'axios';
class App extends Component{
  constructor(){
    super();
    this.state={
      state:1,
      value:1,
    }
  }
  async componentDidMount(){
    var j= await axios.post(`http://localhost:5000/vpn/check`,{});
    this.setState({state:j.data.result});
      console.log(this.state.value);
  }
  render(){
    return (
      <div className="App">
        {
          (this.state.state===0)?<APP/>:<VpnCheck/>
        }
      </div>
    );
  }
}

export default App;