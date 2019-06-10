import React from 'react';
import { AsyncStorage } from 'react-native';
import moment from 'moment';


// Allows you to make an post request, returns responseJson object
export function post(link, headers, body) {
    return fetch(link, {
        method: 'POST',
        headers: headers,
        body: body,
    })
    .then((response) => {
        return response.json();
    });
}

export function get(link, headers) {
    return fetch(link, {
        method: 'GET',
        headers: headers,
    })
    .then((response) => response.json()
    .then((responseJson) => {
        return responseJson;
    }));
}

// Builds a new http request header with Authorization
export function buildHeaderWithAccess(access_token) {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
    };
}

// Builds a new http request header without Authorization
export function buildHeader() {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
}


export async function closePlace(lat, lon) {
    console.log('get Entry Called');
    return get(
        'https://api.foursquare.com/v2/venues/search?client_id=AANP15GDFTQFDRTZBCBWCWLHAW3XXCV3RWMJAACKPEZYCYF4&client_secret=4YWT3OL0VW35IQRPR2ASMZHNOWLS23QQ5UKDEYRV2ZOAZD5D&v=20190425&ll='+lat+','+lon+'&intent=checkin&radius=2000&categoryId=4d4b7105d754a06374d81259&limit=2',
        buildHeader()
    ).then(responseJson => {
        console.log('entries', responseJson);
        return responseJson;
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });
}


export async function getTip(id) {
    console.log('get Entry Called');
    var access_token = await AsyncStorage.getItem('access_token');
    return get(
        'http://tipster.test/api/tip/'+id,
        buildHeaderWithAccess(access_token)
    ).then(responseJson => {
        console.log('entries', responseJson);
        return responseJson;
    })
}



export function login(email, password) {
    return post(
        'http://tipster.test/api/login',
        buildHeader(),
        JSON.stringify({
            email: email,
            password: password,
        })
    ).then((requestJson) => {

        if (typeof (requestJson.access_token) !== 'undefined')
        {
            let at = requestJson.access_token;
            try {
                AsyncStorage.setItem('access_token', at);
            } catch (error) {
                console.log('Error: ' + error);
            }

            console.log('Login Json Return: ' + at);
            console.log("Login Success");
            return true;
        }
        else
        {
            console.log("Login Failure");
            return false;
        }
    });
}


export function register(name, email, password, password_confirmation, weight, height) {
    post(
        'http://tipster.test//register/patient',
        buildHeader(),
        JSON.stringify({
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        })
    )
    .then((requestJson) => {
        console.log(requestJson);

        if (typeof (requestJson.access_token) !== 'undefined')
        {
            AsyncStorage.setItem('access_token', requestJson.access_token);
            console.log("Login Success");
            return true;
        }
        else
        {
            console.log("Login Failure");
            return false;
        }
    });
}
