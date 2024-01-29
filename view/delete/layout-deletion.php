<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title><?= base_url ?> - My Klinik</title>
        <link rel="icon" href="assets/img/icon.png">
        <link href="<?= base_url ?>assets/css/styles.css" rel="stylesheet" />
        <link href="<?= base_url ?>assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <script src="<?= base_url ?>assets/js/all.min.js" crossorigin="anonymous"></script>
        <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-analytics.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-firestore.js"></script>
    </head>
    <body>
        <div class="container mt-5">
            <?php require_once $view; ?>
        </div>
        <script src="<?= base_url ?>assets/jquery/jquery-3.5.1.min.js"></script>
        <script src="<?= base_url ?>assets/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="<?= base_url ?>assets/script/firebase-script.js"></script>
        <script>
            const base_url = '<?= base_url ?>';
            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            var firebaseConfig = {
                apiKey: apiKey,
                authDomain: authDomain,
                databaseURL: databaseURL,
                projectId: projectId,
                storageBucket: storageBucket,
                messagingSenderId: messagingSenderId,
                appId: appId,
                measurementId: measurementId
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
        </script>
        <?php if (isset($script)): ?>
        <script src="<?= base_url ?>assets/script/<?= $script ?>"></script>
        <?php endif; ?>
    </body>
</html>
