import React from 'react';
import { connect } from 'react-redux';
import ProfileList from './ProfileList';
import ProfileListFilters from './ProfileListFilters';
import { Pagination } from 'antd';
import '../style/bootstrap.min.css';
import '../style/profilesPage.css'

class ProfilesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profilesUID: [],
            uid: undefined,
            filters: {
                city: undefined,
                from: undefined,
                to: undefined
            },
            total: 6,
            current: 1
        };
    }

    onChangePagination = (page, pageSize) => {
        this.getProfilesDetails(page, pageSize, this.state.uid, this.state.filters);
    }

    componentDidMount() {
        var current = 1;
        this.getProfilesDetails(current, 6, this.props.uid, this.props.filters);
    }

    componentWillReceiveProps({ uid, filters }) {
        var current = 1;
        this.getProfilesDetails(current, 6, uid, filters);
    }

    getProfilesDetails(page, pageSize, uid, filters) {
        this.fetchProfilesDetails(page, pageSize, uid, filters)
            .then(profileDetails => {
                this.setState(() => ({ profilesUID: profileDetails.profilesUID, total: profileDetails.total, current: page, uid, filters }));
            })
            .catch(err => {
                throw err;
            });
    }


    fetchProfilesDetails(page, pageSize, uid, filters) {
        var city = filters.city;
        var from = filters.from;
        var to = filters.to;

        return fetch(`http://localhost:3000/users/profilesDetails`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ uid: uid, city: city, from: from, to: to, page: page, pageSize: pageSize })
        }).then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        });
    }

    renderTitle() {
        return <div className="panel panel-default">
            <div className="panel-heading profiles-title-container">
                <h1 className="panel-title profiles-title">Profiles</h1>
            </div>
        </div>
    }

    renderFilter() {
        return <div className="panel panel-default">
            <div className="panel-heading search-box-title-container">
                <h4 className="panel-title search-box-title">Profile Search</h4>
            </div>
        </div>
    }

    render() {
        return (
            <div className="myContainer">
                <div className="container profiles-container">

                    {this.renderTitle()}


                    <section className="row profiles-section">

                        <div className="col-md-7 profiles-list">
                            <ProfileList profilesUID={this.state.profilesUID} />

                        </div>
                        <div className="col-md-3 right-section">
                            {this.renderFilter()}
                            <div className="profile-search-container">
                                <ProfileListFilters />

                            </div>
                            <img
                                src="http://www.feltwithlovedesigns.com/wp-content/uploads/2016/02/Valentines-Day-Sensory-Bin-mailbox-Felt-With-Love-Designs.jpg" alt="..." />
                        </div>


                    </section>
                    <div className="pagination-container"><Pagination className="pagination-my" onChange={this.onChangePagination} current={this.state.current} pageSize={6} total={this.state.total} /></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    filters: state.filters
});

export default connect(mapStateToProps)(ProfilesPage);

