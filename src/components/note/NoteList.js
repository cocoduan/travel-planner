import React from 'react';

export default class NoteList extends React.Component {
    render() {
        return (
            <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: 'grey', height: '100%'}}>
                {this.props.searchedPlace}
            </div>
        );
    }
}

NoteList.propTypes = {
    searchedPlace: React.PropTypes.string
};