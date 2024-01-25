$(document).ready(function() {

    // Inisiasi nama tabel
    var tbpasien = db.collection("tb_pasien");
    var tbreservasi = db.collection("tb_reservasi");
    var dataSet = [];
    var rowEdit;
    // id primary key data.
    var idfirebase = null;

    // Inisiasi datatable berdasarkan div id
    var table = $('#dataPasien').DataTable({
        data : dataSet,
        processing: true,
        order: [[ 1, "asc" ]],
        columnDefs: [
            {
                targets: [0], 
                visible: false,                  
            },
            {
                targets: 7,
                className: "text-center"
            }
        ] 
    });

    tbpasien.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            tbreservasi.where('idpasien', '==', change.doc.id).get().then(function (total) {
                if (change.type === "added") {
                    dataSet = [change.doc.id, change.doc.data().noktp, change.doc.data().nama, umur(change.doc.data().tanggal_lahir), change.doc.data().alamat, change.doc.data().notelp, total.size+' Reservasi', tombol_history(change.doc.id)];
                    table.rows.add([dataSet]).draw();
                }
                if (change.type === "modified") {
                    dataSet = [change.doc.id, change.doc.data().noktp, change.doc.data().nama, umur(change.doc.data().tanggal_lahir), change.doc.data().alamat, change.doc.data().notelp, total.size+' Reservasi', tombol_history(change.doc.id)];
                    table.row(rowEdit).data(dataSet).draw();
                }
            });
            if (change.type === "removed") {
                table.row(rowEdit).remove().draw();
            }
        });
    });

    function tombol_history(idpasien){
        return '<a href="history-pasien?idpas='+idpasien+'" class="btn btn-sm btn-primary">Lihat History</a>';        
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
});