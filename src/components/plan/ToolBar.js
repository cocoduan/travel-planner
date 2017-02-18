import React from 'react';

export default class ToolBar extends React.Component {
    render() {
        return (
            <div className="btn-group" style={{paddingBottom: "15px"}}>
                <button type="button" className="btn btn-default" onClick={() => this.props.onAdd()}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> New Day
                </button>
            </div>
        );
    }
}
ToolBar.propTypes = {
    onAdd: React.PropTypes.func.isRequired
};