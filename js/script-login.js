function show_new_pass() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        $('.span_new').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        x.type = "password";
        $('.span_new').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}

$('#btnLogin').click(function () {
    	var email = $.trim($('#email').val());
        var password = $.trim($('#password').val());
        $('#show_fail').html('');
        if (email === '') {
            $('#error_email').html('<p class="text-danger">Email wajib diisi</p>')
            return false
        } else {
            $('#error_email').html('')
        }

        if (password === '') {
            $('#error_password').html('<p class="text-danger">Password wajib diisi</p>')
            return false
        } else {
            $('#error_password').html('')
        }

        $("#btnLogin").prop( "disabled", true);
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        	if (error) {
        		$('#show_fail').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Maaf!</strong> Username atau password salah<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
        	}
			$("#btnLogin").prop( "disabled", false);
		});
});

firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
		window.location.replace('dashboard');
  	} 
});