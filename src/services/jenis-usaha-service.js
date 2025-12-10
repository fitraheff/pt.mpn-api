import fs from "fs";
import path from "path";
import { validate } from "../validations/validation.js";
import {
    createJenisUsahaValidation,
    updateJenisUsahaValidation,
    getJenisUsahaByIdValidation

} from "../validations/jenis-usaha-validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const add = async (req, bidangUsahaId) => {
    const jenis_usaha = validate(createJenisUsahaValidation, req.body);
    const foto = req.file.filename;

    const countJenisUsaha = await prisma.jenis_Usaha.count({
        where: {
            nama_jenis: jenis_usaha.nama_jenis
        }
    });

    if (countJenisUsaha === 1) {
        throw new ResponseError(400, "Jenis usaha sudah ada");
    }

    return await prisma.jenis_Usaha.create({
        data: {
            nama_jenis: jenis_usaha.nama_jenis,
            deskripsi: jenis_usaha.deskripsi,
            foto: foto,
            bidangUsahaId: bidangUsahaId,
        }
    })
};

const getAll = async () => {
    return await prisma.jenis_Usaha.findMany({
        include: {
            bidang_usaha: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

const getById = async (id) => {
    id = validate(getJenisUsahaByIdValidation, id);

    const jenisUsaha = await prisma.jenis_Usaha.findUnique({
        where: {
            id
        },
        include: {
            bidang_usaha: true
        }
    })

    if (!jenisUsaha) {
        throw new ResponseError(404, "Jenis usaha tidak ditemukan")
    }

    return jenisUsaha;
}

const put = async (req) => {

    const { id } = req.params;
    const jenisUsaha = validate(updateJenisUsahaValidation, req.body);
    const oldData = await prisma.jenis_Usaha.findUnique({
        where: { id: String(id) }
    })

    if (!oldData) {
        throw new ResponseError(400, "Jenis usaha not found")
    }

    let newFoto = oldData.foto;

    if (req.file) {
        const oldPath = path.join("uploads", oldData.foto)

        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
        }

        newFoto = req.file.filename;
    }

    return await prisma.jenis_Usaha.update({
        where: { id: String(id) },
        data: {
            nama_jenis: jenisUsaha.nama_jenis ?? oldData.nama_jenis,
            deskripsi: jenisUsaha.deskripsi ?? oldData.deskripsi,
            foto: newFoto,
            bidangUsahaId: jenisUsaha.bidangUsahaId ?? oldData.bidangUsahaId,
        }
    });
}

const del = async (req) => {
    const { id } = req.params;
    const oldData = await prisma.jenis_Usaha.findUnique({
        where: { id: String(id) }
    })

    if (!oldData) {
        throw new ResponseError(400, "Jenis usaha not found")
    }

    if (oldData.foto) {
        const fotoPath = path.join("uploads", oldData.foto);
        // console.log("deleting file:", fotoPath)
        // console.log("Exist?:", fs.existsSync(fotoPath))

        if (fs.existsSync(fotoPath)) {
            fs.unlinkSync(fotoPath);

            // console.log("deleted")
        } else {
            console.log("File not found, cannot delete")
        }
    }

    return await prisma.jenis_Usaha.delete({
        where: { id: String(id) }
    });
}

export default {
    add,
    getAll,
    getById,
    put,
    del
}