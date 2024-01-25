<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>
        <?= $header ?> - My Klinik
    </title>
    <link rel="icon" href="<?= base_url ?>assets/img/icon.png">
    <link href="<?= base_url ?>assets/css/styles.css" rel="stylesheet" />
    <link href="<?= base_url ?>assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="<?= base_url ?>assets/dataTables/dataTables.bootstrap4.min.css" rel="stylesheet" />
    <script src="<?= base_url ?>assets/js/all.min.js"></script>
    <?php
    if (isset($cssfile)) {
        foreach ($cssfile as $row) {
            echo '<link rel="stylesheet" type="text/css" href="' . base_url . '' . $row . '" />' . "\r\n";
        }
    }
    ?>
    <script type="text/javascript">
        var baseurl = '<?= base_url ?>';
    </script>
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
            if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
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
        <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i
                class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div class="input-group">
                <label class="text-white" id="txt"></label>
            </div>
        </form>
        <!-- Navbar-->
        <ul class="navbar-nav ml-auto ml-md-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="<?= base_url ?>dashboard">Activity Log</a>
                    <button class="dropdown-item" data-toggle="modal" data-target="#passwordModalCenter"
                        type="button">Ubah Sandi</button>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item" id="btnKeluar" type="button">Logout</button>
                </div>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Menu</div>
                        <a class="nav-link <?= ($active == 'dashboard') ? 'active' : '' ?>" href="<?= base_url ?>dashboard">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </a>
                        <div class="sb-sidenav-menu-heading">Interface</div>
                        
                        <a class="nav-link <?= ($active == 'data-dokter') ? 'active' : '' ?>" href="<?= base_url ?>data-dokter">
                            <div class="sb-nav-link-icon"><i class="fas fa-id-badge"></i></div>
                            Data Dokter
                        </a>
                        <a class="nav-link <?= ($active == 'data-pasien') ? 'active' : '' ?>" href="<?= base_url ?>data-pasien">
                            <div class="sb-nav-link-icon"><i class="fas fa-user"></i></div>
                            Data Pasien
                        </a>
                        <a class="nav-link <?= ($active == 'data-tanggal-libur') ? 'active' : '' ?>" href="<?= base_url ?>data-tanggal-libur">
                            <div class="sb-nav-link-icon"><i class="fas fa-calendar"></i></div>
                            Data Tanggal Libur
                        </a>
                        <div class="sb-sidenav-menu-heading">History</div>
                        <a class="nav-link" href="<?= base_url ?>history-pemeriksaan">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            History Pemeriksaan
                        </a>
                        <a class="nav-link" href="<?= base_url ?>history-reservasi">
                            <div class="sb-nav-link-icon"><i class="fas fa-history"></i></div>
                            History Antrian
                        </a>
                    </div>
                </div>
                <div class="sb-sidenav-footer" id="nama_dokter">
                    <div class="small">Status Dokter</div>
                    Nama Dokter
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <?php require_once $view; ?>
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
                aria-hidden="true" id="passwordModalCenter">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <form id="form-password">
                            <div class="modal-header">
                                <h5 class="modal-title">Tambah Antrian</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="modalemail">Email</label>
                                    <input type="text" class="form-control" name="email_auth" id="email_auth" readonly
                                        autocomplete="username">
                                </div>
                                <div class="form-group">
                                    <label for="newpass">Password Baru</label>
                                    <div class="input-group">
                                        <input type="password" class="form-control" id="newpass" name="newpass"
                                            autocomplete="new-password">
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="span_new fa fa-eye-slash"
                                                    onclick="show_new_pass()"></i></span>
                                        </div>
                                    </div>
                                    <div id="error_new_pass"></div>
                                </div>
                                <div class="form-group">
                                    <label for="newpasscek">KonfirmasiPassword Baru</label>
                                    <div class="input-group">
                                        <input type="password" class="form-control" id="newpasscek" name="newpasscek"
                                            autocomplete="new-password">
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="span_new_cek fa fa-eye-slash"
                                                    onclick="show_new_pass_cek()"></i></span>
                                        </div>
                                    </div>
                                    <div id="error_new_pass_cek"></div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="save_pass_change" class="btn btn-primary">Simpan</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <input type="hidden" id="inisialuser">
            <input type="hidden" id="ipuser" value="<?= $ipaddress ?>">
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy;
                            Your Website 2023
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <script src="<?= base_url ?>assets/script/firebase-script.js"></script>
    <script src="<?= base_url ?>assets/jquery/jquery-3.5.1.min.js"></script>
    <script src="<?= base_url ?>assets/jquery/jquery-ui.min.js"></script>
    <script src="<?= base_url ?>assets/script/scripts.js"></script>
    <script src="<?= base_url ?>assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="<?= base_url ?>assets/dataTables/jquery.dataTables.min.js"></script>
    <script src="<?= base_url ?>assets/dataTables/dataTables.bootstrap4.min.js"></script>
    <script src="<?= base_url ?>assets/swal/sweet-alert-2_10.js"></script>
    <?php
    if (isset($jsfile)) {
        foreach ($jsfile as $row) {
            echo '<script src="' . base_url . '' . $row . '"></script>' . "\r\n";
        }
    }
    ?>
</body>

</html>