<?php
    if ($_POST['idreservasi'] != null) {
        $fcmUrl = 'https://fcm.googleapis.com/fcm/send';

        $idreservasi = $_POST['idreservasi'];
        $iduser = $_POST['iduser'];
        $nomorantrian = $_POST['nomorantrian'];
        $status = $_POST['status'];
        $tanggal = $_POST['tanggal'];

        $headers = array(
            'Authorization: key=auth_key',
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
?>
