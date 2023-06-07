const API_URL = 'https://plankton-app-u3gio.ondigitalocean.app/api/v1';
// const API_URL = 'http://192.168.1.11:8000/api/v1';
const getAuthHeaders = async () => {
    const token = await getData('token');
    console.log(token)
    return token ? {'Authorization': `Bearer ${token}`} : {};
};

export const processImage = async (image, lat, lon) => {
    const response = await fetch(`${API_URL}/sightings/register-sighting/`, {
        method: 'POST',
        headers: {
            ...await getAuthHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: image,
            lat: lat,
            lon: lon
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const getMyFindings = async () => {
    const response = await fetch(`${API_URL}/findings/my_findings`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const discoverAroundMe= async (lat, lon) => {
    const response = await fetch(`${API_URL}/sightings/discover?lat=${lat}&lon=${lon}`, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}
export const getFindingById = async (id) => {
    const response = await fetch(`${API_URL}/findings/${id}`, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const getUserData = async () => {
    const response = await fetch(`${API_URL}/users/user/`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        console.log('Cannot get user data')
    }

    return await response.json();
};

export const getUserSightings = async () => {
    const response = await fetch(`${API_URL}/sightings/get-sightinglist/`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        console.log('Cannot get user data')
    }

    return await response.json();
};
export const getSightingById = async (id) => {
    const response = await fetch(`${API_URL}/sightings/get-sighting/${id}/`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        console.log('Cannot get user data')
    }

    return await response.json();
};



export const loginApi = async (data) => {
    const response = await fetch(`${API_URL}/users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const registerApi = async (data) => {
    const response = await fetch(`${API_URL}/users/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};


import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}

// Read data
export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value;
        }
    } catch (e) {
        // error reading value
    }
}
