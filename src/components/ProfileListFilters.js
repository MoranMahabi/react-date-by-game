import React from 'react';
import { connect } from 'react-redux';
import { setFilters } from '../actions/filters';
import '../style/profileListFilters.css';


export class ProfileListFilters extends React.Component {
    constructor() {
        super();
        this.state = {
            fromAge: 'Select age',
            toAge: 'Select age',
            city: 'Select living area'
        }
    }

    componentDidMount() {
        this.props.setFilters(undefined, undefined, undefined);
    }


    ageOptionsBuilder() {
        let arr = [];
        for (let i = 18; i < 100; i++) {
            arr.push(i);
        }
        return arr.map((age, i) => {
            return <option key={age + i} value={`${age}`}>{age}</option>
        })
    }

    cityOptionBuilder() {
        
        let city_names = [ 'Jerusalem', 'Northern', 'Haifa',  'Central', 'Tel Aviv',  'Southern', 'Judea and Samaria Area'];
        return city_names.map((city, i) => {
            return <option key={city + i} value={`${city}`}>{city}</option>

        })
    }

    changeFromAgeHandler = (event) => {
        let value = event.target.value;
        this.setState({ fromAge: value })
    }
    changeToAgeHandler = (event) => {
        let value = event.target.value;
        this.setState({ toAge: value })
    }
    changeCityHandler = (event) => {
        let value = event.target.value;
        this.setState({ city: value })
    }

    findMyMatches = (e) => {
        const city = this.state.city === 'Select living area' ? undefined : this.state.city;
        const from = this.state.fromAge === 'Select age' ? undefined : this.state.fromAge;
        const to = this.state.toAge === 'Select age' ? undefined : this.state.toAge;
        this.props.setFilters(city, from, to);
    }

    render() {

        return (

            <div className="profile-list-filter-container">
                <div>
                    <div>
                        <div className="filter-dropdown">
                            <span>Living Area: </span>
                            <span className="span-choice-filter">{this.state.city}</span>
                            <select defaultValue="1" onChange={this.changeCityHandler}>
                                {this.cityOptionBuilder()}
                            </select>
                        </div>
                        <div className="filter-dropdown">
                            <span>From: </span>
                            <span className="span-choice-filter">{this.state.fromAge}</span>
                            <select defaultValue="1" onChange={this.changeFromAgeHandler}>
                                {this.ageOptionsBuilder()}
                            </select>
                        </div>
                        <div className="filter-dropdown">
                            <span>To: </span>

                            <span className="span-choice-filter">{this.state.toAge}</span>
                            <select defaultValue="1" onChange={this.changeToAgeHandler}>
                                {this.ageOptionsBuilder()}
                            </select>
                        </div>
                    </div>
                    <div className="find-my-match-container">
                        <button className="btn button-filter" onClick={this.findMyMatches}><i className="fas fa-search" /> Find My
                          Matches
            </button>
                    </div>
                </div>
            </div>


        );
    }
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setFilters: (city, from, to) => dispatch(setFilters(city, from, to))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileListFilters);