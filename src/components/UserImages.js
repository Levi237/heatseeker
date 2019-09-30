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
        firebase.firestore().collection('labels').onSnapshot(serverUpdate => {
            const labels = serverUpdate.docs.map(_doc => {
                const data = _doc.data();
                data['id'] = _doc.id;
                return data
            });
            this.setState({labels})
        })
    }

    render(){
        const { labels } = this.state
        const { uid } = this.props

        const labelsList = labels.map(label => {
            // console.log(uid, label.img.uid)
            if (uid === label.img.uid){
                // console.log("match")
                return(
                    <div>
                        <img className="uploaded-image" src={label.img.url}/>  
                    </div>
                )
            }
        })
        return(
            <>{labelsList}</>
        )
    }
}