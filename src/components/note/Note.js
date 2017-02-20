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
            <div className="container-fluid" style={{minHeight: '60px', padding: "0"}}>
                <div className="row">
                    <div className="col-md-7">
                        <Label text={this.props.note.title}
                               labelClass={"h4"}
                               onChange={(text) => this.props.onUpdateTitle(text)}>
                        </Label>
                    </div>
                    <div className="col-md-1 col-md-offset-3">
                        <button type="button" className="close" style={{float: "left", paddingTop: "5px"}}
                                onClick={() => this.props.onClose()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <ul className="list-group">
                    {lists}
                </ul>
            </div>
        );
    }
}

Note.propTypes = {
    note: React.PropTypes.object,
    onUpdateTitle: React.PropTypes.func,
    newPlace: React.PropTypes.string,
    onClose: React.PropTypes.func.isRequired
};

// Note {
//     title: string,
//     places: Place[]
// }