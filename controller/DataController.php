<?php

class DataController {
    public function index() {
        $ipaddress = $this->get_ipaddr();
        
        $data = array(
            'header' => 'Dashboard',
            'active' => 'dashboard',
            'ipaddress' => $ipaddress,
            'jsfile' => array(
                'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                'assets/chartjs/Chart.min.js',
                'js/script-dashboard.js'
            ),
            'cssfile' => array(
                'assets/bootstrap-datepicker/css/bootstrap-datepicker.min.css'
            ),
            'view' => 'dashboard.html'
        );
        extract($data);
        require 'view/menu/layout.php';
    }

    public function dokter() {
        $ipaddress = $this->get_ipaddr();
        
        $data = array(
            'header' => 'Data Dokter',
            'active' => 'data-dokter',
            'ipaddress' => $ipaddress,
            'jsfile' => array(
                'js/script-dokter.js'
            ),
            'view' => 'data/data-dokter.html'
        );
        extract($data);
        require 'view/menu/layout.php';
    }

    public function pasien() {
        $ipaddress = $this->get_ipaddr();
        
        $data = array(
            'header' => 'Data Pasien',
            'active' => 'data-pasien',
            'ipaddress' => $ipaddress,
            'jsfile' => array(
                'js/script-pasien.js'
            ),
            'view' => 'data/data-pasien.html'
        );
        extract($data);
        require 'view/menu/layout.php';
    }

    public function tanggalLibur() {
        $ipaddress = $this->get_ipaddr();
        
        $data = array(
            'header' => 'Data Tanggal Libur',
            'active' => 'data-tanggal-libur',
            'ipaddress' => $ipaddress,
            'jsfile' => array(
                'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                'js/script-tanggal-libur.js'
            ),
            'cssfile' => array(
                'assets/bootstrap-datepicker/css/bootstrap-datepicker.min.css'
            ),
            'view' => 'data/data-tanggal-libur.html'
        );
        extract($data);
        require 'view/menu/layout.php';
    }

    public function covid() {
        $result['error'] = false;
        if ($_GET['method'] != null) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://data.covid19.go.id/public/api/update.json');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $result = curl_exec($ch);
            echo $result;
            curl_close($ch);
        } else {
            $result['error'] = true;
            echo json_encode($result);
        }
    }

    private function get_ipaddr()
    {
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip_address = $_SERVER['REMOTE_ADDR'];
        }
        return $ip_address;
    }
}