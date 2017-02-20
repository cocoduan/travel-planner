import React, {Component} from "react";
import L from "leaflet";

// this.setState({ map, tileLayer });
// Since "map" here is named the same as the prop name, in this case "map" (this.state.map),
// we can use es6 shorthand way of setting object value instead of doing {map: map, tileLayer: tileLayer}

// name "private" property as _name in constructor if not on state, e.g. this._mapNode = null;

let config = {};
config.params = {
    center: [51.505, -0.09],
    zoomControl: false,
    zoom: 13,
    maxZoom: 19,
    minZoom: 11,
    legends: true,
    infoControl: false,
    attributionControl: true
};
config.tileLayer = {
    uri: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    params: {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
};

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            tileLayer: null
        };
        this._mapNode = null;
    }

    componentDidMount() {
        // create the Leaflet map object
        if (!this.state.map) this.init(this._mapNode);
        this.state.map.on('click', this.onMapClick);
    }

    componentWillUnmount() {
        this.state.map.off('click', this.onMapClick);
        this.state.map.remove();
    }

    onMapClick() {

    }

    init(id) {
        if (this.state.map) return;
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map(id, config.params);
        L.control.zoom({ position: "bottomleft"}).addTo(map);
        L.control.scale({ position: "bottomleft"}).addTo(map);

        // a TileLayer is used as the "basemap"
        const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

        // set our state to include the tile layer
        this.setState({ map, tileLayer });
    }


    render() {
        return <div ref={(node) => this._mapNode = node} className="map-container"></div>;
    }
}