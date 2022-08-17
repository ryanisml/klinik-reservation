<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$uriSegments = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

$asset = '';
if (isset($uriSegments[3])) {
    $asset = '../';
}

function get_client_ip()
{
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if (getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if (getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if (getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if (getenv('HTTP_FORWARDED'))
        $ipaddress = getenv('HTTP_FORWARDED');
    else if (getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

$ipaddress = get_client_ip();

$copyright = 'Your Website ' . date('Y');
$segment = array(
    array(
        'title' => 'login',
        'url' => 'login.html',
        'header' => 'Login App',
        'status' => 0
    ),
    array(
        'title' => 'send-mail',
        'url' => 'send-mail.php',
        'header' => 'Send Email',
        'status' => 0
    ),
    array(
        'title' => 'send-notification',
        'url' => 'send-notification.php',
        'header' => 'Send Notification',
        'status' => 0
    ),
    array(
        'title' => 'notification-dokter',
        'url' => 'notification-dokter.php',
        'header' => 'Send Notification Dokter',
        'status' => 0
    ),
    array(
        'title' => 'notification-pasien',
        'url' => 'notification-pasien.php',
        'header' => 'Send Notification Pasien',
        'status' => 0
    ),
    array(
        'title' => 'notification-admin',
        'url' => 'notification-admin.php',
        'header' => 'Send Notification Admin',
        'status' => 0
    ),
    array(
        'title' => 'covid',
        'url' => 'covid.php',
        'header' => 'Covid API',
        'status' => 0
    ),
    array(
        'title' => 'dashboard',
        'url' => 'dashboard.html',
        'header' => 'Dashboard',
        'jsfile' => array(
            'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
            'assets/chartjs/Chart.min.js',
            'js/script-dashboard.js'
        ),
        'cssfile' => array(
            'assets/bootstrap-datepicker/css/bootstrap-datepicker.min.css'
        ),
        'status' => 1
    ),
    array(
        'title' => 'data-pemeriksaan',
        'url' => 'data-pemeriksaan.html',
        'header' => 'Data Pemeriksaan Pasien',
        'jsfile' => array(
            'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
            'js/script-pemeriksaan.js'
        ),
        'cssfile' => array(
            'assets/bootstrap-datepicker/css/bootstrap-datepicker.min.css'
        ),
        'status' => 1
    ),
    array(
        'title' => 'data-dokter',
        'url' => 'data-dokter.html',
        'header' => 'Data Dokter',
        'jsfile' => array(
            'js/script-dokter.js'
        ),
        'cssfile' => array(),
        'status' => 1
    ),
    array(
        'title' => 'data-pasien',
        'url' => 'data-pasien.html',
        'header' => 'Data Pasien',
        'jsfile' => array(
            'js/script-pasien.js'
        ),
        'cssfile' => array(),
        'status' => 1
    ),
    array(
        'title' => 'history-pasien',
        'url' => 'history-pasien.html',
        'header' => 'Data History Pemeriksaan Pasien',
        'jsfile' => array(
            'js/script-history-pasien.js'
        ),
        'cssfile' => array(),
        'status' => 1
    ),
    array(
        'title' => 'data-tanggal-libur',
        'url' => 'data-tanggal-libur.html',
        'header' => 'Data Tanggal Libur',
        'jsfile' => array(
            'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
            'js/script-tanggal-libur.js'
        ),
        'cssfile' => array(
            'assets/bootstrap-datepicker/css/bootstrap-datepicker.min.css'
        ),
        'status' => 1
    ),
    array(
        'title' => 'data-history-reservasi',
        'url' => 'data-history-reservasi.html',
        'header' => 'Data History Reservasi',
        'jsfile' => array(
            'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
            'js/script-history-reservasi.js'
        ),
        'cssfile' => array(
            'assets/bootstrap-datepicker/css/bootstrap-datepicker.min.css'
        ),
        'status' => 1
    )
);

$header = '';
$cssfile = '';
$jsfile = '';
$ketemu = false;
foreach ($segment as $baris) {
    if ($uriSegments[2] == $baris['title']) {
        $header = $baris['header'];
        if ($baris['status'] == 0) {
            require($baris['url']);
            $ketemu = true;
            break;
        } else {
            $cssfile = $baris['cssfile'];
            $jsfile = $baris['jsfile'];
            require('layout/header.php');
            require('layout/sidebar.php');
            require($baris['url']);
            require('layout/footer.php');
            $ketemu = true;
            break;
        }
    }
}
if ($uriSegments[2] == null) {
    $header = $segment[6]['header'];
    $cssfile = $segment[6]['cssfile'];
    $jsfile = $segment[6]['jsfile'];
    require('layout/header.php');
    require('layout/sidebar.php');
    require($segment[6]['url']);
    require('layout/footer.php');
} else {
    if ($ketemu == false) {
        $header = 'Page not found';
        require('404.php');
    }
}
?>