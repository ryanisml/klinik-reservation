<?php

class HistoryController {
    public function pasien() {
        $ipaddress = $this->get_ipaddr();
        
        $data = array(
            'header' => 'History Data Pemeriksaan Pasien',
            'active' => 'pasien',
            'ipaddress' => $ipaddress,
            'jsfile' => array(
                'assets/script/script-history-pasien.js'
            ),
            'view' => 'history/history-pasien.html'
        );
        extract($data);
        require 'view/menu/layout.php';
    }

    public function reservasi() {
        $ipaddress = $this->get_ipaddr();
        
        $data = array(
            'header' => 'History Reservasi',
            'active' => 'history-reservasi',
            'ipaddress' => $ipaddress,
            'jsfile' => array(
                'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                'assets/script/script-history-reservasi.js'
            ),
            'cssfile' => array(
                'assets/bootstrap-datepicker/css/bootstrap-datepicker.min.css'
            ),
            'view' => 'history/history-reservasi.html'
        );
        extract($data);
        require 'view/menu/layout.php';
    }

    public function pemeriksaan() {
        $ipaddress = $this->get_ipaddr();
        
        $data = array(
            'header' => 'History Pemeriksaan',
            'active' => 'history-pemeriksaan',
            'ipaddress' => $ipaddress,
            'jsfile' => array(
                'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                'assets/script/script-history-pemeriksaan.js'
            ),
            'cssfile' => array(
                'assets/bootstrap-datepicker/css/bootstrap-datepicker.min.css'
            ),
            'view' => 'history/history-pemeriksaan.html'
        );
        extract($data);
        require 'view/menu/layout.php';
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