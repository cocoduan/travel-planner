import React from 'react';

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
                <h4>{this.props.note.title}</h4>
                <ul className="list-group">
                    {lists}
                </ul>
            </div>
        );
    }
}

Note.propTypes = {
    note: React.PropTypes.object,
    newPlace: React.PropTypes.string
};

// Note {
//     title: string,
//     places: Place[]
// }