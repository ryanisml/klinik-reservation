$('#btn-delete').click(function () {
    $('#message').html('');
    $('#error-noktp').html('');
    $('#error-nama').html('');
    $('#error-confirmation').html('');

    var noktp = $.trim($('#noktp').val());
    var nama = $.trim($('#nama').val());
    var confirmation = $.trim($('#confirmation').val());
    if (noktp == '') {
        $('#error-noktp').html('Nomor KTP harus diisi.');
        return;
    }
    if (nama == '') {
        $('#error-nama').html('Nama pasien harus diisi.');
        return;
    }
    if (confirmation == '') {
        $('#error-confirmation').html('Konfirmasi persetujuan harus diisi.');
        return;
    }
    $("#btn-delete").prop( "disabled", true);
    $('#btn-delete').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
    request_deletion(noktp, nama);
});

function request_deletion(noktp, nama){
    var tbpasien = db.collection("tb_pasien");
    tbpasien.where('noktp', '==', noktp).get().then(function (querySnapshot) {
        if (querySnapshot.empty) {
            $('#message').html('<div class="alert alert-info alert-dismissible fade show" role="alert"><strong>Oops!</strong> Nomor KTP Tidak Ditemukan.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $("#btn-delete").prop( "disabled", false);
        }else{
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                var id = doc.id;
                if (data.nama == nama) {
                    delete_data(id, noktp);
                }else{
                    $('#message').html('<div class="alert alert-info alert-dismissible fade show" role="alert"><strong>Oops!</strong> Nama pasien yang anda masukkan salah.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                    $("#btn-delete").prop( "disabled", false);
                }
            });
        }
    });
}

function delete_data(id, noktp){
    var tbrequest = db.collection("tb_request_deletion");
    tbrequest.add({
        reference_id : id,
        noktp : noktp,
        status : 'pending',
        created_at : new Date(),
        cateogy : 'pasien'
    }).then(function (docRef) {
        $('#message').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Berhasil!</strong> Harap tunggu, akun anda akan di hapus dari sistem ini dalam 30 hari kedepan.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        $("#btn-delete").prop( "disabled", false);
    }).catch(function (error) {
        $('#message').html('<div class="alert alert-info alert-dismissible fade show" role="alert"><strong>Gagal!</strong> Terjadi kesalahan dalam aplikasi.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        $("#btn-delete").prop( "disabled", false);
    });
}