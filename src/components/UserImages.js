import React, { Component } from 'react';
import firebase from 'firebase'

export default class UserImages extends Component {
    state = {
        labels: [],
    }
    componentDidMount(){
        this.loadImages()
    }
    loadImages(){
        // const { labels } = this.state
        firebase.firestore().collection('labels').onSnapshot(serverUpdate => {
            const labels = serverUpdate.docs.map(_doc => {
                const data = _doc.data();
                data['id'] = _doc.id;
                return data
            });
            this.setState({
                labels: labels
            })
        })
    }
    render(){
        const { labels } = this.state
        const labelsList = labels.map(label => {
            console.log('label.img', label.img.url)
            // const imageUrl = label.img
            return(
                <div>
                    <img src={label.img.url}/>
                    
                </div>
            )
        })
        // const labelsList = <h3>User Images Supposedly</h3>

        return(
            <>{labelsList}</>
        )
    }
}