import React, { Component } from 'react';

import firebase from 'firebase/app';
import { storage }   from 'firebase/app';

export default class UploadImage extends Component {
    state = {
        image: null,
        url: "",
    }

    fileSelectedHandler = (e) => {
        if(e.target.files[0]){
          const image = e.target.files[0]
          this.setState(() => ({image}))
        }
    }
    handleUpload =  () => {
    const { image } = this.state
        firebase
        .storage()
        .ref(`images/${image.name}`)
        .put(image)
        .on('state_changed', 
            (snapshot) => {
                console.log(snapshot)
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                storage().ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url)
                    this.setState({url})
                })
            }
        )
    }
      
    render(){
        const { image, url } = this.state
        const uploadImage = <> <input type="file" accept="image/*,.pdf" onChange={this.fileSelectedHandler}/> <button onClick={() => {this.handleUpload()}}>Upload</button></>
        return(
            <>
            {uploadImage}
            {url && <img src={url} alt={image.name}/>}
            </>

        )
    }
}