var tbpasien = db.collection("tb_pasien");
var tbreservasi = db.collection("tb_reservasi");
var tblibur = db.collection("tb_tanggal_libur");
var dataSet = [];
var rowEdit;
var idreal = 0;
var tanggalreal = 0;
var nomorreal = 0;
var ktpreal = 0;
// id primary key

// Inisiasi datatable berdasarkan div id
var table = $('#dataTable').DataTable({
    data : dataSet,
    processing: true,
    ordering: false,
    columnDefs: [
        {
            targets: [0], 
            visible: false,                  
        },
        {
            targets: -1,
            defaultContent: '<div class="btn-group"><button type="button" class="btn btn-sm btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Ubah status reservasi</button><div class="dropdown-menu"><a class="dropdown-item proses_dokter" href="#">Proses ke Dokter</a><a class="dropdown-item batalkan_reservasi" href="#">Batalkan</a><a class="dropdown-item tidak_datang" href="#">Tidak Datang</a></div></div>'
        },
        {
            targets: 7,
            className: "text-center"
        }
    ] 
});

function get_date_now(){
    var today = new Date();
    var date = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();

   	return year + "-" + month + "-" + date;
}

$('#tanggal').datepicker({
    format: "yyyy-mm-dd",
    startDate: "linked",
    endDate: "2050-12-31",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
});

$('#tanggal_lahir').datepicker({
    format: "yyyy-mm-dd",
    startDate: "1945-01-01",
    endDate: "linked",
    autoclose: true,
    todayHighlight: true
});

$('#tanggal_reservasi').datepicker({
    format: "yyyy-mm-dd",
    startDate: "linked",
    endDate: "2050-12-31",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
});

$("#data-libur").hide();

tblibur.where('tanggal_libur', '==', get_date_now()).limit(1).get().then(function (qry) {
	if (qry.empty) {
		$('#data-libur').hide();
		$('#data-antrian').show();
	}else{
		$('#data-libur').show();
		$('#data-antrian').hide();
		$('#alasan_libur').html(qry.docs[0].data().keterangan);
	}
});

$('#nomor_antrian').html('<center><h1>0</h1></center>');
tbreservasi.where('tanggal_reservasi', '==', get_date_now()).where('status_reservasi', '==', 1).orderBy('nomor_antrian').limit(1).onSnapshot(function (noantrian){
	if (!noantrian.empty) {
		$('#nomor_antrian').text(noantrian.docs[0].data().nomor_antrian);
		idreal = noantrian.docs[0].id;
		tanggalreal = noantrian.docs[0].data().tanggal_reservasi;
		nomorreal = noantrian.docs[0].data().nomor_antrian;
		ktpreal = noantrian.docs[0].data().noktp;
	}else{
		$('#nomor_antrian').text('0');
	}
});

disable();
check_tanggal(get_date_now());

$('#tanggal').val(get_date_now());	
$('#cleartgl').click(function () {
	$('#tanggal').val(get_date_now());
	$('#errortoday').html('<p class="small">Silahkan klik tombol tampilkan untuk melihat data</p>');
});

$('#btn_tampilkan').click(function () {
	table.clear().draw();
	$('#errortoday').html('');
	var tgl = $('#tanggal').val();
	check_tanggal(tgl);
});

$('#tanggal').change(function(){
	//fire your ajax call  
	$('#errortoday').html('<p class="small">Silahkan klik tombol tampilkan untuk melihat data</p>');
})

function check_tanggal(tgl){
	tbreservasi.where('status_reservasi', 'in', [1, 2, 3]).where('tanggal_reservasi', '==', tgl).orderBy('nomor_antrian').onSnapshot(function (snapshot){
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

$('#btn_tambah_antrian').click(function () {
	disable()
	$('#form-antrian').trigger("reset");
	$('#show_error').html('');
	$('#idpasien').val('');
	$('#errorktppasien').html('<p class="small">Silahkan cari nomor KTP dahulu</p>');
	$('#noktp').attr('readonly', false);
});

$('#cariktp').click(function () {
	var noktp = $.trim($('#noktp').val());
	if (noktp === '') {
        $('#errorktppasien').html('<p class="small">Silahkan isi nomor KTP dahulu</p>')
        return false
    } else {
        $('#errorktppasien').html('<p class="small">Silahkan cari nomor KTP dahulu</p>')
    }

    if (true) {
		tbpasien.where('noktp', '==', noktp).limit(1).get().then(function (qry) {
			enable()
	        if (qry.empty) {
	        	$('#errorktppasien').html('<p class="small">Pasien belum pernah berobat disini</p>')
	        }else{
	        	$('#namapasien').val(qry.docs[0].data().nama)
	        	$('#notelp').val(qry.docs[0].data().notelp)
	        	$('#alamatpasien').val(qry.docs[0].data().alamat)
	        	$('#tanggal_lahir').val(qry.docs[0].data().tanggal_lahir)
	        	$('#idpasien').val(qry.docs[0].id);
	        	$('#errorktppasien').html('<p class="small">Menampilkan pasien berdasarkan nomor ktp</p>')
	        }
	        $('#noktp').attr('readonly', true);
	    });
    }
});

function disable(){
	$('#namapasien').attr('readonly', true);
	$('#alamatpasien').attr('readonly', true);
	$('#tanggal_lahir').attr('readonly', true);
	$('#notelp').attr('readonly', true);
	// $('#keluhan').attr('readonly', true);
	$("#btn_simpan_antrian").prop( "disabled", true);
}

function enable(){
	$('#namapasien').attr('readonly', false);
	$('#alamatpasien').attr('readonly', false);
	$('#tanggal_lahir').attr('readonly', false);
	$('#notelp').attr('readonly', false);
	// $('#keluhan').attr('readonly', false);
	$("#btn_simpan_antrian").prop( "disabled", false);
}

$('#btn_simpan_antrian').click(function () {
	$('#errortgllibur').html('');
	$('#show_error').html('');
	$("#btn_simpan_antrian").prop( "disabled", true);
	var idpasien = $.trim($('#idpasien').val());
	var noktp = $.trim($('#noktp').val());
	var namapasien = $.trim($('#namapasien').val());
	var notelp = $.trim($('#notelp').val());
	var alamatpasien = $.trim($('#alamatpasien').val());
	var tanggal_lahir = $.trim($('#tanggal_lahir').val());
	var keluhan = $.trim($('#keluhan').val());
	var tanggal_reservasi = $.trim($('#tanggal_reservasi').val());

	simpan_antrian(idpasien, noktp, namapasien, alamatpasien, notelp, tanggal_lahir, keluhan, tanggal_reservasi);
});

function simpan_antrian(idpasien, noktp, namapasien, alamatpasien, notelp, tanggal_lahir, keluhan, tanggal_reservasi){
	tblibur.where('tanggal_libur', '==', tanggal_reservasi).get().then(function (querySnapshot) {
        if (querySnapshot.empty) {
        	if (idpasien === '') {
	        	tbpasien.add({
	                noktp : noktp,
	                notelp : notelp,
	                nama : namapasien,
	                alamat : alamatpasien,
	                tanggal_lahir : tanggal_lahir
	            }).then(function(docRef) {
            		simpan_reservasi(docRef.id, noktp, keluhan, tanggal_reservasi);
	            });
        	}else{
        		tbpasien.doc(idpasien).update({
		            notelp : notelp,
	                nama : namapasien,
	                alamat : alamatpasien,
	                tanggal_lahir : tanggal_lahir
		        });
        		simpan_reservasi(idpasien, noktp, keluhan, tanggal_reservasi);
        		insert_to_log('Data pasien noktp '+noktp+' nama '+namapasien+' telah diubah', 'update');
        	}
        }else{
	        $('#errortgllibur').html('<p class="small text-danger">Tanggal yang dipilih merupakan tanggal libur</p>');
        }
        $("#btn_simpan_antrian").prop( "disabled", false);
    });
}

function simpan_reservasi(idpasien, noktp, keluhan, tanggal_reservasi){
	tbreservasi.where('idpasien', '==', idpasien).where('tanggal_reservasi', '==', tanggal_reservasi).get().then(function (datauser){
		if (datauser.empty) {
			tbreservasi.where('tanggal_reservasi', '==', tanggal_reservasi).get().then(function (total){
				var noantrian = total.size + 1;
				tbreservasi.add({
					noktp : noktp,
	                idpasien : idpasien,
	                tanggal_reservasi : tanggal_reservasi,
	                keluhan : keluhan,
	                status_reservasi : 1,
	                nomor_antrian : noantrian
	            }).then(function(docRef) {
	            	insert_to_log('Penambahan reservasi pasien noktp '+noktp+' antrian tanggal '+tanggal_reservasi+' dengan nomor antrian '+noantrian, 'insert');
				    Swal.fire({
				        title: 'Sukses',
				        html: "Berhasil menambahkan data antrian pasien dengan nomor ktp <b>"+noktp+"</b> tanggal <b>"+tanggal_reservasi+"</b> nomor urut <h4>"+noantrian+"</h4>",
				        icon: 'success'
				    });
	            	$('#form-antrian').trigger("reset");
				    $('#modalAntrian').modal('hide');
	    		}).catch(function(error){
	    			$('#show_error').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Maaf!</strong> Gagal menyimpan data '+error.message+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
	    		});
    		});
		}else{
			$('#show_error').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Maaf!</strong> Tidak dapat mendaftarkan pasien dengan nomor ktp '+noktp+' pada tanggal yang sama<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
		}
    });
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

$("#dataTable").on("click", ".proses_dokter", function() {
	rowEdit = table.row($(this).parents('tr'));
    var row = $('#dataTable').dataTable().fnGetData($(this).closest('tr')); 
    idfirebase = row[0];
    var noantrian = $(this).closest('tr').find('td:eq(1)').text();
    var noktp = $(this).closest('tr').find('td:eq(2)').text();
    var tanggal = $(this).closest('tr').find('td:eq(0)').text();
    proses_dokter(idfirebase, noantrian, noktp, tanggal);
});

$("#dataTable").on("click", ".batalkan_reservasi", function() {
	rowEdit = table.row($(this).parents('tr'));
    var row = $('#dataTable').dataTable().fnGetData($(this).closest('tr')); 
    idfirebase = row[0];
    var tanggal_reservasi = $(this).closest('tr').find('td:eq(0)').text();
    var noantrian = $(this).closest('tr').find('td:eq(1)').text();
    var noktp = $(this).closest('tr').find('td:eq(2)').text();
    batalkan_reservasi(idfirebase, tanggal_reservasi, noantrian, noktp);
});

$("#dataTable").on("click", ".tidak_datang", function() {
	rowEdit = table.row($(this).parents('tr'));
    var row = $('#dataTable').dataTable().fnGetData($(this).closest('tr')); 
    idfirebase = row[0];
    var noantrian = $(this).closest('tr').find('td:eq(1)').text();
    var noktp = $(this).closest('tr').find('td:eq(2)').text();
    tidak_datang(idfirebase, noantrian, noktp);
});

function show_ajax_notif(idfirebase, noantrian, noktp, tanggal){
	$.ajax({
        type: "POST",
        url: "notification-dokter",
        data: "idfirebase="+idfirebase+"&noantrian="+noantrian+"&noktp="+noktp+"&tanggal="+tanggal,
        dataType: 'json',
        cache: false,
        success: function( response ) {
            tbreservasi.doc(idfirebase).update({
	            status_reservasi : 2
	        });
	        send_notification_pasien(tanggal);
        },
        error: function (xhr, status, error) {
        }
    });
}

function send_notification_pasien(tanggal){
	tbreservasi.where('tanggal_reservasi', '==', tanggal).where('status_reservasi', '==', 1).orderBy('nomor_antrian').limit(5).get().then(function (querySnapshot) {
        if (!querySnapshot.empty) {
        	idreservasi = [];
	        iduser = [];
	        nomorantrian = [];
	        no = 0;
	        status = 1;

	        querySnapshot.forEach((doc) => {
	        	idreservasi[no] = doc.id;
	        	iduser[no] = doc.data().idpasien;
	        	nomorantrian[no] = doc.data().nomor_antrian;

	        	no++;
		    });

		    $.ajax({
		        type: "POST",
		        url: "notification-pasien",
		        data: {
		        	idreservasi : idreservasi,
		        	iduser : iduser,
		        	nomorantrian : nomorantrian,
		        	status : status,
		        	tanggal : tanggal
		        },
		        dataType: 'json',
		        cache: false,
		        success: function( response ) {
		        },
		        error: function (xhr, status, error) {
		        }
		    });
        }
    });
}

function proses_dokter(idfirebase, noantrian, noktp, tanggal){
	Swal.fire({
        title: 'Proses Antrian?',
        html: "Proses ke dokter no ktp <b>"+noktp+"</b> nomor antrian <h4>"+noantrian+"</h4>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya'
    }).then((result) => {
    	if (result.value) {
    		show_ajax_notif(idfirebase, noantrian, noktp, tanggal);
    	}
    })
}

function batalkan_reservasi(idfirebase, tanggal_reservasi, noantrian, noktp){
	Swal.fire({
        title: 'Batalkan Reservasi?',
        html: "Batalkan reservasi no ktp <b>"+noktp+"</b> dengan nomor antrian <h4>"+noantrian+"</h4>",
        icon: 'info',
        input: 'text',
		inputAttributes: {
			autocapitalize: 'off'
		},
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya',
        preConfirm: (hasil) => {
        	tbreservasi.doc(idfirebase).update({
	            status_reservasi : 5,
	            alasan_batal : hasil
	        });
    	}
    }).then((result) => {
        if (result.value) {
            Swal.fire({
		        title: 'Sukses',
		        text: "Berhasil membatalkan data antrian",
		        icon: 'success'
		    });
        }
    })
}

function tidak_datang(idfirebase, noantrian, noktp){
	Swal.fire({
        title: 'Tidak Datang?',
        html: "Konfirmasi no ktp <b>"+noktp+"</b> dengan nomor antrian <h4>"+noantrian+"</h4> tidak datang",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya'
    }).then((result) => {
    	if (result.value) {
	        tbreservasi.doc(idfirebase).update({
	            status_reservasi : 3
	        });
	    }
    })
}

$('#proses_dokter').click(function () {
	var nomor_antrian = $('#nomor_antrian').text();
	if (nomor_antrian == 0) {
		Swal.fire({
	        title: 'Maaf!',
	        text: "Nomor antrian tidak ditemukan. Silahkan refresh halaman ini jika ini adalah sebuah kesalahan",
	        icon: 'danger'
	    });
	}else{
		proses_dokter(idreal, nomorreal, ktpreal, get_date_now());
		insert_to_log('Proses pasien noktp '+ktpreal+' antrian tanggal '+tanggalreal+' dengan nomor '+nomorreal, 'update');
	}
})

$('#tidak_datang').click(function () {
	var nomor_antrian = $('#nomor_antrian').text();
	if (nomor_antrian == 0) {
		Swal.fire({
	        title: 'Maaf!',
	        text: "Nomor antrian tidak ditemukan. Silahkan refresh halaman ini jika ini adalah sebuah kesalahan",
	        icon: 'danger'
	    });
	}else{
		tidak_datang(idreal, nomorreal, ktpreal);
		insert_to_log('Pasien dengan noktp ' + ktpreal + ' tanggal '+tanggalreal+' dengan nomor antrian '+nomorreal+' tidak datang', 'update');
	}
})

$('#batalkan').click(function () {
	var nomor_antrian = $('#nomor_antrian').text();
	if (nomor_antrian == 0) {
		Swal.fire({
	        title: 'Maaf!',
	        text: "Nomor antrian tidak ditemukan. Silahkan refresh halaman ini jika ini adalah sebuah kesalahan",
	        icon: 'danger'
	    });
	}else{
		batalkan_reservasi(idreal, tanggalreal, nomorreal, ktpreal);
		insert_to_log('Pembatalan antrian tanggal '+tanggalreal+' dengan nomor '+nomorreal, 'update');
	}
})

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