<?php
    if ($_POST['token'] != null) {
        $url = "https://fcm.googleapis.com/fcm/send";

        $mysite = "http://".$_SERVER['SERVER_NAME'].dirname($_SERVER["REQUEST_URI"].'?').'/';

        $headers = array(
            'Authorization: key=auth_key',
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
                "icon" => "./assets/img/icon.png",
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
?>
