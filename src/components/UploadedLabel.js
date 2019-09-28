import React, { Component } from 'react';
// import firebase from 'firebase/app'

export default class UploadedLabel extends Component {
    // state = {
    //     labels: [],
    // }
    // componentDidMount(){
    //     this.loadImages()
    // }
    // loadImages(){
    //     firebase.firestore().collection('labels').onSnapshot(serverUpdate => {
    //         const labels = serverUpdate.docs.map(_doc => {
    //             const data = _doc.data();
    //             data['id'] = _doc.id;
    //             return data
    //         });
    //         this.setState({labels})
    //     })
    // }

    render(){
        // const { label } = this.prop
        // console.log(label)
        return(
            <div>
                {/* <img className="uploaded-image" src={labels[0].img.url}/>   */}
            </div>
        )
    }

}