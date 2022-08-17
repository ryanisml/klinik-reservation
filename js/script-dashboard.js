// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Call the dataTables jQuery plugin
$(document).ready(function() {
  var tbreservasi = db.collection("tb_reservasi");
  var tblog = db.collection("tb_log_aktifitas");

  var dataSet = [];

  // Inisiasi datatable berdasarkan div id
  var table = $('#dataLog').DataTable({
      data : dataSet,
      processing: true,
      columnDefs: [
          {
              targets: [0], 
              visible: false,                  
          },
          {
              targets: [4],
              className: "no-wrap"
          }
      ],
      order: [[4, 'asc']]
  });

  tbreservasi.onSnapshot(function (snapshot){
    var tunggu = 0;
    var sedang = 0;
    var tidak = 0;
    var selesai = 0;
    var batal = 0;
    var gagal = 0;
    snapshot.docChanges().forEach(function(change) {
      no = change.doc.data().status_reservasi;
      if (no == 1) {
        tunggu = tunggu + 1;
      }else if (no == 2) {
        sedang = sedang + 1;
      } else if (no == 3) {
        tidak = tidak + 1;
      } else if (no == 4) {
        selesai = selesai + 1;
      } else if (no == 5) {
        batal = batal + 1;
      }else{
        gagal = gagal + 1;
      }
    });
    $('#waiting').text(tunggu);
    $('#process').text(sedang);
    $('#notcoming').text(tidak);
    $('#done').text(selesai);
    $('#abort').text(batal);
    $('#fail').text(gagal);
  });

  $('#dataTable').DataTable();

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  var d = new Date();
  var strbulan = monthNames[d.getMonth()];
  $('#thismonth').text(strbulan);

  tbreservasi
  .where('tanggal_reservasi', '>=', getFirstDay(d.getFullYear(), d.getMonth()))
  .where('tanggal_reservasi', '<=', getLastDay(d.getFullYear(), d.getMonth()))
  .orderBy('tanggal_reservasi')
  .get("tanggal_reservasi").then(function (querySnapshot) {
      if (querySnapshot.empty == false) {
          var my_arr = []
          for (var i = 0; i < querySnapshot.size; i++) {
            my_arr.push(querySnapshot.docs[i].data().tanggal_reservasi);
          }
          result = my_arr.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));

          ttle = 'Total Reservasi Selama Bulan '+strbulan;
          show_bar_chart(ttle, Object.keys(result), Object.values(result));
      }
  });

// $.getJSON('https://data.covid19.go.id/public/api/update.json')
//   .done(function( jdata ) {
//     console.log( "JSON Data: " + jdata );
//   })
//   .fail(function( jqxhr, textStatus, error ) {
//     var err = textStatus + ", " + error;
//     console.log( "Request Failed: " + err );
// });

var ctx = document.getElementById("myPieChart");
$('#myPieChart').css('display', 'none');
function generate_data_covid(data){
  $('#myPieChart').css('display', 'block');
  colors=[];
  keyval = get_key(data);
  for(let i=0;i<this.keyval.length;i++){
        this.colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
  }
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: keyval,
      datasets: [{
        data: get_data(data),
        backgroundColor: this.colors,
      }],
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Data Covid Harian per '+data.created
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
  });
}

function get_key(data){
  const datakey = [];
  $.each(data, function(k, v) {
    if (k !== 'tanggal' && k !== 'created') {
      datakey.push(k);      
    }
  });
  return datakey;
}

function get_data(data){
  const datakey = [];
  $.each(data, function(k, v) {
    if (k !== 'tanggal' && k !== 'created') {
      datakey.push(v);      
    }
  });
  return datakey;
}

$.ajax({
    type: "GET",
    url: "covid",
    data: {method: 'request'},
    dataType: 'json',
    cache: false,
    success: function( response ) {
        $('#loading-covid').html('');
        $('#error-covid').html('');
        generate_data_covid(response.update.penambahan);
    },
    error: function (jqXHR, exception) {
        $('#error-covid').css('display', 'block');
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        $('#error-covid').html('<br/><h5>'+msg+'</h5><br/>');
        $('#loading-covid').html('');
        $('#myPieChart').css('display', 'none');
    }
});

  $('#btnBMI').click(function () {
    $("#btnBMI").prop( "disabled", true);
    var tinggi = $.trim($('#tinggi').val());
    var berat = $.trim($('#berat').val());
    var umur = $.trim($('#umur').val());
    var kelamin = $.trim($('#kelamin').val());
    var pinggang = $.trim($('#pinggang').val());
    var pinggul = $.trim($('#pinggul').val());

    if (tinggi === '') {
        $('#error_tinggi').html('<small><p class="text-danger">Tinggi badan wajib diisi<\/p><\/small>')
        return false
    } else {
        $('#error_tinggi').html('')
    }

    if (berat === '') {
        $('#error_berat').html('<small><p class="text-danger">Berat badan wajib diisi<\/p><\/small>')
        return false
    } else {
        $('#error_berat').html('')
    }

    if (umur === '') {
        $('#error_umur').html('<small><p class="text-danger">Umur wajib diisi<\/p><\/small>')
        return false
    } else {
        $('#error_umur').html('')
    }

    if (pinggang === '') {
        $('#error_pinggang').html('<small><p class="text-danger">Lingkar pinggang wajib diisi<\/p><\/small>')
        return false
    } else {
        $('#error_pinggang').html('')
    }

    if (pinggul === '') {
        $('#error_pinggul').html('<small><p class="text-danger">Lingkar pinggul wajib diisi<\/p><\/small>')
        return false
    } else {
        $('#error_pinggul').html('')
    }

    // const data = JSON.stringify({
    //   "weight": {
    //     "value": berat,
    //     "unit": "kg"
    //   },
    //   "height": {
    //     "value": tinggi,
    //     "unit": "cm"
    //   },
    //   "sex": kelamin,
    //   "age": umur,
    //   "waist": pinggang,
    //   "hip": pinggul
    // });

    // const xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === this.DONE) {
    //     console.log(this.responseText);
    //   }
    //   $("#btnBMI").prop( "disabled", false);
    // });

    // xhr.open("POST", "https://bmi.p.rapidapi.com/");
    // xhr.setRequestHeader("content-type", "application/json");
    // xhr.setRequestHeader("x-rapidapi-host", "bmi.p.rapidapi.com");

    // xhr.send(data);
  });

  tblog.orderBy('waktu_log').onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
              dataSet = [change.doc.id, change.doc.data().aktifitas_log, change.doc.data().status_log, change.doc.data().ip_log+' # '+change.doc.data().from_log, change.doc.data().waktu_log];
              table.rows.add([dataSet]).draw();
          }
          if (change.type === "modified") {
              dataSet = [change.doc.id, change.doc.data().aktifitas_log, change.doc.data().status_log, change.doc.data().ip_log+' # '+change.doc.data().from_log, change.doc.data().waktu_log];
              table.row(rowEdit).data(dataSet).draw();
          }
          if (change.type === "removed") {
              table.row(rowEdit).remove().draw();
          }
      });
  });
});

function getFirstDay(tahun, bulan) {
  var today = new Date(tahun, bulan, 1);
  var date = ("0" + today.getDate()).slice(-2);
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var year = today.getFullYear();

  return year + "-" + month + "-" + date;
}

function getLastDay(tahun, bulan) {
  var today = new Date(tahun, bulan + 1, 0);
  var date = ("0" + today.getDate()).slice(-2);
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var year = today.getFullYear();

  return year + "-" + month + "-" + date;
}