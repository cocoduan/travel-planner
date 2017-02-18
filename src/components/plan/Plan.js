import React from 'react';
import ToolBar from './ToolBar';
import SearchResult from '../search/SearchResult';
import NoteList from '../note/NoteList';
import Rebase from 're-base';

// define selectedIndex on this.state so that isActive can be re-evaluated when clicking on a li

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
        const note = {title: this.state.notes.length, places: []};
        base.post(`/map/notes`, {
            data: this.state.notes.concat(note)
        })
    }

    addPlace() {
        base.fetch(`/map/notes/${this.noteIndex}/places`, {
            context: this,
            asArray: true,
            then(places) {
                base.post(`/map/notes/${this.noteIndex}/places`, {
                    data: places.concat(this.state.place)
                }).then(() => {
                    this.removePlace();
                }).catch((err) => console.error(err));
            }
        });
    }

    removePlace() {
        this.setState({
            place: null
        });
    }

    //--------------
    //  render
    //--------------

    render() {
        return (
            <div className="card">
                <h3>{this.props.title}</h3>

                <div className="card-header">
                    <ToolBar onAdd={() => this.addNote()}/>
                </div>

                {
                    this.state.place && <SearchResult place={this.state.place}
                                                      onClose={() => this.removePlace()}
                                                      onAdd={() => this.addPlace()}/>
                }

                <NoteList notes={this.state.notes}
                          selectNote={(index) => this.noteIndex = index}/>

            </div>
        );
    }
}

Plan.propTypes = {
    title: React.PropTypes.string.isRequired,
    searchPlace: React.PropTypes.string,
};