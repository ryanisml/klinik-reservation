/*!
    * Start Bootstrap - SB Admin v6.0.1 (https://startbootstrap.com/templates/sb-admin)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

// Letakkan semua variable yang digunakan secara global dibawah ini.
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

var userreal = '';
var passreal = '';
var idusernya = '';
var generate_token = '';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

$('#btnKeluar').click(function () {
    var tbnotif = db.collection("tb_notification");
    tbnotif.where('token', '==', generate_token).get().then(function (querySnapshot) {
        if (querySnapshot.empty == false) {
            tbnotif.doc(querySnapshot.docs[0].id).delete();
        }
        firebase.auth().signOut().then(function(user) {
            window.location.replace('login');
        });
    });
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        idusernya = user.uid;
        db.collection("tb_admin").doc(user.uid).get().then(function (datauser) {
            if (!datauser.empty) {
                $('#nama_dokter').html('<div class="small">ADMIN KLINIK</div>'+datauser.data().nama)
                $('#email_auth').val(datauser.data().email)
                $('#inisialuser').val(datauser.data().nama)
                
                dduser = firebase.auth().currentUser;

                userreal = datauser.data().email;
                passreal = datauser.data().password;

                initFirebaseMsg();

            }else{
                $('#nama_dokter').html('<div class="small">ADMIN KLINIK</div>Nama Dokter')
                Swal.fire('Oops!', 'Terjadi kesalahan. anda tidak dapat melakukan load data ke database', 'danger')
                $('#email_auth').val('')
            }
        });
    }else{
        window.location.replace('login');
    }
});

const messaging = firebase.messaging();

function initFirebaseMsg(){
    messaging.requestPermission()
    .then(function(){
        // console.log("Notification permission");
        return messaging.getToken();
    })
    .then(function(token){
        // console.log("Token : "+token);
        update_firebase_notif(token);
    })
    .catch(function(reason){
        console.log(reason);
    });
}

messaging.onMessage(function(payload){
    console.log(payload);
    const notificationOption = {
        body : payload.notification.body,
        icon : payload.notification.icon
    };

    if (Notification.permission === "granted") {
        var notification = new Notification(payload.notification.title, notificationOption);

        notification.onclick = function (ev) {
            ev.preventDefault();
            window.open(payload.notification.click_action, '_blank');
            notification.close();
        }
    }
});

messaging.onTokenRefresh(function(){
    messaging.getToken()
    .then(function(newtoken){
        console.log("New Token : " + newtoken);
        update_firebase_notif(newtoken);
    })
    .catch(function(reason){
        console.log(reason);
    })
});

function update_firebase_notif(token){
    var tbnotif = db.collection("tb_notification");
    generate_token = token;
    tbnotif.where('iduser', '==', idusernya).get().then(function (querySnapshot) {
        if (querySnapshot.empty) {
            var d = new Date();
            tbnotif.add({
                iduser : idusernya,
                token : token,
                waktu_ins : d.getTime(),
                status : 1
            });
        } else {
            var lasttoken = querySnapshot.docs[0].data().token;
            if (lasttoken != token) {
                var d = new Date();
                tbnotif.doc(querySnapshot.docs[0].id).update({
                    token : token,
                    waktu_upd : d.getTime(),
                    status : 1
                });
            }
        }
    });
}

// function show_old_pass() {
//     var x = document.getElementById("oldpass");
//     if (x.type === "password") {
//         x.type = "text";
//         $('.span_old').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
//     } else {
//         x.type = "password";
//         $('.span_old').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
//     }
// }


function show_new_pass() {
    var x = document.getElementById("newpass");
    if (x.type === "password") {
        x.type = "text";
        $('.span_new').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        x.type = "password";
        $('.span_new').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}

function show_new_pass_cek() {
    var x = document.getElementById("newpasscek");
    if (x.type === "password") {
        x.type = "text";
        $('.span_new_cek').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        x.type = "password";
        $('.span_new_cek').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}

$('#save_pass_change').click(function () {
    // Get the Login Name value and trim it
    // var oldpass = $.trim($('#oldpass').val())
    var newpass = $.trim($('#newpass').val())
    var newpasscek = $.trim($('#newpasscek').val())
    // Check if empty of not
    // if (oldpass === '') {
    //     $('#error_old_pass').html('<small><p class="text-danger">Password lama wajib diisi<\/p><\/small>')
    //     return false
    // } else {
    //     $('#error_old_pass').html('')
    // }

    if (newpass === '') {
        $('#error_new_pass').html('<small><p class="text-danger">Password baru wajib diisi<\/p><\/small>')
        return false
    } else {
        $('#error_new_pass').html('')
    }

    if (newpasscek === '') {
        $('#error_new_pass_cek').html('<small><p class="text-danger">Konfirmasi password baru wajib diisi<\/p><\/small>')
        return false
    } else {
        $('#error_new_pass_cek').html('')
    }

    if (newpass.length < 6) {
        $('#error_new_pass').html('<small><p class="text-danger">Password harus lebih dari 6 karakter<\/p><\/small>')
        return false
    } else {
        $('#error_new_pass').html('')
    }

    if ($('#newpass').val() !== $('#newpasscek').val()) {
        $('#error_new_pass_cek').html('<small><p class="text-danger">Konfirmasi password tidak sama dengan password baru<\/p><\/small>')
        return false
    } else {
        $('#error_new_pass_cek').html('')
    }

    if (true) {
        $("#simpandokter").prop( "disabled", true);
        firebase.auth().onAuthStateChanged(function(dduser) {
            if (dduser) {
                dduser.updatePassword(newpass).then(function() {
                    Swal.fire('Sukses!', 'Berhasil merubah kata sandi', 'success');
                    $('#form-password').trigger("reset");
                    $('#passwordModalCenter').modal('hide');
                });
                db.collection("tb_admin").doc(dduser.uid).update({
                    password : newpass
                });
                passreal = datauser.data().password;
            }
            $("#simpandokter").prop( "disabled", false);
        });
    }

});
