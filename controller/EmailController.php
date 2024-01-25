<?php

class EmailController {
    public function send() {
        ini_set( 'display_errors', 1 );
        error_reporting( E_ALL );    
        if ($_POST['emaildokter'] != null) {
            $email = $_POST["emaildokter"];
            $nama = $_POST["nama"];
            $password = $_POST["password"];
            $subject = "Kpd yth Dokter ".$nama." berikut ini akun untuk masuk aplikasi klinik";
            $message = "
            <html>
            <head>
            <title>Berikut Ini Kami Berikan Akun Dokter Anda</title>
            </head>
            <body>
            <table>
            <tr>
            <th>Email</th>
            <th>Kata Sandi</th>
            </tr>
            <tr>
            <td>".$email."</td>
            <td>".$password."</td>
            </tr>
            </table>
            </body>
            </html>";

            // Always set content-type when sending HTML email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            // More headers
            $headers .= 'From: <ryan@ismail.id>';
            if (!mail($email,$subject,$message,$headers)) {
                $response['sukses'] = 'Gagal Kirim Password Ke Email';
            }else{
                $response['sukses'] = 'Berhasil Kirim Password Ke Email';
            }
            echo json_encode($response);
        }else{
            header('Location: data-dokter');
            die();
        }
    }
}