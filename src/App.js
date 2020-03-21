import React from 'react';
import User from './User';
import Header from './Header';
import './App.css'; 
import Sidebar from './Sidebar';
import Roles from './Roles';
import Privileges from './Privileges';


export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isCollapsed :'',
      searchedfor:"",
      RouteComponent:window.location.href.split('/')[window.location.href.split('/').length -1]
    }
    this.RouteComponent =  this.RouteComponent.bind(this)
  }
  RouteComponent = router => {
    this.setState({RouteComponent:router})
  }
  searchData = (input) => {
    this.setState({searchedfor:input});
  }
  getData = (data) => {
    this.setState({isCollapsed:data})
  }
  render(){
    let ComponentsToShow = (this.state.RouteComponent === "roles" ? <Roles/> : (this.state.RouteComponent === "privileges" ? <Privileges/> : <User/>)) ;
    return (
      <div>
        <Header data = {this.getData} searchData ={this.searchData}/>
        {
        this.state.RouteComponent === "roles" ? 
        this.state.isCollapsed === true ?
        <div className="flex main-content">
          <Sidebar RouteComponent={this.RouteComponent} data="25"/>
          <Roles data="75" searchMethod ={this.searchData} searchData ={this.state.searchedfor}/>
        </div> : 
        <div className="main-content" >
          <Roles searchData ={this.state.searchedfor}/>
        </div>  : 
        this.state.RouteComponent === "privileges" ?
        this.state.isCollapsed === true ?
        <div className="flex main-content">
          <Sidebar RouteComponent={this.RouteComponent} data="25"/>
          <Privileges data="75" searchMethod ={this.searchData} searchData ={this.state.searchedfor}/>
        </div> : 
        <div className="main-content" >
          <Privileges searchData ={this.state.searchedfor}/>
        </div>  : 
         this.state.isCollapsed === true ?
         <div className="flex main-content">
           <Sidebar RouteComponent={this.RouteComponent} data="25"/>
           <User data="75" searchMethod ={this.searchData} searchData ={this.state.searchedfor}/>
         </div> : 
         <div className="main-content" >
           <User searchData ={this.state.searchedfor}/>
         </div>  
        }
      </div>
      
    )
}
}

