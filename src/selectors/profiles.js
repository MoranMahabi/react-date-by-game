// Get visible profiles

async function getProfiles(uid, { city, from, to }, { current, pageSize }) {

    const response = await fetch('http://localhost:3000/users/profilesDetails', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ uid: uid, city: city, from: from, to: to, page: current, pageSize: pageSize })
    })

    const data = await response.json();

    return data;
}

export default async (uid, filters, pagination) => {
    const profilesDetails = await getProfiles(uid, filters, pagination);
    return profilesDetails;
};

