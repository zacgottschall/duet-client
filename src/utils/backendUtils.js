import axios from 'axios';

export const getUser = (id, token) => {
    return new Promise((resolve) => {
        axios({
            method: 'get', 
            url: `https://cs98-duet.herokuapp.com/get/${id}`,
            headers: getAuthHeader(token), 
        }).then(
            (response) => {
                resolve(response.data)
            }
        );
    })
}

const ROOT_URL = 'https://cs98-duet.herokuapp.com';


const getAuthHeader = (token) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
    };
}
export const getBackendToken = (spotifyToken) => {
    return new Promise((resolve) => {
        axios.post(`${ROOT_URL}/auth`, { "refresh_token": spotifyToken})
            .then((response) => resolve(response.data));
    })
}

export const getNumUsers = () => {
    return new Promise((resolve) => {
        axios({
            method: 'get', 
            url: `https://cs98-duet.herokuapp.com/stats`,
        }).then((response) => resolve(response.data))
    })
}
export const search = (id_, token) => {
    return new Promise((resolve) => {
        axios({
            method: 'get', 
            url: `https://cs98-duet.herokuapp.com/search/${id_}`,
            headers: getAuthHeader(token), 
        }).then((users) => {
            var results = [];
            users.data.forEach((user) => {
                results = results.concat([user])
            })
            resolve(results)
        })
    })
}

export const postUser = (user, token) => {
    return new Promise((resolve) => {
        axios.post(`${ROOT_URL}/users`, user, { headers: getAuthHeader(token) }).then((response) => resolve(response.data));
    })
}


export const addGroup = (groupId, userId, isPrivate, token) => {
    return new Promise((resolve, reject) => {
        axios.post(`https://cs98-duet.herokuapp.com/groups`, {
            "user_id": userId,
            "group_id": groupId,
            "is_private": isPrivate,
        }, { headers: getAuthHeader(token) }
        ).then((response) =>  {
            if (response.data.SUCCESS) {
                setTimeout(() => resolve(response.data), 1000);
            } else {
                reject(response.data);
            }
        });
    })
}

export const joinGroup = (groupId, userId, token) => {
    return new Promise((resolve) => {
        axios.post(`https://cs98-duet.herokuapp.com/joingroup`, {
            "user_id": userId,
            "group_id": groupId,
        }, { headers: getAuthHeader(token) }).then((response) => resolve(response.data));
    })
}

// export const searchForUsers = (query) => {
//     return new Promise((resolve) => {
//         getAllUsers()
//         .then((users) => {
//             let results = [];
//             users.forEach((user) => {
//                 const { display_name, id } = user;
//                 if (display_name.toLowerCase().includes(query.toLowerCase())) {
//                     results = [ ...results, { display_name, id }] ;
//                 }
//             })
//             resolve(results);
//         })
//     })
// }

// export const getAllUsers = () => {
//     return new Promise((resolve) => {
//         axios({
//             method: 'get', 
//             url: `https://cs98-duet.herokuapp.com/getall`,
//         }).then((response) => resolve(response.data));
//     })
// }

export const getGroupMembers = (groupId, token) => {
    return new Promise((resolve) => {
        axios({
            method: 'get', 
            url: `https://cs98-duet.herokuapp.com/groups/users/${groupId}`,
            headers: getAuthHeader(token),
        }).then((response) => {
            resolve(response.data)
        });
    })
}