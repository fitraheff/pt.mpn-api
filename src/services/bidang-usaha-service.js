import { prisma } from '../application/database.js';

export const getAllBU = async () => {
    return await prisma.bidang_Usaha.findMany();
};

export const getBUById = async (id) => {
    return await prisma.bidang_Usaha.findUnique({
        where: { id_BUsaha: id }
    });
};

export const createBU = async (data) => {
    return await prisma.bidang_Usaha.create({
        data
    });
};

export const countBUName = async (nama) => {
    return await prisma.bidang_Usaha.count({
        where: {
            nama_BUsaha: {
                equals: nama,
                mode: 'insensitive'
            }
        }
    });
};

export const updateBU = async (id, data) => {
    return await prisma.bidang_Usaha.update({
        where: { id_BUsaha: id },
        data: {
            nama_BUsaha: data.nama_BUsaha,
            deskripsi: data.deskripsi,
            poto: data.poto
        }
    });
};

export const deleteBU = async (id) => {
    return await prisma.bidang_Usaha.delete({
        where: { id_BUsaha: id }
    });
};