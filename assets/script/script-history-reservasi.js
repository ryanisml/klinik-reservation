var tbpasien = db.collection("tb_pasien");
var tbreservasi = db.collection("tb_reservasi");
var dataSet = [];
var rowEdit;
// id primary key

// Inisiasi datatable berdasarkan div id
var table = $('#dataHistory').DataTable({
    data : dataSet,
    processing: true,
    ordering: true,
    columnDefs: [
        {
            targets: [0], 
            visible: false,                  
        }
        // {
        //     targets: -1,
        //     defaultContent: '<div class="btn-group"><button type="button" class="btn btn-sm btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Ubah status reservasi</button><div class="dropdown-menu"><a class="dropdown-item proses_dokter" href="#">Proses ke Dokter</a><a class="dropdown-item batalkan_reservasi" href="#">Batalkan</a><a class="dropdown-item tidak_datang" href="#">Tidak Datang</a></div></div>'
        // }
    ] 
});

function get_date_now(){
    var today = new Date();
    var date = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();

   	return year + "-" + month + "-" + date;
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
		status = '<button class="btn btn-sm btn-success">Telah Selesai</button>';
	} else if (no == 5) {
		status = '<span class="btn-sm btn-warning" style="cursor: no-drop;">Dibatalkan</span>';
	}
	return '<div class="wrapper text-center">'+status+'</div>';
}

check_tanggal(get_date_now());

$('#tanggal').datepicker({
    format: "yyyy-mm-dd",
    startDate: "2020-01-01",
    endDate: "2050-12-31",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
});

$('#tanggal').val(get_date_now());	
$('#cleartgl').click(function () {
	$('#tanggal').val(get_date_now());
	$('#errortoday').html('<p class="small">Silahkan klik tombol tampilkan untuk melihat data</p>');
});

$('.btn_tampilkan').click(function () {
	table.clear().draw();
	$('#errortoday').html('');
	var tampil = $("#tampilkan").val();
	if (tampil == 1) {
		var tgl = $('#tanggal').val();
		check_tanggal(tgl);
	}else{
		var status = $('#status').val();
		check_status(status);
	}
});

$('#tanggal').change(function(){
	//fire your ajax call  
	$('#errortoday').html('<p class="small">Silahkan klik tombol tampilkan untuk melihat data</p>');
})

$('#statusreservasi').hide();

$("#tampilkan").change(function(){
   var status = $("#tampilkan").val();
   if (status == 1) {
   		$('#tanggalreservasi').show();
   		$('#statusreservasi').hide();
   }else if (status == 2) {
   		$('#tanggalreservasi').hide();
   		$('#statusreservasi').show();
   } 
});

function check_tanggal(tgl){
	tbreservasi.where('tanggal_reservasi', '==', tgl).orderBy('nomor_antrian').onSnapshot(function (snapshot){
		snapshot.docChanges().forEach(function(change) {
			tbpasien.doc(change.doc.data().idpasien).get().then(function (qry) {
				if (change.type === "added") {
		            dataSet = [change.doc.id, change.doc.data().tanggal_reservasi, change.doc.data().nomor_antrian, qry.data().noktp, qry.data().nama, umur(qry.data().tanggal_lahir), change.doc.data().keluhan, reservasi_status(change.doc.data().status_reservasi)];
		            table.rows.add([dataSet]).draw();
		        }
		        if (change.type === "modified") {
		            dataSet = [change.doc.id, change.doc.data().tanggal_reservasi, change.doc.data().nomor_antrian, qry.data().noktp, qry.data().nama, umur(qry.data().tanggal_lahir), change.doc.data().keluhan, reservasi_status(change.doc.data().status_reservasi)];
		            table.row(rowEdit).data(dataSet).draw();
		        }
	    	});
	        if (change.type === "removed") {
	            table.row(rowEdit).remove().draw();
			}
		});
	});
}

function check_status(status){

	tbreservasi.where('status_reservasi', '==', parseInt(status)).orderBy('tanggal_reservasi').onSnapshot(function (snapshot){
		snapshot.docChanges().forEach(function(change) {
			tbpasien.doc(change.doc.data().idpasien).get().then(function (qry) {
				if (change.type === "added") {
		            dataSet = [change.doc.id, change.doc.data().tanggal_reservasi, change.doc.data().nomor_antrian, qry.data().noktp, qry.data().nama, umur(qry.data().tanggal_lahir), change.doc.data().keluhan, reservasi_status(change.doc.data().status_reservasi)];
		            table.rows.add([dataSet]).draw();
		        }
		        if (change.type === "modified") {
		            dataSet = [change.doc.id, change.doc.data().tanggal_reservasi, change.doc.data().nomor_antrian, qry.data().noktp, qry.data().nama, umur(qry.data().tanggal_lahir), change.doc.data().keluhan, reservasi_status(change.doc.data().status_reservasi)];
		            table.row(rowEdit).data(dataSet).draw();
		        }
	    	});
	        if (change.type === "removed") {
	            table.row(rowEdit).remove().draw();
			}
		});
	});
}