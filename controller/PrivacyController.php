<?php
class PrivacyController {

    public function __construct() {
    }

    // public function index() {
    //     header("HTTP/1.0 404 Not Found");
    //     $data = array(
    //         'page_title' => 'Error - Page Not Found'
    //     );
    //     extract($data);
    //     require 'view/menu/error/404.php';
    // }
    public function PrivacyDokter() {
        require 'view/privacy-policy/privacy-doctor.php';
    }

    public function PrivacyPasien() {
        require 'view/privacy-policy/privacy-patient.php';
    }

    public function DokterTerms() {
        require 'view/privacy-policy/terms-doctor.php';
    }

    public function PasienTerms() {
        require 'view/privacy-policy/terms-patient.php';
    }
}