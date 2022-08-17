<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title><?= $header ?> - My Klinik</title>
        <link rel="icon" href="<?= $asset ?>assets/img/icon.png">
        <link href="<?= $asset ?>assets/css/styles.css" rel="stylesheet" />
        <link href="<?= $asset ?>assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="<?= $asset ?>assets/dataTables/dataTables.bootstrap4.min.css" rel="stylesheet" />
        <script src="<?= $asset ?>assets/js/all.min.js"></script>
        <?php
            if (isset($cssfile)) {
                foreach ($cssfile as $row) {
                    echo '<link rel="stylesheet" type="text/css" href="' . $row . '" />'."\r\n";
                }
            }
        ?>
        <!-- The core Firebase JS SDK is always required and must be listed first -->
        <!-- TODO: Add SDKs for Firebase products that you want to use
            https://firebase.google.com/docs/web/setup#available-libraries -->
        <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-analytics.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-firestore.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>

        <script>
            function startTime() {
                var today = new Date();
                var date = ("0" + today.getDate()).slice(-2);
                var month = ("0" + (today.getMonth() + 1)).slice(-2);
                var year = today.getFullYear();
                
                var h = ("0" + today.getHours()).slice(-2);
                var m = ("0" + today.getMinutes()).slice(-2);
                var s = ("0" + today.getSeconds()).slice(-2);
                document.getElementById('txt').innerHTML =
                "<b>" + h + ":" + m + ":" + s + ", " + date + "-" + month + "-" + year + "</b>";
                var t = setTimeout(startTime, 500);
            }
            function checkTime(i) {
                if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
                return i;
            }

            function getTimeInsert() {
                var today = new Date();
                var date = ("0" + today.getDate()).slice(-2);
                var month = ("0" + (today.getMonth() + 1)).slice(-2);
                var year = today.getFullYear();
                
                var h = ("0" + today.getHours()).slice(-2);
                var m = ("0" + today.getMinutes()).slice(-2);
                var s = ("0" + today.getSeconds()).slice(-2);
                return year + "-" + month + "-" + date + " " + h + ":" + m + ":" + s;
            }
        </script>
    </head>
    <body class="sb-nav-fixed" onload="startTime()">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="#">M Y&nbsp;&nbsp;K L I N I K</a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
            <!-- Navbar Search-->
            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group">
                    <label class="text-white" id="txt"></label>
                </div>
            </form>
            <!-- Navbar-->
            <ul class="navbar-nav ml-auto ml-md-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="dashboard">Activity Log</a>
                        <button class="dropdown-item" data-toggle="modal" data-target="#passwordModalCenter" type="button">Ubah Sandi</button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item" id="btnKeluar" type="button">Logout</button>
                    </div>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">