<?php
if ($_POST['idfirebase'] != null) {
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
            "title" => 'Pemberitahuan pasien datang',
        )
    );

    $headers = array(
        'Authorization: key=AAAA360F3Ig:APA91bEktX44tAP9Tqi9AqAo8eHMjzVHcEEbFENTjhz8-kKg4Kgd1_v3HF8Jem0FRXip-8qQYBupVjC0zQV38u83fI3P9YrSJTd4wOxPEDW7Jp2LmuFAVlZW-uWLJ2JnfabqOz9KsPuC',
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
?>