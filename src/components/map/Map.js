import React, {Component} from "react";
import L from "leaflet";

// this.setState({ map, tileLayer });
// Since "map" here is named the same as the prop name, in this case "map" (this.state.map),
// we can use es6 shorthand way of setting object value instead of doing {map: map, tileLayer: tileLayer}

// name "private" property as _name in constructor if not on state, e.g. this._mapNode = null;

const config = {};
config.params = {
    center: [51.505, -0.09],
    zoomControl: false,
    zoom: 13,
    maxZoom: 21,
    minZoom: 5,
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

        this.map = null;
        this.geocoder = null;
        this.tileLayer = null;
        this.marker = null;
        this.foundAddress = null;

        this._mapNode = null;
    }

    componentDidMount() {
        // create the Leaflet map object
        if (!this.map) this.init(this._mapNode);
        /*eslint-disable */
        this.geocoder = new google.maps.Geocoder();
        /*eslint-enable */
    }

    componentWillUnmount() {
        this.map.remove();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.place) {
            this.geocodeAddress(nextProps.place);
        }
    }

    geocodeAddress(address) {
        this.geocoder.geocode({address}, (results, status) => {
            /*eslint-disable */
            if (status === google.maps.GeocoderStatus.OK) {
                /*eslint-enable */
                const result = results[0];

                // found address
                this.foundAddress = result.formatted_address;
                this.onFoundAddress(this.foundAddress);

                const location = result.geometry.location;
                const latLng = [location.lat(), location.lng()];
                this.map.setView(latLng);
                this.marker.setLatLng(latLng);
            }
        });
    }

    onFoundAddress(address) {
        this.props.onFoundAddress(address);
    }

    init(id) {
        if (this.map) return;
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map(id, config.params);
        L.control.zoom({ position: "bottomleft"}).addTo(map);
        L.control.scale({ position: "bottomleft"}).addTo(map);

        // a TileLayer is used as the "basemap"
        this.tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

        this.marker = L.marker(config.params.center).addTo(map);
        this.map = map;
    }

    render() {
        return <div ref={(node) => this._mapNode = node} className="map-container"></div>;
    }
}

Map.PropTypes = {
    place: React.PropTypes.string,
    onFoundAddress: React.PropTypes.func.isRequired
};