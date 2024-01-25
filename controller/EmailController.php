<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailController {
    public function send() {
        $mail = new PHPMailer(true);
        if (isset($_POST['emaildokter']) && isset($_POST['nama']) && isset($_POST['password'])) {
            try {
                $email = $_POST["emaildokter"];
                $nama = $_POST["nama"];
                $password = $_POST["password"];
                //Server settings
                $mail->SMTPDebug = SMTP::DEBUG_OFF;                         //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.hostinger.com';                   //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'no-reply@ismail.id';                   //SMTP username
                $mail->Password   = 'Testing123!!!';                        //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            
                //Recipients
                $mail->setFrom('no-reply@ismail.id', '[No-Reply] Klinik Reservation');
                $mail->addAddress($email, $nama);     //Add a recipient
                
                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = "[Registrasi Akun] Dokter ".$nama." berikut ini akun untuk masuk aplikasi klinik";
                $mail->Body    = '<b>Berikut ini kami berikan akun dokter untuk anda gunakan masuk kedalam aplikasi</b><br/><table><tr><th>Email</th><th>Kata Sandi</th></tr><tr><td>'.$email.'</td><td>'.$password.'</td></tr></table>';
            
                $mail->send();
                $response['sukses'] = 'Berhasil Kirim Password Ke Email';
            } catch (Exception $e) {
                $response['sukses'] = 'Gagal Kirim Password Ke Email';
            }
            echo json_encode($response);
        }else{
            header('Location: data-dokter');
            die();
        }
    }
}