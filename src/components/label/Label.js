import React from 'react';

// componentWillReceiveProps()
export default class Label extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            inputVisible: false
        }
    }

    // TODO - why need this?
    componentWillReceiveProps(nextProps) {
        this.setState({
            text: nextProps.text
        });
    }

    // helpers
    inputText;

    toggleInput() {
        this.setState({inputVisible: !this.state.inputVisible});
    }

    setInputValue() {
        const value = this.inputText.value;
        this.setState({text: value});
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
                {this.state.text || "Untitled"}
            </p>
        );

        const inputBox = (
            <input type="text" className="form-control" style={{width: "50%"}}
                   autoFocus
                   ref={(ref) => this.inputText = ref}
                   defaultValue={this.state.text}
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
    labelClass: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
};
