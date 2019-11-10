import React,{component} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './login.css';

class Register extends component{
    constructor(){
        super();
        this.state ={
            'username':'',
            'password':''
        };
    }
    onChange =(e)=>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        
    }

    onSubmit = (e)=>{
        e.preventDefault();
        const {username,password} = this.state;
        axios.post('/api/auth/register',{username,password})
        .then((result)=>{
            this.props.history.push('/');
        })

    }
    render(){
        const {username,password,message} = this.state;
        return(
            <div class="container">
                <form onSubmit={this.onSubmit} class="form-signin">
                    <h3 class="form-signin-heading">Please Register Here</h3>
                    <label for='inputEmail' class='sr-only'>Enter Email:</label>
                    <input type="email" class="form-control" placeholder="Enter Email Address" name="username" value={username} onChange={this.onChange} required/>
                    <label class="sr-only">Enter Password:</label>
                    <input type="password" class="form-control" placeholder="Enter Password" name="password"  onChange={this.onChange} required/>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                </form>

            </div>
        )
    }
}

export default Register;
