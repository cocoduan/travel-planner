import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/search/SearchBar';
import Plan from './components/plan/Plan';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Untitled map",
        }
    }

    handleSearchPlace(place) {
        this.setState({
            place: place
        });
    }

    render() {
        return (
            <div className="App">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <SearchBar searchPlace={(place) => this.handleSearchPlace(place)}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <Plan title={this.state.title}
                              searchPlace={this.state.place} />
                    </div>
                </div>

            </div>
        );
    }
}
