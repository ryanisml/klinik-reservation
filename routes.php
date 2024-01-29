<?php
$routes = [
    '/' => 'LoginController@index',
    '/login' => 'LoginController@index',
    '/dashboard' => 'DataController@index',
    '/send-email' => 'EmailController@send',
    '/notification-dokter' => 'NotificationController@sendDokter',
    '/notification-pasien' => 'NotificationController@sendPasien',
    '/notification-admin' => 'NotificationController@sendAdmin',
    '/covid' => 'DataController@covid',
    '/history-pasien' => 'HistoryController@pasien',
    '/history-reservasi' => 'HistoryController@reservasi',
    '/history-pemeriksaan' => 'HistoryController@pemeriksaan',
    '/data-dokter' => 'DataController@dokter',
    '/data-pasien' => 'DataController@pasien',
    '/data-tanggal-libur' => 'DataController@tanggalLibur',
    '/privacy/dokter' => 'PrivacyController@PrivacyDokter',
    '/privacy/pasien' => 'PrivacyController@PrivacyPasien',
    '/terms/dokter' => 'PrivacyController@DokterTerms',
    '/terms/pasien' => 'PrivacyController@PasienTerms',
    '/delete-dokter' => 'DeleteController@deleteDokter',
    '/delete-pasien' => 'DeleteController@deletePasien',
];

return $routes;