import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/search/SearchBar';
import Plan from './components/plan/Plan';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Untitled map",
            place: 'place holder',
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
                    <div className="col-md-4 offset-md-3">
                        <SearchBar searchPlace={(place) => this.handleSearchPlace(place)}/>
                    </div>
                    <div className="col-md-7"></div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <Plan title={this.state.title}
                              searchedPlace={this.state.place} />
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
