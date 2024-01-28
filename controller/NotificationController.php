<?php

class NotificationController {
    public function sendDokter(){
        if (isset($_POST['idfirebase'])) {
            $fcmUrl = 'https://fcm.googleapis.com/fcm/send';
        
            $idfirebase = $_POST['idfirebase'];
            $noantrian = $_POST['noantrian'];
            $noktp = $_POST['noktp'];
            $tanggal = $_POST['tanggal'];
        
            $fields = array(
                'to' => '/topics/pasien-hadir',
                "data" => array(
                    "iduser" => $idfirebase,
                    "body" => 'Pasien dgn no antrian ' . $noantrian . ' tgl periksa ' . $tanggal . ' telah datang.',
                    // "body" => 'Pasien dgn no antrian telah datang.',
                    "title" => 'Pemberitahuan pasien datang',
                )
            );
        
            $headers = array(
                'Authorization: key=' . $_ENV['FIREBASE_API_KEY'],
                'Content-Type: application/json'
            );
        
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $fcmUrl);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
            $result = curl_exec($ch);
            echo json_encode($result);
            curl_close($ch);
        } else {
            $result['error'] = true;
            echo json_encode($result);
        }
    }

    public function sendPasien() {
        if (isset($_POST['idreservasi'])) {
            $fcmUrl = 'https://fcm.googleapis.com/fcm/send';
    
            $idreservasi = $_POST['idreservasi'];
            $iduser = $_POST['iduser'];
            $nomorantrian = $_POST['nomorantrian'];
            $status = $_POST['status'];
            $tanggal = $_POST['tanggal'];
    
            $headers = array(
                'Authorization: key=' . $_ENV['FIREBASE_API_KEY'],
                'Content-Type: application/json'
            );
    
            if ($status == 1) {
                $ch = curl_init();
    
                for ($i=0; $i < count($idreservasi); $i++) { 
                    $no = $i + 1;
                    $fields = null;
                    $fields = array(
                        'to'  => '/topics/'.$iduser[$i],
                        "data" => array(
                            "iduser" => $iduser[$i],
                            "body" => 'Tersisa '.$no.' antrian lagi pd tgl periksa '.$tanggal.'. Silahkan bersiap-siap.',
                            "title"  => 'Pemberitahuan nomor antrian '.$nomorantrian[$i],
                            "deskripsi" => 'Pemberitahuan sisa antrian',
                            "statusid" => $status
                        )
                    );
    
                    curl_setopt($ch, CURLOPT_URL, $fcmUrl);
                    curl_setopt($ch, CURLOPT_POST, true);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
                    $result['response'][$i] = curl_exec($ch);
    
                    var_dump($fields);
                }
                echo json_encode($result);
                curl_close( $ch );
            }elseif ($status == 3) {
                # code...
            }elseif ($status == 5) {
                $alasan = $_POST['alasan'];
            }else{
                $result['error'] = true;
                echo json_encode($result);
            }
        }else{
            $result['error'] = true;
            echo json_encode($result);
        }
    }

    public function sendAdmin() {
        if (isset($_POST['token'])) {
            $url = "https://fcm.googleapis.com/fcm/send";
    
            $mysite = "http://".$_SERVER['SERVER_NAME'].dirname($_SERVER["REQUEST_URI"].'?').'/';
    
            $headers = array(
                'Authorization: key=' . $_ENV['FIREBASE_API_KEY'],
                'Content-Type: application/json'
            );
    
            $token = $_POST['token'];
            $tanggal = $_POST['tanggal'];
            $noantrian = $_POST['noantrian'];
            $keluhan = $_POST['keluhan'];
            $action = $_POST['action'];
    
            $allTokens = array();
            for ($i=0; $i < count($token); $i++) { 
                $allTokens[] = $token[$i];
            }
    
            if ($action == 'add') {
                $title = 'Penambahan pasien tanggal '.$tanggal;
                $message = 'Tambahan pasien baru dgn no antrian '.$noantrian.' tanggal '.$tanggal.' keluhan '.$keluhan;
            }else if ($action == 'periksa') {
                $title = 'Pasien telah diperiksa tanggal '.$tanggal;
                $message = 'Pasien dengan no antrian '.$noantrian.' tanggal '.$tanggal.' telah diperiksa. Silahkan lanjut nomor antrian berikutnya.';
            }
    
            $fields = array(
                "registration_ids" => $allTokens,
                "notification" => array(
                    "icon" => "".base_url."assets/img/icon.png",
                    "body" => $message,
                    "title" => $title,
                    "click_action" => $mysite
                )
            );
    
    
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
            $result = curl_exec($ch);
            $result['error'] = false;
            echo json_encode($result);
            curl_close($ch);
        }else{
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