import React, { Component } from 'react';
// import firebase from 'firebase/app'
const firebase = require('firebase')

export default class LoginRegister extends Component{
    state = {
        email: "",
        password: "",
        fireErrors:"",
        formTitle: "Login",
        loginBtn: true,
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    login = e => {
        e.preventDefault();
        
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
                this.setState({fireErrors: error.message})
            });
    };
    register = e => {
        e.preventDefault();
        
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
                this.setState({fireErrors: error.message})
            });
    };

    getAction = action => {
        if(action === "reg"){
            this.setState({formTitle: "Register New User", loginBtn: false, fireErrors: ""})

        }else{
            this.setState({formTitle: "Login", loginBtn: true, fireErrors: ""})
        }
    };

    render(props){

        let errorNotification = this.state.fireErrors ? 
            <div className="Error">{this.state.fireErrors}</div> : null;
        let submitBtn = this.state.loginBtn ? 
            <button className="loginBtn" type="submit" onClick={this.login}>Enter</button> : 
            <button className="loginBtn" type="submit" onClick={this.register}>Register</button>;
        let login_register = this.state.loginBtn ? 
            <button className="registerBtn" onClick={() => this.getAction('reg')}>Register</button> : 
            <button className="registerBtn" onClick={() => this.getAction('login')}>Login</button>;

        return(
            <div className="form-block">
            {errorNotification}
                <div id="title">{this.state.formTitle}</div>
                <div className="body">
                    <form>
                        <input type="email" value={this.state.email} onChange={this.handleChange} name="email" placeholder="name"/> <br />
                        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password"  /><br />
                        {submitBtn}
                    </form>
                    {login_register}
                </div>
            </div>
        );
    };
};