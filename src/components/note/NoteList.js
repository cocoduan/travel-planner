import React from 'react';
import Note from './Note';

export default class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
    }

    selectNote(selectedIndex) {
        this.setState({selectedIndex});

        // update parent Plan container
        this.props.selectNote(selectedIndex);
    }

    isActive(index) {
        return (index === this.state.selectedIndex) ? ' selected' : '';
    }

    render() {
        return (
            <ul className="list-group">
                {this.props.notes.map((note, index) => (
                    <li className={`note-card list-group-item ${this.isActive(index)}`} key={index}
                        onClick={this.selectNote.bind(this, index)}>
                        <Note note={note}
                              onUpdateTitle={(title) => this.props.onUpdateNoteTitle(title)}
                              onClose={() => this.props.onRemoveNote()}/>
                    </li>
                ))}
            </ul>
        );
    }
}

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired,
    selectNote: React.PropTypes.func.isRequired,

    onUpdateNoteTitle: React.PropTypes.func.isRequired,
    onRemoveNote: React.PropTypes.func.isRequired
};
