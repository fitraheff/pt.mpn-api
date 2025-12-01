export const validationBU = (body) => {
    const {nama_BUsaha } = body;

    if (!nama_BUsaha) {
        return 'ID dan Nama wajib diisi';
    }

    return null;
};
