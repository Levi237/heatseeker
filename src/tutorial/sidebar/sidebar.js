import React, { Component } from 'react';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'


import SideBarItemComponent from '../sidebaritem/sidebaritem'

class SideBarComponnt extends Component {
    state = {
        addingNote: false,
        title: null,
    }

    
    render(){
        const { notes, classes, selectedNoteIndex} = this.props
        
        if (notes) {
        return(
            <div className={classes.sidebarContainer}>
            <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>{this.state.addingNote ? "Cancel" : "New Note"}</Button>
            {
                this.state.addingNote 
                ? <div><input type="text" className={classes.newNoteInput} placeholder="enter note title" onKeyUp={(e) => this.updateTitle(e.target.value)}></input><Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>Submit Note</Button></div> 
                : null
            }
            
            <List >
                {
                    notes.map((_note, _index) => {
                        return (
                            <div key={_index}>
                                <SideBarItemComponent 
                                    _note={_note}
                                    _index={_index}
                                    selectedNoteIndex={selectedNoteIndex}
                                    selectNote={this.selectNote}
                                    deleteNote={this.deleteNote} >
                                </SideBarItemComponent>
                                <Divider></Divider>
                            </div>
                        )
                    })
                }
            </List>
            </div>
        )
    } else {
        return(<div>Add a Note!</div>)
    }

}
    newNoteBtnClick = () => {
        this.setState({title: null, addingNote: !this.state.addingNote})
        console.log('New Button Clicker')
    }
    updateTitle = (txt) => {
        this.setState({title: txt})
    }
    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({title: null, addingNote: false})
    }
    selectNote = (n, i) => {
        this.props.selectNote(n, i)
    }
    deleteNote = (note) => {
        this.props.deleteNote(note)
    }
}
export default withStyles(styles)(SideBarComponnt)