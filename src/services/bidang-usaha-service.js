import { prisma } from '../application/database.js';

export const getAllBU = async () => {
    return await prisma.Bidang_Usaha.findMany();
};

export const getBUById = async (id) => {
    return await prisma.Bidang_Usaha.findUnique({
        where: { id_BUsaha: id }
    });
};

export const createBU = async (data) => {
    return await prisma.Bidang_Usaha.create({
        data
    });
};

export const updateBU = async (id, data) => {
    return await prisma.Bidang_Usaha.update({
        where: { id_BUsaha: id },
        data
    });
};

export const deleteBU = async (id) => {
    return await prisma.Bidang_Usaha.delete({
        where: { id_BUsaha: id }
    });
};
