import React from 'react';
import ToolBar from './ToolBar';
import SearchResult from '../search/SearchResult';
import NoteList from '../note/NoteList';
import Rebase from 're-base';
import Label from '../label/Label';

// define selectedIndex on this.state so that isActive can be re-evaluated when clicking on a li
// must init empty array, could use places || []

const base = Rebase.createClass({
    apiKey: "AIzaSyBfP3XRBk2nuIOlHSlsHWwyIHp9e8fE8i8",
    authDomain: "travel-planner-2860d.firebaseio.com",
    databaseURL: 'https://travel-planner-2860d.firebaseio.com'
});
export default class Plan extends React.Component {

    //--------------
    //  init
    //--------------

    constructor(props) {
        super(props);
        this.state = {
            place: this.props.searchPlace,
            notes: [],
            title: ""
        }
    }

    componentDidMount() {
        this.refNotes = base.bindToState(`/map/notes`, {
            context: this,
            state: 'notes',
            asArray: true
        });

        this.refTitle = base.bindToState(`/map/title`, {
            context: this,
            state: 'title',
            asObject: true
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.refNotes);
        base.removeBinding(this.refTitle);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            place: nextProps.searchPlace
        });
    }


    //--------------
    //  helpers
    //--------------

    noteIndex = 0;

    addNote() {
        const note = {title: String(this.state.notes.length), places: []};
        base.post(`/map/notes`, {
            data: this.state.notes.concat(note)
        })
    }

    addPlace() {
        const places = this.state.notes[this.noteIndex].places || [];

        base.post(`/map/notes/${this.noteIndex}/places`, {
            data: places.concat(this.state.place)
        }).then(() => {
            this.removePlace();
        }).catch((err) => console.error(err));
    }

    removePlace() {
        this.setState({
            place: null
        });
    }

    updatePlanTitle(title) {
        base.post(`/map/title`, {
            data: title
        });
    }

    updateNoteTitle(title) {
        base.post(`/map/notes/${this.noteIndex}/title`, {
            data: title
        }).catch((err) => console.error(err));
    }

    //--------------
    //  render
    //--------------

    render() {
        return (
            <div className="card">
                <Label labelClass={"h3"} text={this.state.title}
                       onChange={(title) => this.updatePlanTitle(title)}></Label>

                <div className="card-header">
                    <ToolBar onAdd={() => this.addNote()}/>
                </div>

                <SearchResult place={this.state.place}
                              onClose={() => this.removePlace()}
                              onAdd={() => this.addPlace()}/>

                <NoteList notes={this.state.notes}
                          selectNote={(index) => this.noteIndex = index}
                          onUpdateNoteTitle={(title) => this.updateNoteTitle(title)}/>
            </div>
        );
    }
}

Plan.propTypes = {
    searchPlace: React.PropTypes.string
};