export const validationPsn = (body) => {
    const { name_pesan, email_pesan, pesan_isi, layanan_pesan } = body;

if (!name_pesan) {
    return 'Nama wajib diisi';
}
if (!pesan_isi) {
    return 'pesan wajib diisi';
}

if (!email_pesan) {
    return 'Email wajib diisi';
}
if (!layanan_pesan ) {
    return 'layanan wajib diisi';
}


return null;

};