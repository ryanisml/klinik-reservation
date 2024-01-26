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

var ctx = document.getElementById("myLineChart");
$('#myLineChart').css('display', 'none');
$('#data-aqi').css('display', 'none');
function generate_data_aqi(data){
  $('#myLineChart').css('display', 'block');
  $('#data-aqi').css('display', 'block');
  $('#aqi_from').text(data.attributions[0].name);
  $('#aqi').text(data.aqi);
  $('#aqi_index').text(data.idx);
  
  var ctx = document.getElementById("myLineChart");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: get_data_chart(data),
    options: {
      responsive: true,
      maintainAspectRatio: true,
      title: {
          display: true,
          text: 'Forecast AQI'
      }
    }
  });
}

function get_data_chart(data){
  var keyval = [];
  var keyval2 = [];
  var keyval3 = [];
  $.each(data.forecast.daily.pm10, function(k, v) {
    keyval.push(v.avg);
    keyval2.push(v.max);
    keyval3.push(v.min);
  });
  return {
    labels: get_key(data.forecast.daily.pm10),
    datasets: [{
      label: "Average",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "#007bff",
      pointRadius: 3,
      pointBackgroundColor: "#007bff",
      pointBorderColor: "#007bff",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "#007bff",
      pointHoverBorderColor: "#007bff",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: keyval,
    },{
      label: "Maximum",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "#dc3545",
      pointRadius: 3,
      pointBackgroundColor: "#dc3545",
      pointBorderColor: "#dc3545",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "#dc3545",
      pointHoverBorderColor: "#dc3545",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: keyval2,
    },{
      label: "Minimum",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "#ffc107",
      pointRadius: 3,
      pointBackgroundColor: "#ffc107",
      pointBorderColor: "#ffc107",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "#ffc107",
      pointHoverBorderColor: "#ffc107",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: keyval3,
    }],
  };
}

function get_key(data){
  var keyval = [];
  $.each(data, function(k, v) {
    keyval.push(v.day);
  });
  return keyval;
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
        if(response.status == 'ok'){
            $('#error-covid').css('display', 'none');
            $('#myLineChart').css('display', 'block');
            generate_data_aqi(response.data);
        }else{
            $('#error-covid').css('display', 'block');
            $('#error-covid').html('<br/><h5>'+response.message+'</h5><br/>');
            $('#myLineChart').css('display', 'none');
        }
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
        $('#myLineChart').css('display', 'none');
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

function show_bar_chart(title, label, data){
  var ctx = document.getElementById("myBarChart");
  var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: [{
        label: "Jumlah Reservasi",
        backgroundColor: "#007bff",
        borderColor: "#007bff",
        data: data,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
          display: true,
          text: title
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'day'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 31
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 20,
            maxTicksLimit: 20
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}