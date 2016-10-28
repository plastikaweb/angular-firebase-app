
import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyCZHX0I2AKYSeCn8Vzclw-1mnXXGWi-lCQ",
    authDomain: "quick-start-c61e4.firebaseapp.com",
    databaseURL: "https://quick-start-c61e4.firebaseio.com",
    storageBucket: "quick-start-c61e4.appspot.com",
    messagingSenderId: "683569139269"
};


export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};