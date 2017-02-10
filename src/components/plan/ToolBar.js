import React from 'react';

export default class ToolBar extends React.Component {
    render() {
        return (
            <ul className="nav nav-pills card-header-pills">
                <li className="nav-item">
                    <a className="nav-link active" onClick={() => this.props.onAdd()}>New</a>
                </li>
            </ul>
        );
    }
}
ToolBar.propTypes = {
    onAdd: React.PropTypes.func.isRequired
};