import React,{component} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';


import './login.css';

class Login extends component{
    constructor(){
        super();
        this.state ={
            'username':'',
            'password':'',
            'message':''
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
        axios.post('/api/auth/login',{username,password})
        .then((result)=>{
            localStorage.setItem('jwtToken',result.data.token);
            this.setState({message:''});
            this.props.history.push('/');
        })
        .catch((error)=>{
            if(error.response.status === 401){
                this.setState({message:"login Failed ! You are Not Authorized."})
            }
        })

    }
    render(){
        const {username,password,message} = this.state;
        return(
            <div class="container">
                <form onSubmit={this.onSubmit}>
                    {message!='' && <div class="alert alert-warning alert-dismissible" role='alert'>
                        {message}
                    </div>}
                    <h3 class="form-signin-heading">Please Sign In Here</h3>
                    <label for='inputEmail' class='sr-only'>Enter Email:</label>
                    <input type="email" class="form-control" placeholder="Enter Email Address" name="username" value={username} onChange={this.onChange} required/>
                    <label class="sr-only">Enter Password:</label>
                    <input type="password" class="form-control" placeholder="Enter Password" name="password"  onChange={this.onChange} required/>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                <p>
                    <Link to="/register">Register</Link>
                </p>
                </form>

            </div>
        )
    }

        
}

export default Login;

