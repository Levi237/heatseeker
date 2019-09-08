import React, { Component }        from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';


import About  from './components/About';
import Order  from './components/Order';
import Form   from './components/Form';
import Nav    from './components/Nav';
// import Sale   from './components/Sale';
import Home   from './components/Home';
import Enter from './components/Enter';
import Show   from './components/modal/Show';


import * as routes  from './constants/routes';
import firebase from 'firebase/app';
import 'firebase/app';

export default class App extends Component {

  state = {

      user: null,
      chilis: [],
      spices: [],
      extras: [],
      vinegars: [],
      options: [],
      newRecipe: null,
      updateRecipe: null,
      selection: {},
      recipes: [],
      order: false,
  // }
  // state = {
    show: null,
}
showThisRecipe = (e) => {
    console.log(e.currentTarget.value, "click showThisREcipe target")
     this.setState({
         show: e.currentTarget.value
     })
}
showOrder = () => {
  this.setState({
    ...this.state,
    order: !this.state.order,
    newRecipe: null
  })
}
  componentDidMount = () => {
    this.authListener();
    this.loadForm();
    this.loadRecipes();
  }

  loadRecipes(){
    firebase
    .firestore()
    .collection('recipes')
    .onSnapshot(serverUpdate => {
      const recipesData = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      this.setState({ recipes: recipesData });
    });
  }

  loadForm(){
    firebase
    .firestore()
    .collection('chilis')
    .onSnapshot(serverUpdate => {
      const chilis = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      this.setState({ chilis: chilis });
    });
    firebase
    .firestore()
    .collection('spices')
    .onSnapshot(serverUpdate => {
      const spices = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      this.setState({ spices: spices });
    });
    firebase
    .firestore()
    .collection('extras')
    .onSnapshot(serverUpdate => {
      const extras = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      this.setState({ extras: extras });
    });
    firebase
    .firestore()
    .collection('vinegars')
    .onSnapshot(serverUpdate => {
      const vinegars = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
      });
      this.setState({ vinegars: vinegars });
    });
  }

  authListener(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user: user.providerData[0]});
      }else{
        this.setState({user: null});
      }
    });
  };
  logout = () => {
    firebase.auth().signOut();
  }

// split submit into a set state and a save to 

  submitForm =  async (e, data) => {
    e.preventDefault();
    this.setState({
      newRecipe: data
    })
  }

  clearNewRecipe = () => {
    this.setState({
      newRecipe: null
    })
  }
  render(){
    const { chilis, spices, extras, vinegars, newRecipe, updateRecipe, user, recipes, show, order } = this.state

    return (
      <div className="grid-container">
      
        <div className="grid-logo">
          <img src="logo.png" className="App-logo" alt="logo" />
        </div>

        <div className="grid-header">
          <h1>HEATMAKERSAUCE</h1>
        </div>

        <div className="grid-nav">
          <Nav logout={this.logout} user={user} order={order}/>
        </div>

        <div className="grid-main">
          <Switch>
            <Route path={routes.USER} exact render={() => 
                                      <Home 
                                        order={order}
                                        user={user} 
                                        recipes={recipes} 
                                        newRecipe={newRecipe} 
                                        show={show}
                                        showOrder={this.showOrder}
                                        showThisRecipe={this.showThisRecipe}/>} />
            <Route path={routes.HOME} render={() =>
                                      <Home 
                                        order={order}
                                        user={user} 
                                        recipes={recipes} 
                                        newRecipe={newRecipe} 
                                        show={show}
                                        showOrder={this.showOrder}
                                        showThisRecipe={this.showThisRecipe}/>} />                                        
            <Route path={routes.LOGN} exact render={() => user 
                                      ? <Redirect to={routes.HOME} /> 
                                      : <Enter />} />
            <Route path={routes.FORM} exact render={() => 
                                      <Form 
                                        user={user} 
                                        newRecipe={newRecipe} 
                                        chilis={chilis} 
                                        spices={spices} 
                                        extras={extras} 
                                        vinegars={vinegars} 
                                        setToggleApp={this.setToggleApp} 
                                        submitForm={this.submitForm}/> }/>
            <Route path={routes.SAVE} exact render={() => !newRecipe
                                      ? <Redirect to={routes.HOME} /> 
                                      : <Show 
                                        user={user} 
                                        newRecipe={newRecipe} 
                                        updateRecipe={updateRecipe} 
                                        updateForm={this.updateForm}
                                        clearNewRecipe={this.clearNewRecipe}
                                        showOrder={this.showOrder}
                                        // saveForm={this.saveForm}
                                        /> }/>    

            <Route path={routes.INFO} exact render={() => 
                                      <About /> }/>
            <Route path={routes.ECOM} exact render={() => 
                                      <Order /> }/>
            {/* <Route path={routes.SHOW} render={() => 
                                      <Show show={show} recipes={recipes}/> } /> */}
            <Route path={routes.ROOT} render={() => 
                                      <About /> }/>
          </Switch>
        </div>     
        
        <div className="grid-footer">
        <img className="chalk-bottom" src="chalkdarkorange.png" alt="footer line break"/><br />
          <section>&copy;LEVIEIKO.COM</section>
          </div>
      </div>
    );
  }
}