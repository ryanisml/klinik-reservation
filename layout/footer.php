        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true" id="passwordModalCenter">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form id="form-password">
                        <div class="modal-header">
                            <h5 class="modal-title">Tambah Antrian</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="modalemail">Email</label>
                                <input type="text" class="form-control" name="email_auth" id="email_auth" readonly
                                       autocomplete="username">
                            </div>
                            <!--                         <div class="form-group">
                                                        <label for="oldpass">Password Lama</label>
                                                        <div class="input-group">
                                                            <input type="password" class="form-control" id="oldpass" name="oldpass">
                                                            <div class="input-group-append">
                                                                <span class="input-group-text"><i class="span_old fa fa-eye-slash" onclick="show_old_pass()"></i></span>
                                                            </div>
                                                        </div>
                                                        <div id="error_old_pass"></div>
                                                    </div> -->
                            <div class="form-group">
                                <label for="newpass">Password Baru</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="newpass" name="newpass"
                                           autocomplete="new-password">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="span_new fa fa-eye-slash"
                                                                          onclick="show_new_pass()"></i></span>
                                    </div>
                                </div>
                                <div id="error_new_pass"></div>
                            </div>
                            <div class="form-group">
                                <label for="newpasscek">KonfirmasiPassword Baru</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="newpasscek" name="newpasscek"
                                           autocomplete="new-password">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="span_new_cek fa fa-eye-slash"
                                                                          onclick="show_new_pass_cek()"></i></span>
                                    </div>
                                </div>
                                <div id="error_new_pass_cek"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="save_pass_change" class="btn btn-primary">Simpan</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <input type="hidden" id="inisialuser">
        <input type="hidden" id="ipuser" value="<?= $ipaddress ?>">
        <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid">
                <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">Copyright &copy; <?= $copyright ?></div>
                </div>
            </div>
        </footer>
    </div>
</div>
<script src="<?= $asset ?>assets/jquery/jquery-3.5.1.min.js"></script>
<script src="<?= $asset ?>assets/jquery/jquery-ui.min.js"></script>
<script src="<?= $asset ?>js/scripts.js"></script>
<script src="<?= $asset ?>assets/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<?= $asset ?>assets/dataTables/jquery.dataTables.min.js"></script>
<script src="<?= $asset ?>assets/dataTables/dataTables.bootstrap4.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<?php
if (isset($jsfile)) {
    foreach ($jsfile as $row) {
        echo '<script src="' . $row . '"></script>' . "\r\n";
    }
}
?>
</body>
</html>