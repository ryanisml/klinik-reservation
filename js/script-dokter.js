$(document).ready(function() {

    // Inisiasi nama tabel
    var tbdokter = db.collection("tb_dokter");
    var dataSet = [];
    var rowEdit;
    // id primary key data.
    var idfirebase = null;

    // Inisiasi datatable berdasarkan div id
    var table = $('#dataDokter').DataTable({
        data : dataSet,
        processing: true,
        columnDefs: [
            {
                targets: [0], 
                visible: false,                  
            },
            {
                targets: 6,
                defaultContent: '<div class="wrapper text-center"><button type="button" class="btn btn-sm btn-success btnedit">Edit Data</button></div>'
            }
        ] 
    });

    $('#tambahDokter').click(function () {
        idfirebase = null;
        $('#noktp').attr('readonly', false);
        $('#emaildokter').attr('readonly', false);
        $('#form-dokter').trigger("reset");
    });

    // Simpan data insert maupun update
    $('#simpandokter').click(function () {
        $('#errorktp').html('');
        $('#erroremail').html('');
        $("#simpandokter").prop( "disabled", true);
        var noktp = $.trim($('#noktp').val());
        var nama = $.trim($('#nama').val());
        var email = $.trim($('#emaildokter').val());
        var status = $.trim($('#status_dokter').val());
        var aktif = $.trim($('#status_aktif').val());
        if (idfirebase === null) {
            inputDokter(noktp, nama, email, status, aktif);
        }else{
            var iddokter = $.trim($('#iddokter').val());
            editDokter(iddokter, noktp, nama, email, status, aktif);
        }
    });

    function inputDokter(noktp, nama, email, status, aktif){
        // Pengecekan jika noktp sama maka tidak dapat tambah data baru.
        tbdokter.where('noktp', '==', noktp).get().then(function (querySnapshot) {
            if (querySnapshot.empty) {
                tbdokter.where('email', '==', email).get().then(function (qryEmail) {
                    if (qryEmail.empty) {
                        var pass = randomStr(6);
                        tbdokter.add({
                            noktp : noktp,
                            nama : nama,
                            email : email,
                            status_dokter : status,
                            password : pass,
                            status_aktif : aktif
                        });
                        $.ajax({
                            type: "POST",
                            url: baseurl+"send-email",
                            data: "emaildokter="+email+"&nama="+nama+"&password="+pass,
                            dataType: 'json',
                            cache: false,
                            success: function( response ) {
                                
                            },
                            error: function (xhr, status, error) {
                            }
                        });

                        insert_to_log('Dokter '+nama+' berhasil ditambahkan', 'insert');
                        $('#form-dokter').trigger("reset");
                        $('#modalDokter').modal('hide');
                        Swal.fire({
                            title: 'Sukses',
                            text: "Berhasil menambahkan data",
                            icon: 'success'
                        })
                    }else{
                        $('#erroremail').html('<p class="text-small text-danger">Email tidak dapat digunakan kembali</p>');
                    }
                });
            }else{
                $('#errorktp').html('<p class="text-danger">Nomor KTP tidak dapat digunakan kembali</p>');
            }
            $("#simpandokter").prop( "disabled", false);
        });
    }

    function editDokter(iddokter, noktp, nama, email, status, aktif){
        // Melakukan edit data dokter
        tbdokter.doc(iddokter).update({
            nama : nama,
            status_dokter : status,
            status_aktif : aktif
        });
        insert_to_log('Perubahan data terhadap dokter '+nama +' dengan noktp '+noktp, 'update');
        $('#form-dokter').trigger("reset");
        $('#modalDokter').modal('hide');
        Swal.fire('Sukses', 'Berhasil edit dokter dengan no ktp '+noktp,'success')
        $("#simpandokter").prop( "disabled", false);
        idfirebase = null;
    }

    // Inisiasi jika ada data baru yang akan ditambahkan ke firebase maka baris baru akan ditambahkan otomatis ke tabel ini
    // Inisiasi jika ada data yang diedit di firebase maka baris ini akan terganti dengan data baru
    // Jika data dihapus dari firebase maka akan otomatis dihapus dari tabel.
    tbdokter.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                dataSet = [change.doc.id, change.doc.data().noktp, change.doc.data().nama, change.doc.data().status_dokter, change.doc.data().email, cek_status(change.doc.data().status_aktif)];
                table.rows.add([dataSet]).draw();
            }
            if (change.type === "modified") {
                dataSet = [change.doc.id, change.doc.data().noktp, change.doc.data().nama, change.doc.data().status_dokter, change.doc.data().email, cek_status(change.doc.data().status_aktif)];
                table.row(rowEdit).data(dataSet).draw();
            }
            if (change.type === "removed") {
                table.row(rowEdit).remove().draw();
            }
        });
    });

    // Inisiasi saat tombol edit di klik maka akan muncul pop up untuk melakukan edit data
    $("#dataDokter").on("click", ".btnedit", function() {
        rowEdit = table.row($(this).parents('tr'));
        var row = $('#dataDokter').dataTable().fnGetData($(this).closest('tr'));               
        idfirebase = row[0];
        var noktp = $(this).closest('tr').find('td:eq(0)').text();
        var nama = $(this).closest('tr').find('td:eq(1)').text(); 
        var status = $(this).closest('tr').find('td:eq(2)').text(); 
        var email = $(this).closest('tr').find('td:eq(3)').text();
        var aktif = $(this).closest('tr').find('td:eq(4)').text();
        var stat = 0;
        if (aktif == 'Aktif') {
            stat = 1;
        }
        $('#noktp').attr('readonly', true);
        $('#emaildokter').attr('readonly', true);
        $('#iddokter').val(idfirebase);
        $('#noktp').val(noktp);
        $('#nama').val(nama);
        $('#status_dokter').val(status);
        $('#emaildokter').val(email);
        $('#status_aktif').val(stat);
        $('#errorktp').html('');
        $('#modalDokter').modal('show');
    });

    function randomStr(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
});

function insert_to_log(akt, statusins){
    var tblog = db.collection("tb_log_aktifitas");
    var ipadd = $('#ipuser').val();
    var inisial = $('#inisialuser').val();
    var aktifitas = inisial + " - " + akt;
    var waktuins = getTimeInsert();
    tblog.doc().set({
        aktifitas_log : aktifitas,
        status_log : statusins,
        ip_log : ipadd,
        waktu_log : waktuins,
        iduser_log : idusernya,
        from_log : 'admin-klinik'
    });
}

function cek_status(stat){
    if (stat == 1) {
        return 'Aktif';
    }else{
        return 'Tidak Aktif';
    }
}