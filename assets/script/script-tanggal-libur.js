$(document).ready(function() {
    $('#tanggal_libur').datepicker({
        format: "yyyy-mm-dd",
        startDate: "linked",
        endDate: "2050-12-31",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true
    });

    // Inisiasi nama tabel
    var tbdokter = db.collection("tb_tanggal_libur");
    var dataSet = [];
    var rowEdit;
    // id primary key data.

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
                targets: -1,
                defaultContent: '<div class="wrapper text-center"><button type="button" class="btn btn-sm btn-danger btnhapus">Hapus Data</button></div>'
            }
        ] 
    });

    $('#tambahDokter').click(function () {
        idfirebase = null;
        $('#form-dokter').trigger("reset");
    });

    // Simpan data insert maupun update
    $('#simpandokter').click(function () {
        $('#errortgllibur').html('');
        $("#simpandokter").prop( "disabled", true);
        var tanggal_libur = $.trim($('#tanggal_libur').val());
        var keterangan = $.trim($('#keterangan').val());
        inputData(tanggal_libur, keterangan);
    });

    function inputData(tgl_libur, keterangan){
        // Pengecekan jika noktp sama maka tidak dapat tambah data baru.
        tbdokter.where('tanggal_libur', '==', tgl_libur).get().then(function (querySnapshot) {
            if (querySnapshot.empty) {
                var dlibur = firebase.firestore.Timestamp.fromDate(new Date(tgl_libur));
                tbdokter.doc().set({
                    tanggal_libur : tgl_libur,
                    keterangan : keterangan
                });
                $('#form-dokter').trigger("reset");
                $('#modalDokter').modal('hide');
                Swal.fire({
                    title: 'Sukses',
                    text: "Berhasil menambahkan data",
                    icon: 'success'
                })

                insert_to_log('Menambahkan data tanggal libur '+tgl_libur+' dengan keterangan '+keterangan, 'insert');
            }else{
                $('#errortgllibur').html('<p class="text-danger">Tanggal libur sudah pernah di tambahkan</p>');
            }
            $("#simpandokter").prop( "disabled", false);
        });
    }

    // Inisiasi jika ada data baru yang akan ditambahkan ke firebase maka baris baru akan ditambahkan otomatis ke tabel ini
    // Inisiasi jika ada data yang diedit di firebase maka baris ini akan terganti dengan data baru
    // Jika data dihapus dari firebase maka akan otomatis dihapus dari tabel.
    tbdokter.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                dataSet = [change.doc.id, change.doc.data().tanggal_libur, change.doc.data().keterangan];
                table.rows.add([dataSet]).draw();
            }
            if (change.type === "modified") {
                dataSet = [change.doc.id, change.doc.data().tanggal_libur, change.doc.data().keterangan];
                table.row(rowEdit).data(dataSet).draw();
            }
            if (change.type === "removed") {
                table.row(rowEdit).remove().draw();
            }
        });
    });

    // Inisiasi saat tombol hapus di klik maka akan muncul konfirmasi
    $("#dataDokter").on("click", ".btnhapus", function() {
        rowEdit = table.row($(this).parents('tr'));
        var row = $('#dataDokter').dataTable().fnGetData($(this).closest('tr')); 
        var idfirebase = row[0];
        var noktp = $(this).closest('tr').find('td:eq(0)').text();
        Swal.fire({
            title: 'Hapus Data',
            text: "Yakin ingin hapus data dengan tanggal "+noktp+"?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya'
        }).then((result) => {
            if (result.value) {
                insert_to_log('Menghapus data tanggal libur '+noktp, 'delete');
                tbdokter.doc(idfirebase).delete()
                Swal.fire('Sukses', 'Berhasil menghapus data','success')
            }
        })        
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
});