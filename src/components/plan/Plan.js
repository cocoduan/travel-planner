import React from 'react';
import ToolBar from './ToolBar';
import Rebase from 're-base';
import SearchResult from '../search/SearchResult';
import NoteList from '../note/NoteList';

// define selectedIndex on this.state so that isActive can be re-evaluated when clicking on a li

const base = Rebase.createClass({
    apiKey: "AIzaSyBfP3XRBk2nuIOlHSlsHWwyIHp9e8fE8i8",
    authDomain: "travel-planner-2860d.firebaseio.com",
    databaseURL: 'https://travel-planner-2860d.firebaseio.com'
});

export default class Plan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        this.ref = base.bindToState(`/map/notes`, {
            context: this,
            state: 'notes',
            asArray: true
        });

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addNote() {
        const note = {title: this.state.notes.length, places: []};
        base.post(`/map/notes`, {
            data: this.state.notes.concat(note)
        })
    }

    render() {
        return (
            <div className="card">
                <h3>{this.props.title}</h3>

                <div className="card-header">
                    <ToolBar onAdd={() => this.addNote()} />
                </div>

                <SearchResult place={this.props.searchedPlace} />

                <NoteList notes={this.state.notes}/>
            </div>
        );
    }
}

Plan.propTypes = {
    title: React.PropTypes.string.isRequired,
    searchedPlace: React.PropTypes.string,
};