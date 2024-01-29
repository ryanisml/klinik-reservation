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
    </head>
    <body>
        <div class="container">
            <?php require_once $view; ?>
        </div>
        <script src="assets/jquery/jquery-3.5.1.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.bundle.min.js"></script>
        <?php if (isset($script)): ?>
        <script src="<?= base_url ?>assets/js/<?= $script ?>"></script>
        <?php endif; ?>
    </body>
</html>
