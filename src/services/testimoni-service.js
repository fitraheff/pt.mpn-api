import { validate } from "../validations/validation.js";
import {
    //getTestimonyByIdValidation,
    addTestimonyValidation,
    updateTestimonyValidation,
    deleteTestimonyValidation
} from "../validations/testimoni-validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const add = async (req) => {
    const testimoni = validate(addTestimonyValidation, req.body)
    const foto = `/uploads/${req.file.filename}`;

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
            foto
        }
    })

}

export default {
    add
}