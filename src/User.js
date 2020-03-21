import React ,{ Component} from 'react';
import { Table , Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaPenSquare , FaSellcast , FaPlusCircle } from "react-icons/fa";
import ToggleSwitch from './ToggleSwitch';
let serialize = require('form-serialize');

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            userList:[
                {userid:1,username:"Mark",email:"Mark@yahoo.com",role:"Software Engineer", number:"7878787878"},
                {userid:2,username:"John",email:"John@gmail.com",role:"QA", number:"7878787878"},
                {userid:3,username:"Harry",email:"HARRY@yahoo.com",role:"Tech manager", number:"7878787878"}
            ],
            editList:[],
            searchData:[],
            inputVal:"",
            formFields : {}

        }
        this.edit = this.edit.bind(this);
        this.setFormFields = this.setFormFields.bind(this);
    }
    
    setModal = (data) =>{
        this.setState({modal:data})
    }
    toggle = () =>{
        this.setModal(!this.state.modal)
    }
    closeBtn = () => <button className="close" onClick={this.toggle}>&times;</button>;
    getData = (e) =>{
        e.preventDefault();
        var form = document.querySelector('#new-user');
        var obj = serialize(form, { hash: true });
        let newUser = this.state.userList;
        let rowAlreadyExists = this.state.userList.filter(x=> (x.userid).toString() === obj.userid);
        if(rowAlreadyExists.length === 0)
        {
            newUser.push(obj);
        }
       this.setState({newUser,modal:false});
    }
    setFormFields = (shownField) => {
        this.state.editList = [];
        const json_data = this.state.userList.filter( data => (data.userid).toString() === shownField );
        let editlist = this.state.editList;
        editlist.push(json_data);
        let inputs = document.querySelector('#new-user input').length;
        this.setState({editList : editlist})
    }
    edit = (e) => {
       const shownField = e.target.closest('tr').id;
       this.setState({modal:!this.state.modal},() => setTimeout(() => this.setFormFields(shownField),0));
    }
    setVal = e => {
        let form_id = e.target.closest('#new-user').className[0] - 1;
        let newuserlist = this.state.userList;
        let formlist = this.state.formFields;
        if(this.state.userList[form_id] === undefined){
            this.state.formFields[e.target.name] = e.target.value;
        }
        else{
            this.state.userList[form_id][e.target.name] = e.target.value;
        }
        this.setState({userList:newuserlist, formFields:formlist})
    }
    getForm(){
        return (
            <Form id='new-user' onSubmit={this.getData} className={this.state.editList.length == 0 ? this.state.userList.length + 1 + " user ":this.state.editList[0][0].userid + " user "} >
                    <Input type="text" name="userid" id="userid" value={this.state.editList.length == 0 ? this.state.userList.length + 1 :this.state.editList[0][0].userid } className="hidden-field" onChange = {this.setVal} />                   
                <FormGroup>
                    <Label for="username">Name</Label>
                    <Input type="text" name="username" id="username" placeholder="Enter name here" value={this.state.editList.length == 0 ? this.state.formFields.username : this.state.editList[0][0].username} onChange = {this.setVal}required />
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter email address here"  value={this.state.editList.length == 0 ? this.state.formFields.email : this.state.editList[0][0].email} onChange = {this.setVal} required/>
                </FormGroup>
                <FormGroup>
                <Label for="number">Phone Number</Label>
                <Input type="number" name="number" id="number" placeholder="Enter phone number here" value={this.state.editList.length == 0 ? this.state.formFields.number : this.state.editList[0][0].number}  onChange = {this.setVal} required/>
                </FormGroup>
                <FormGroup>
                <Label for="role">Role</Label>
                <Input type="text" name="role" id="role" placeholder="Enter role here" value={this.state.editList.length == 0 ? this.state.formFields.role : this.state.editList[0][0].role} onChange = {this.setVal} required/>
                </FormGroup>

                <input type="submit" className="btn btn-submit w-100" value="Submit" />
            </Form>
        )
    }

    static getDerivedStateFromProps(props,state){
        let searchFor = props.searchData.toUpperCase();
        let srcdta = state.searchData;
        srcdta = [];
        state.userList.map(json => {
             let json_keys = Object.values(json).map(x =>  x.toString().toUpperCase().includes(searchFor));
             if(json_keys.includes(true)){
                 srcdta.push(json)
             }
             return srcdta
         });
         return { searchData : srcdta , inputVal:props.searchData} 
    }
    render(){
       let Class = "w-" + this.props.data + " ";
        return (
            <div className={this.props.hasOwnProperty("data") === true ? Class + "transition-2 bx-shdw user-data" : "bx-shdw w-90 transition-2 user-data"}>
                <h3 className="text-center bb-grey">Manage Users</h3>
                <button className="w-75 lh-2 add-more" onClick={this.toggle}><FaPlusCircle/>Add</button>
                <div className="scrollar">
                    <Table >
                        <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                                {this.state.searchData.map(x=> <tr key={x.userid} id={x.userid}><th scope="row">{x.userid}</th><td>{x.username}</td><td>{x.email}</td><td>{x.role}</td><td><button className="action-button"><FaPenSquare className="adjustSize green" onClick={this.edit}/></button><button className="action-button"><FaSellcast  className="adjustSize navyblue"/></button></td><td><ToggleSwitch id={x.userid}/></td></tr>)}                     
                        </tbody>
                    </Table>
                </div>
                {this.state.modal === true?
                        <Modal
                        isOpen={this.state.modal} toggle={this.toggle}
                        aria-labelledby="example-custom-modal-styling-title"
                        >
                        <ModalHeader toggle={this.toggle}>
                        Add New User
                        </ModalHeader>
                        <ModalBody>
                            {this.getForm()}
                        </ModalBody>
                        </Modal>
                        :""}
            </div>
        )
    }
}
