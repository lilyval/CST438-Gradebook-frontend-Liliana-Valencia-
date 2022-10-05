import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js'

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

class NewAssignment extends Component {
    constructor(props) {
      super(props);
      this.state = {courseId: '', assignmentName: '', dueDate: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    };
    
    handleChange(event){
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
    
    //HW3 Adding button
    handleSubmit(event){
    	event.preventDefault();
    	console.log("NewAssignment.handleSubmit");
    	console.log(JSON.stringify({courseId:this.state.courseId, assignmentName:this.state.assignmentName, dueDate:this.state.dueDate}));
    	const token = Cookies.get('XSRF-TOKEN');
    
    fetch(`${SERVER_URL}/gradebook`, 
      {  
        method: 'POST', 
        headers: { 'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token },
        body: JSON.stringify({courseId:this.state.courseId, assignmentName:this.state.assignmentName, dueDate:this.state.dueDate})
      } )
    .then((res) => {
    	if (res.ok){
    	  toast.success("Assignment created", {position: toast.POSITION.BOTTOM_LEFT});
    	  this.setState({courseId: '', assignmentName: '', dueDate: ''});
    	}else{
    	  console.log(res.body);
    	  toast.error("Assignment was not created", {position: toast.POSITION.BOTTOM_LEFT});
    	  console.error("status" + res.status);
    }})
    	.catch(err => {
    	  toast.error("Assignment was not created", {position: toast.POSITION.BOTTOM_LEFT});
    	  console.error(err);
    	
    });
 }

  render() {
      return (
          <div align="left" >
            <h4>Add a new Assignment!: </h4>
            <form onSubmit={this.handleSubmit}>
            <label>Course Id: </label>
            <p>
            <input type="text" name="courseId" value={this.state.courseId} onChange={this.handleChange}/>
            </p>
            <label>Assignment Name: </label>
            <p>
            <input type="text" name="assignmentName" value={this.state.assignmentName} onChange={this.handleChange}/>
            </p>
            <label>Due Date:  </label>
            <p>
            <input type="text" name="dueDate" value={this.state.dueDate} onChange={this.handleChange}/>
            </p>
            <p>
            <input type="submit" value= "Submit"/>
            </p>
            <div>
            <ToastContainer autoClose={1500} />
            </div>
          </div>
      )
  }
}  

export default Assignment;