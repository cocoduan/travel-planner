import React from 'react';

// rather than defining a text on state, and use componentWillReceiveProps() to update text; to achieve stateless,
// use this.props.text + onChange handler so the child is in sync with parent

// this.props.text || "Untitled"

export default class Label extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVisible: false
        }
        this.inputText = "";
    }

    // helpers

    toggleInput() {
        this.setState({inputVisible: !this.state.inputVisible});
    }

    setInputValue() {
        const value = this.inputText.value;
        this.props.onChange(value);
    }

    onInputEnter(evt) {
        if (evt.keyCode === 13) {
            this.setInputValue();
            this.toggleInput();
        }
    }

    onBlur() {
        this.setInputValue();
        this.toggleInput();
    }

    render() {
        const text = (
            <p className={this.props.labelClass} onClick={() => this.toggleInput()}>
                {this.props.text || "Untitled"}
            </p>
        );

        const inputBox = (
            <input type="text" className="form-control"
                   autoFocus
                   ref={(ref) => this.inputText = ref}
                   defaultValue={this.props.text}
                   onKeyDown={(evt) => this.onInputEnter(evt)}
                   onBlur={() => this.onBlur()}/>
        );

        return (
            <div style={{paddingBottom: "15px"}}>
                {!this.state.inputVisible && text}

                {this.state.inputVisible && inputBox}
            </div>
        );
    }
}

Label.propTypes = {
    text: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    labelClass: React.PropTypes.string
};
