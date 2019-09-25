import React, { Component } from 'react';

import firebase from 'firebase/app';
import { storage }   from 'firebase/app';
import 'firebase/firestore';

export default class UploadImage extends Component {
    state = {
        image: null,
        img: null,
    }
    saveUserImage = () => {
        const { img } = this.state
        // const { newRecipe, user } = this.props
        const addLabelImage = firebase.firestore()
            .collection('labels')
            .add({
                img
            })
        return addLabelImage
    }

    fileSelectedHandler = (e) => {
        if(e.target.files[0]){
          const image = e.target.files[0]
        //   image.name = `${this.props.user.uid}_${image.name}`
          this.setState(() => ({
              image: image
            }))
        //   this.setState(() => ({...image, name: uid+timestamp})) 
        }
    }
    handleUpload =  () => {
        const { image } = this.state
        const uid = firebase.auth().currentUser.uid;
        firebase
            .storage()
            .ref(`images/${uid}/${image.name}`)
            .put(image)
            .on('state_changed', 
                (snapshot) => {
                    console.log(snapshot)
                }, 
                (error) => {
                    console.log("ERROR ===>", error)
                    }, 
                () => {
                    storage().ref(`images/${uid}`).child(image.name).getDownloadURL().then(url => {
                        // console.log(url)
                        this.setState({img: {url: url, uid: uid}})
                    })
                }
            )  
    }

    render(){
        const { image, img } = this.state
        const uploadImage = 
            <>
                <input type="file" accept="image/*,.pdf" onChange={this.fileSelectedHandler}/> 
                {image && <button onClick={() => {this.handleUpload()}}>Upload</button> }
            </>
        return(<>
            <h4>Dimensions must be 4:5 (200px wide by 250px high)</h4>
            {!img && uploadImage}
            {img && <>
                <img className="uploaded-image" src={img.url} alt={image.name}/>
                <br/>
                <button onClick={() => {this.saveUserImage();}}>Save to Account</button>
            </>}
        </>)
    }
}