<div class="row">
    <div class="col-md-12">
        <h1 class="mb-4">Hapus Data Dokter</h1>

        <div id="message"></div>

        <div class="alert alert-info alert-dismissible fade show" role="alert">
            <strong>Konfirmasi!</strong><br/>Mohon untuk mengisikan nama dan nomor ktp yang anda daftarkan. Jika data anda benar, kami akan menghapus data anda secepatnya.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form action="#" method="post" autocomplete="off" id="form-deletion">
            <div class="form-group">
                <label for="noktp">Nomor KTP</label>
                <input type="text" class="form-control" id="noktp" placeholder="Masukkan Nomor KTP">
                <small id="noktpHelp" class="form-text text-muted">We'll never share your ktp number with anyone else.</small>
                <div id="error-noktp"></div>
            </div>
            <div class="form-group">
                <label for="nama">Nama Dokter</label>
                <input type="text" class="form-control" id="nama" placeholder="Masukkan Nama Dokter">
                <div id="error-nama"></div>
            </div>
            <div class="form-check text-right mt-3 mb-3">
                <input type="checkbox" class="form-check-input" value="1" id="checklist">
                <label class="form-check-label" for="checklist">Confirmation Of Deletion</label>
                <div id="error-confirmation"></div>
            </div>
            <button type="button" class="btn btn-primary" id="btn-delete">Submit Request</button>
        </form>
    </div>
</div>