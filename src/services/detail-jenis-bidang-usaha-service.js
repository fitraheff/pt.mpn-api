import { validate } from "../validations/validation.js";
import {
    createDetailJenisBidangUsahaValidation,
    getDetailJenisByIdValidation,
    updateDetailJenisValidation
} from "../validations/detail-jenis-bidang-usaha-validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const add = async (req) => {
    const detailJenis = validate(createDetailJenisBidangUsahaValidation, req);

    const countDetailJenis = await prisma.detail_JBU.count({
        where: {
            nama: detailJenis.nama
        }
    });

    if (countDetailJenis === 1) {
        throw new ResponseError(400, "detail jenis bidang usaha already exists");
    }

    return await prisma.detail_JBU.create({
        data: {
            nama: detailJenis.nama,
            // id_bidang_usaha: id
        },
        select: {
            id: true,
            nama: true,
            // id_bidang_usaha: true,
            createdAt: true
        }
    });
};

const getAll = async () => {
    return await prisma.detail_JBU.findMany({
        select: {
            id: true,
            nama: true,
            // id_bidang_usaha: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

const getById = async (id) => {
    id = validate(getDetailJenisByIdValidation, id);

    const detailJenis = await prisma.detail_JBU.findUnique({
        where: { id },
        select: {
            id: true,
            nama: true,
            // id_bidang_usaha: true,
            createdAt: true,
            updatedAt: true
        }
    });
    if (!detailJenis) {
        throw new ResponseError(404, "detail jenis bidang usaha not found");
    }

    return detailJenis;
};

const update = async (id, req) => {
    const detailJenis = validate(updateDetailJenisValidation, req);

    const existingDetailJenis = await prisma.detail_JBU.findUnique({
        where: { id }
    });

    if (!existingDetailJenis) {
        throw new ResponseError(404, "detail jenis bidang usaha not found");
    }

    return await prisma.detail_JBU.update({
        where: { id },
        data: {
            nama: detailJenis.nama,
            // id_bidang_usaha: detailJenis.id_bidang_usaha
        }
    });
};

const remove = async (id) => {
    return await prisma.detail_JBU.delete({
        where: { id }
    });
};

export default {
    add,
    getAll,
    getById,
    update,
    remove
};