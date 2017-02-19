import React from 'react';

// Note: onClick={() => this.props.onClose()}, not onClick={this.props.onClose()};
// the latter is wrong which will return the result of onClose() to onClick immediately...

export default class SearchResult extends React.Component {
    render() {
        return !this.props.place ? null : (
            <div style={{paddingLeft: "15px", paddingBottom: "15px", paddingRight: "15px"}}>
                <button type="button" className="close" style={{float: "left", paddingRight: "15px"}}
                        onClick={() => this.props.onClose()}>
                    <span aria-hidden="true">&times;</span>
                </button>

                <span className="d-inline-block">{this.props.place}</span>

                <button type="button" className="close"
                        onClick={() => this.props.onAdd()}>
                    <span aria-hidden="true">+</span>
                </button>
            </div>
        );
    }
}
SearchResult.propTypes = {
    place: React.PropTypes.string
};