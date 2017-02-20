import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/search/SearchBar';
import Plan from './components/plan/Plan';
import Map from "./components/map/Map";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: null
        }
    }

    handleSearchPlace(place) {
        this.setState({place});
    }

    render() {
        return (
            <div className="container-fluid App">
                <div className="row">

                    <div className="col-md-3">
                        <Plan searchPlace={this.state.place}/>
                    </div>

                    <div className="col-md-9">

                        <div className="row">
                            <div className="col-md-6">
                                <SearchBar searchPlace={(place) => this.handleSearchPlace(place)}/>
                            </div>
                        </div>

                        <div style={{paddingTop: "15px"}}>
                            <Map></Map>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
