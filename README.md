# Klinik Reservation
This project is linked with :
- [Web Admin Doctor](https://github.com/ryanisml/klinik-reservation)
- [Mobile Doctor Apps](https://github.com/ryanisml/ismailid-dokter-app)
- [Mobile Patient Apps](https://github.com/ryanisml/ismailid-pasien-app)

## Features
#### Project made with simple MVC PHP and some library :
- firebase for auth, crud, storage, and notification
- CURL to get featuring covid data
- PHP mail to sending email
- JQuery for ajax data sending
- Bootstrap 4

## How To Use
Just put all folder inside xampp or iis.

## Configuration
- Add file inside `assets/script` with name `firebase-script.js`
- Create new const variable with configuration as your own firebase config below:
```
const apiKey = ""
const authDomain = ""
const databaseURL = ""
const projectId = ""
const storageBucket = ""
const messagingSenderId = ""
const appId = ""
const measurementId = ""
```

After saving `firebase-script.js` your `scripts.js` will work automatically.
```
var firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};
```