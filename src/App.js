import React, { Component }        from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import About from './components/const/About';
import Form  from './components/Form';
import Nav   from './components/const/Nav';
import Home  from './components/Home';
import Enter from './components/Enter';
import Show  from './components/Show';
import Edit  from './components/Edit';

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
      edit: null,
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
    .orderBy('timestamp', 'desc')
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

  submitForm =  async (e, data) => {
    e.preventDefault();
    this.setState({
      newRecipe: data
    })
  }

  showThisRecipe = (e) => {
      this.setState({
          show: e.currentTarget.value
      })
  }
  clearNewRecipe = () => {
    this.setState({
      newRecipe: null
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

  editRecipeID = (e) => {
    e.preventDefault();
    this.setState({
        edit: e.target.value
    })
    }
  closeEditForm = (e) => {
    e.preventDefault();
    this.setState({
      edit: null
    })
  }

  render(){
    const { chilis, spices, extras, vinegars, newRecipe, updateRecipe, user, recipes, show, order, edit } = this.state

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
                      edit={edit}
                      showOrder={this.showOrder}
                      closeShow={this.closeShow}
                      editRecipeID={this.editRecipeID}
                      showThisRecipe={this.showThisRecipe}/>} />                                        
            <Route path={routes.LOGN} exact render={() => user 
                  ? <Redirect to={routes.HOME} /> 
                  : <Enter />} />
            <Route path={routes.ENTR} exact render={() => user 
                  ? <Home 
                      order={order}
                      user={user} 
                      recipes={recipes} 
                      newRecipe={newRecipe} 
                      show={show}
                      edit={edit}
                      showOrder={this.showOrder}
                      closeShow={this.closeShow}
                      editRecipeID={this.editRecipeID}
                      showThisRecipe={this.showThisRecipe}/>
                  : <Enter />} />                          
            <Route path={routes.FORM} exact render={() => 
                    <Form 
                      user={user} 
                      recipes={recipes}
                      newRecipe={newRecipe} 
                      chilis={chilis} 
                      spices={spices} 
                      extras={extras} 
                      vinegars={vinegars} 
                      edit={edit}
                      setToggleApp={this.setToggleApp} 
                      submitForm={this.submitForm}
                      /> }/>
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
                      edit={edit}
                      editRecipeID={this.editRecipeID}
                      /> }/>    
            <Route path={routes.EDIT} exact render={() => !edit
                  ? <Redirect to={routes.HOME} /> 
                  : <Edit                                         
                      user={user} 
                      recipes={recipes}
                      newRecipe={newRecipe} 
                      chilis={chilis} 
                      spices={spices} 
                      extras={extras} 
                      updateRecipe={updateRecipe} 
                      vinegars={vinegars} 
                      edit={edit}
                      closeEditForm={this.closeEditForm}
                      setToggleApp={this.setToggleApp} 
                      submitForm={this.submitForm}
                      /> }/> 
            <Route path={routes.INFO} exact render={() => 
                    <About /> }/>
            <Route path={routes.ROOT} render={() => user 
                  ? <Home /> 
                  : <Enter /> }/>
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