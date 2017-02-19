import React from 'react';
import Label from '../label/Label';

export default class Note extends React.Component {
    render() {
        let lists;
        if (this.props.note && this.props.note.places && this.props.note.places.length > 0) {
            lists = this.props.note.places.map((place, index) => (
                <li className="list-group-item" key={index}>{place}</li>
            ));
        }
        return (
            <div style={{minHeight: '60px'}}>
                <Label text={this.props.note.title} labelClass={"h4"}
                       onChange={(text) => this.props.onUpdateTitle(text)}>
                </Label>
                <ul className="list-group">
                    {lists}
                </ul>
            </div>
        );
    }
}

Note.propTypes = {
    note: React.PropTypes.object,
    newPlace: React.PropTypes.string,
    onUpdateTitle: React.PropTypes.func
};

// Note {
//     title: string,
//     places: Place[]
// }