import React from 'react';
import ProfileListItem from './ProfileListItem';
import '../style/profileList.css'

export default class ProfileList extends React.Component {
    render() {
        return this.props.profiles.map((item, i) => {
            return <ProfileListItem key={item.name + '__' + i} data={item} />
        })
    }
};


