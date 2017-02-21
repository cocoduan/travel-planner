import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/search/SearchBar';
import Plan from './components/plan/Plan';
import Map from "./components/map/Map";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: null,
            foundAddress: null
        }
    }

    render() {
        return (
            <div className="container-fluid App">
                <div className="row">

                    <div className="col-md-3">
                        <Plan searchPlace={this.state.foundAddress}/>
                    </div>

                    <div className="col-md-9">

                        <div className="row">
                            <div className="col-md-6">
                                <SearchBar onPlaceChanged={(place) => this.setState({place})}/>
                            </div>
                        </div>

                        <div style={{paddingTop: "15px"}}>
                            <Map place={this.state.place}
                                 onFoundAddress={(foundAddress) => this.setState({foundAddress})}></Map>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
