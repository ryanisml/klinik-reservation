<?php
class DeleteController {
    public function __construct() {
    }

    public function deleteDokter() {
        $data = array(
            'title' => 'Delete Dokter Data',
            'view' => 'delete-doctor.php',
            'script' => 'delete-doctor.js'
        );
        extract($data);
        require 'view/delete/layout-deletion.php';
    }

    public function deletePasien() {
        $data = array(
            'title' => 'Delete Pasien Data',
            'view' => 'delete-patient.php',
            'script' => 'delete-patient.js'
        );
        extract($data);
        require 'view/delete/layout-deletion.php';
    }

}