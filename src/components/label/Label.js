import React from 'react';

export default class Label extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            inputVisible: false
        }
    }

    // helpers
    inputText;

    toggleInput() {
        this.setState({inputVisible: !this.state.inputVisible});
    }

    onInputEnter(evt) {
        if (evt.keyCode === 13) {
            this.setState({text: this.inputText.value});
            this.toggleInput();
        }
    }

    render() {
        return (
            <div>
                <div onClick={() => this.toggleInput()}>
                    {
                        !this.state.inputVisible && <h3>{this.state.text}</h3>
                    }
                </div>

                {
                    this.state.inputVisible && <input type="text" ref={(ref) => this.inputText = ref}
                                                      placeholder={this.state.text}
                                                      onKeyDown={(evt) => this.onInputEnter(evt)}></input>
                }
            </div>
        );
    }
}

Label.propTypes = {
    text: React.PropTypes.string.isRequired
};
