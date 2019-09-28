import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class Enter extends Component{
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
            })
    };

    getAction = action => {
        if(action === "reg"){
            this.setState({formTitle: "Register New User", loginBtn: false, fireErrors: ""})
        }else{
            this.setState({formTitle: "Login", loginBtn: true, fireErrors: ""})
        }
    };


    render(){
        const { fireErrors, loginBtn, formTitle, email, password } = this.state
        const { newRecipe, onClose } = this.props

        let errorNotification = fireErrors ? 
            <div className="Error">{fireErrors}</div> : null;
        let submitBtn = loginBtn ? 
            <button className="loginBtn" type="submit" onClick={this.login}>Enter</button> : 
            <button className="loginBtn" type="submit" onClick={this.register}>Register</button>;
        let login_register = loginBtn ? 
            <button className="registerBtn" onClick={() => this.getAction('reg')}>Register</button> : 
            <button className="registerBtn" onClick={() => this.getAction('login')}>Login</button>;

        return(
            <div className="enter-container ">
                <div className="enter-form">
            { newRecipe && <button className="close xClose" onClick={(e) => {onClose(e)}}>X</button> }
                    <div className="errorNotification">{errorNotification}</div>
                    <div id="title">{formTitle}</div>
                        <div className="body">
                            <form>
                                <input type="email" value={email} onChange={this.handleChange} name="email" placeholder="email"/>
                                <input type="password" value={password} onChange={this.handleChange} name="password" placeholder="password"  />
                                {submitBtn}
                            </form>
                            {login_register}
                        </div>
                </div>
            </div>
        );
    };
};