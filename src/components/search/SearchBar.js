import React from 'react';

export default class SearchBar extends React.Component {
    handleSubmit() {
        const newPlace = this.place.value;
        this.place.value = '';
        console.log('newPlace is : ', newPlace);

        // submit newPlace
        this.searchPlace(newPlace);
    }

    searchPlace(place) {
        this.props.searchPlace(place);
    }

    setRef(ref) {
        this.place = ref;
    }

    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" placeholder="search a place"
                ref={(ref) => this.setRef(ref)}/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="submit"
                    onClick={() => this.handleSubmit()}>Search</button>
                </span>
            </div>
        );
    }
}

SearchBar.propTypes = {
    searchPlace : React.PropTypes.func.isRequired
};