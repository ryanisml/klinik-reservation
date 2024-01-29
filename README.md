# Klinik Reservation

## About 
#### This is an example website admin reservation for clinic reservation.

This project is linked with :
- [Web Admin Reservation](https://github.com/ryanisml/klinik-reservation) -> your are here
- [Mobile Doctor Apps](https://github.com/ryanisml/ismailid-dokter-app)
- [Mobile Patient Apps](https://github.com/ryanisml/ismailid-pasien-app)

## Features
#### Project made with simple MVC PHP and some library :
- [Firebase](https://console.firebase.google.com/) firebase for auth, crud, storage, messaging, and notification
- [AQI API](https://aqicn.org/city/indonesia/samarinda) CURL to get featuring AQI data
- [PHPMailer](https://github.com/PHPMailer/PHPMailer) to sending email
- [JQuery](https://jquery.com/) JQuery for ajax data sending
- [Bootstrap 4](https://getbootstrap.com/) Bootstrap 4 for templating

## How To Use
Before using this website, please make sure :
* Atleast having xampp, iis, apache, or else with minimum requirements > PHP 8.0
* Install composer to distribute vendor for composer.json.
After installing composer, please make sure tu install from composer.json.
```
composer install
```

## Configuration
### Configure .env
Copy .env.example to .env in root
```
cp .env.example .env
```
Modify .env file
```
DB_HOST="127.0.0.1"
DB_USERNAME="root"
DB_PASSWORD="your_password_here"
DB_NAME="personal"

MAIL_HOST='smtp.gmail.com'
MAIL_PORT=465
MAIL_USERNAME='your username'
MAIL_PASSWORD='your password'

FIREBASE_API_KEY="your api key"

TOKEN_AIR_QUALITY="your token air quality"
WEBSITE_URL="http://localhost/klinik-reservation"
```
to your own configuration

### Adding file inside assets/script
Add file inside `assets/script` with name `firebase-script.js`

Create new const variable with configuration as your own firebase config below:
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

## Authentication
This is an login user you can use for test :
```
username : ryanisml@gmail.com
password : 1234567890
```

## Documentation
If you have any question related to this project, feel free to contact me at my github <br/>
[My Github Profile](https://github.com/ryanisml)