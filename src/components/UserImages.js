import React, { Component } from 'react';

export default class UserImages extends Component {
    state = {
        labels: null,
    }
    componentDidMount(){
        this.loadImages()
    }
    loadExamples(){
        firebase.firestore().collection('examples').onSnapshot(serverUpdate => {
            const examples = serverUpdate.docs.map(_doc => {
                const data = _doc.data();
                data['id'] = _doc.id;
                return data
            });
            this.setState({
                labels
            })
        })
    }
    redner(){
        return(
            <></>
        )
    }
}