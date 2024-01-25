<?php
class ErrorController {

    public function __construct() {
    }

    public function index() {
        header("HTTP/1.0 404 Not Found");
        $data = array(
            'page_title' => 'Error - Page Not Found'
        );
        extract($data);
        require 'view/menu/error/404.php';
    }
}