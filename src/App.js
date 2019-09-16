import React, { Component }        from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import About from './components/About';
import Form  from './components/Form';
import Nav   from './components/Nav';
import Home  from './components/Home';
import Enter from './components/Enter';
import Show  from './components/modal/Show';

import HeadersExamples from './components/levi/Headers';
import Labels          from './components/levi/Labels';

import * as routes from './constants/routes';
import firebase    from 'firebase/app';
import 'firebase/app';

import './App.css';

export default class App extends Component {

  state = {
      user: null,
      chilis: [],
      spices: [],
      extras: [],
      vinegars: [],
      newRecipe: null,
      recipes: [],
      order: false,
      show: null,
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
  closeShow = () => {
    this.setState({
      show: null,
    })
  }

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


        <div className="grid-header">
          <img src="HEATMAKERS.png" alt="logo title" />
        </div>

        <div className="grid-nav">
          <Nav logout={this.logout} user={user} order={order}/>
        </div>

        <div className="grid-main">
          <Switch>
            <Route path={routes.HOME} render={() =>
                                      <Home 
                                        order={order}
                                        user={user} 
                                        recipes={recipes} 
                                        newRecipe={newRecipe} 
                                        show={show}
                                        showOrder={this.showOrder}
                                        closeShow={this.closeShow}
                                        showThisRecipe={this.showThisRecipe}/>} />                                        
            <Route path={routes.LOGN} exact render={() => user 
                                      ? <Redirect to={routes.HOME} /> 
                                      : <Enter />} />
            <Route path={routes.ENTR} exact render={() => <Enter />} />                          
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
                                        order={order} 
                                        newRecipe={newRecipe} 
                                        updateRecipe={updateRecipe} 
                                        updateForm={this.updateForm}
                                        clearNewRecipe={this.clearNewRecipe}
                                        showOrder={this.showOrder}
                                        closeShow={this.closeShow}
                                        /> }/>    

            <Route path={routes.INFO} exact render={() => 
                                      <About /> }/>
            <Route path={routes.ROOT} render={() => 
                                      <>
                                        <HeadersExamples />
                                        <Labels />
                                      </> }/>
          </Switch>
        </div>     
        
        <div className="grid-footer">
          <img className="chalk-bottom" src="chalkdarkorange.png" alt="footer line break"/><br />
          <section>&copy;LeviEiko.com</section><br />
          <section>&copy;HEATMAKERS</section>
        </div>
      </div>
    );
  }
}