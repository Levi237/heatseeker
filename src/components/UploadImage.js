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
        const uploadImage = <>
                                <input type="file" accept="image/*,.pdf" onChange={this.fileSelectedHandler}/> 
                                {image &&

                                <button onClick={() => {this.handleUpload()}}>Upload</button>
                                }
                            </>
        return(
            <>
            <h4>Dimensions must be 4:5 (200px wide by 250px high)</h4>
            {!url && uploadImage}
            {url && <img className="uploaded-image" src={url} alt={image.name}/>}
            </>

        )
    }
}