# Klinik Reservation
This project is linked with :
[![Web Admin Doctor](https://github.com/ryanisml/klinik-reservation)]
[![Mobile Doctor Apps](https://github.com/ryanisml/ismailid-dokter-app)]
[![Mobile Doctor Apps](https://github.com/ryanisml/ismailid-pasien-app)]

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
You can change firebase configuration to anything you want. Replace :
```
var firebaseConfig = {
    apiKey: "{your api key}",
    authDomain: "{your firebase domain}",
    databaseURL: "{your firebase db url}",
    projectId: "{your project id}",
    storageBucket: "{your storage firebase id}",
    messagingSenderId: "{your message notification id}",
    appId: "{your app id}",
    measurementId: "{your measurement id}"
};
```
