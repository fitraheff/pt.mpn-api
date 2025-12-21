import fs from "fs";
import path from "path";
import { validate } from "../validations/validation.js";
import {
    getTestimonyByIdValidation,
    addTestimonyValidation,
    updateTestimonyValidation
} from "../validations/testimoni-validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const add = async (req, userId) => {
    const testimoni = validate(addTestimonyValidation, req.body)
    const foto = req.file.filename;

    const countTestimony = await prisma.testimoni.count({
        where: {
            nama: testimoni.nama
        }
    });

    if (countTestimony === 1) {
        throw new ResponseError(400, "testimony already exists");
    }

    return await prisma.testimoni.create({
        data: {
            nama: testimoni.nama,
            pesan_testi: testimoni.pesan_testi,
            foto,
            userId: userId
        }
    })

};

const getAll = async () => {
    return await prisma.testimoni.findMany({
        select: {
            id: true,
            nama: true,
            foto: true,
            pesan_testi: true
        }
    })
}

const getById = async (id) => {
    id = validate(getTestimonyByIdValidation, id);

    const testimoni = await prisma.testimoni.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            nama: true,
            foto: true,
            pesan_testi: true
        }
    })

    if (!testimoni) {
        throw new ResponseError(404, "Testimoni tidak ditemukan")
    }

    return testimoni;

}

const put = async (req) => {

    const { id } = req.params;
    const testimoni = validate(updateTestimonyValidation, req.body);
    const oldData = await prisma.testimoni.findUnique({
        where: { id: String(id) }
    })

    if (!oldData) {
        throw new ResponseError(400, "Testimoni not found")
    }

    let newFoto = oldData.foto;

    if (req.file) {
        const oldPath = path.join("uploads", oldData.foto)

        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
        }

        newFoto = req.file.filename;
    }

    return await prisma.testimoni.update({
        where: { id: String(id) },
        data: {
            nama: testimoni.nama ?? oldData.nama,
            pesan: testimoni.pesan ?? oldData.pesan,
            foto: newFoto
        }
    });
}

const del = async (req) => {
    const { id } = req.params;
    const oldData = await prisma.testimoni.findUnique({
        where: { id: String(id) }
    })

    if (!oldData) {
        throw new ResponseError(400, "Testimoni not found")
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

    return await prisma.testimoni.delete({
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
