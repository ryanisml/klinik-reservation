$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var idpas = urlParams.get('idpas');
    // Inisiasi nama tabel
    var tbpasien = db.collection("tb_pasien");
    var tbreservasi = db.collection("tb_reservasi");
    var tbdokter = db.collection("tb_dokter");
    var tbhasil = db.collection("tb_hasil_pemeriksaan");
    var dataSet = [];
    var rowEdit;
    // id primary key data.
    var idfirebase = null;

    // Inisiasi datatable berdasarkan div id
    var table = $('#dataPasien').DataTable({
        data : dataSet,
        processing: true,
        columnDefs: [
            {
                targets: [0], 
                visible: false,                  
            },
            {
                targets: 5,
                className: "text-center"
            }
        ] 
    });

    tbpasien.doc(idpas).get().then(function (res) {
        console.log(res.data());
        $('#noktp').text(res.data().noktp);
        if (res.data().nobpjs != null) {
            $('#nobpjs').text(res.data().noktp);
        }else{
            $('#nobpjs').text('(Tidak Ada)');
        }
        $('#namapasien').text(res.data().nama);
        $('#umur').text(umur(res.data().tanggal_lahir)+' ('+res.data().tanggal_lahir+')');
        $('#alamat').text(res.data().alamat);
        $('#notelp').text(res.data().notelp);
    }); 

    tbreservasi.where('idpasien', '==', idpas).onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                dataSet = [change.doc.id, change.doc.data().tanggal_reservasi, change.doc.data().nomor_antrian, change.doc.data().keluhan, reservasi_status(change.doc.data().status_reservasi), tombol_hasil(change.doc.id, change.doc.data().status_reservasi, change.doc.data().tanggal_reservasi, change.doc.data().nomor_antrian, change.doc.data().keluhan)];
                table.rows.add([dataSet]).draw();
            }
            if (change.type === "modified") {
                dataSet = [change.doc.id, change.doc.data().tanggal_reservasi, change.doc.data().nomor_antrian, change.doc.data().keluhan, reservasi_status(change.doc.data().status_reservasi), tombol_hasil(change.doc.id, change.doc.data().status_reservasi, change.doc.data().tanggal_reservasi, change.doc.data().nomor_antrian, change.doc.data().keluhan)];
                table.row(rowEdit).data(dataSet).draw();
            }
            if (change.type === "removed") {
                table.row(rowEdit).remove().draw();
            }
        });
    });

    function tombol_hasil(idreservasi, status_reservasi, tanggalreservasi, nomorantrian, keluhan){
        if (status_reservasi == 4) {
            return '<button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#hasilModal" data-idreservasi="'+idreservasi+'" data-tanggalreservasi="'+tanggalreservasi+'" data-nomorantrian="'+nomorantrian+'"data-keluhan="'+keluhan+'">Lihat Hasil</button >';        
        }else{
            return '';
        }
    }

    function umur(tgl) {
        var dateold = new Date(tgl);
        var today = new Date();
        var ynew = today.getFullYear();
        var mnew = today.getMonth();
        var dnew = today.getDate();
        var yold = dateold.getFullYear();
        var mold = dateold.getMonth();
        var dold = dateold.getDate();
        var diff = ynew - yold;
        if (mold > mnew) diff--;
        else {
            if (mold == mnew) {
                if (dold > dnew) diff--;
            }
        }
        return diff+' Tahun';
    }

    function reservasi_status(no){
        var status = '<span class="btn-sm btn-default" style="cursor: no-drop;">Gagal load data</span>';
        if (no == 1) {
            status = '<span class="btn-sm btn-info" style="cursor: no-drop;">Menunggu Panggilan</span>';
        }else if (no == 2) {
            status = '<span class="btn-sm btn-primary" style="cursor: no-drop;">Sedang dipanggil</span>';
        } else if (no == 3) {
            status = '<span class="btn-sm btn-danger" style="cursor: no-drop;">Tidak Datang</span>';
        } else if (no == 4) {
            status = '<span class="btn-sm btn-success" style="cursor: no-drop;">Telah Selesai</span>';
        } else if (no == 5) {
            status = '<span class="btn-sm btn-warning" style="cursor: no-drop;">Dibatalkan</span>';
        }
        return '<div class="wrapper text-center">'+status+'</div>';
    }

    $('#hasilModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var idreservasi = button.data('idreservasi')
        var tanggalreservasi = button.data('tanggalreservasi')
        var nomorantrian = button.data('nomorantrian')
        var keluhan = button.data('keluhan')
        var modal = $(this)
        modal.find('#modtanggal').text(tanggalreservasi)
        modal.find('#modnomor').text(nomorantrian)
        modal.find('#modkeluhan').text(keluhan)
        tbhasil.where('id_reservasi', '==', idreservasi).limit(1).get().then(function (qry) {
            if (!qry.empty) {
                var iddokter = qry.docs[0].data().id_dokter;
                keluhan = qry.docs[0].data().keluhan;
                var obat = qry.docs[0].data().obat;
                var saran = qry.docs[0].data().saran;
                var tanggalperiksa = qry.docs[0].data().tanggal_pemeriksaan;
                modal.find('#modkeluhan').text(keluhan)
                modal.find('#modobat').text(obat)
                modal.find('#modsaran').text(saran)
                modal.find('#modwaktu').text(tanggalperiksa)
                tbdokter.doc(iddokter).get().then(function (resdok) {
                    if (!resdok.empty) {
                        var namadokter = resdok.data().nama;
                        modal.find('#moddokter').text(namadokter)
                    }else{
                        Swal.fire({
                            title: 'Oops',
                            html: "Data hasil pemeriksaan tidak ditemukan. Pastikan data dokter tidak terhapus.",
                            icon: 'danger'
                        });
                    }
                });
            }else{
                Swal.fire({
                    title: 'Oops',
                    html: "Data hasil pemeriksaan tidak ditemukan",
                    icon: 'danger'
                });
            }
        });
    })
});