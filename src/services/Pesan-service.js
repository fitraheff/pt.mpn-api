import {prisma} from '../application/database.js';

export const getAllPsn = async () => {
    return await prisma.pesan.findMany();
};

export const getPsnById = async (id) => {
    return await prisma.pesan.findUnique({
        where: { id_pesan: id }
    });
};

export const createPsn = async (data) => {
    return await prisma.pesan.create({
        data
    });
};

export const updatePsn = async (id, data) => {
    return await prisma.pesan.update({
        where: { id_pesan: id },
        data
    });
};

export const deletePsn = async (id) => {
    return await prisma.pesan.delete({
        where: { id_pesan: id }
    });
};