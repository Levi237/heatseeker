import React, { Component } from 'react';

export default class UploadImage extends Component {
    state = {
        image: null,
        url: "",
    }
    render(){

        const uploadImage = <> <input type="file" onChange={this.fileSelectedHandler}/> <button onClick={() => {this.handleUpload()}}>Upload</button></>
        return(
            <>
            {uploadImage}
            </>
        )
    }
}