import React from 'react';
import Note from './Note';

export default class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: undefined
        }
    }

    selectNote(index) {
        console.log("note index: ", index);
        this.setState({selectedIndex: index});
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
                        <Note note={note}/>
                    </li>
                ))}
            </ul>
        );
    }
}

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired
};