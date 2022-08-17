<?php
$result['error'] = false;
if ($_GET['method'] != null) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://data.covid19.go.id/public/api/update.json');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    echo $result;
    curl_close($ch);
} else {
    $result['error'] = true;
    echo json_encode($result);
}
?>