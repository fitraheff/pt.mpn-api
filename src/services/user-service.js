import { validate } from "../validations/validation.js";
import {
    // getUserValidation,
    loginUserValidation,
    addUserValidation,
    updateUserValidation
} from "../validations/user-validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { generateToken as generateAccessToken } from "../utils/jwt.js";

const add = async (request) => {
    const user = validate(addUserValidation, request);

    const countUser = await prisma.user.count({
        where: {
            // username: user.username
            email: user.email
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "email already exists");
    }

    const password = "123456"; // default password

    user.password = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
            jabatan: user.jabatan,
            telp: user.telp,
            profile: user.profile || null,
            role: 'ADMIN', 
        },
        select: {
            id: true,
            name: true,
            email: true,
            jabatan: true,
            telp: true,
            role: true,
            profile: true,
        },
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prisma.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true
        }
    });


    if (!user || !(await bcrypt.compare(loginRequest.password, user.password))) {
        return next(new ResponseError(401, 'Invalid email or password'));
    }

    const token = generateAccessToken({
        userId: user.id,
        role: user.role,
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}

// const get = async (username) => {
//     username = validate(getUserValidation, username);

//     const user = await prismaClient.user.findUnique({
//         where: {
//             username: username
//         },
//         select: {
//             username: true,
//             name: true
//         }
//     });

//     if (!user) {
//         throw new ResponseError(404, "user is not found");
//     }

//     return user;
// }

const update = async (req, userId) => {
    const user = validate(updateUserValidation, req);

    const totalUserInDatabase = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!totalUserInDatabase) {
        throw new ResponseError(404, "user is not found");
    }

    const data = {};

    if (user.name) data.name = user.name;
    if (user.email) data.email = user.email;
    if (user.telp !== undefined) data.telp = user.telp;
    if (user.profile !== undefined) data.profile = user.profile || null;

    if (user.password) {
        data.password = await bcrypt.compare(user.currentPassword, totalUserInDatabase.password);
        if (!data.password) {
            throw new ResponseError(400, "current password is incorrect");
        }
        data.password = await bcrypt.hash(user.password, 12);
    }

    return prisma.user.update({
        where: {
            id: userId
        },
        data: data,
        select: {
            id: true,
            name: true,
            email: true,
            telp: true,
            profile: true,
            updatedAt: true,
        }
    })
}

// const logout = async (username) => {
//     username = validate(getUserValidation, username);

//     const user = await prismaClient.user.findUnique({
//         where: {
//             username: username
//         }
//     });

//     if (!user) {
//         throw new ResponseError(404, "user is not found");
//     }

//     return prismaClient.user.update({
//         where: {
//             username: username
//         },
//         data: {
//             token: null
//         },
//         select: {
//             username: true
//         }
//     })
// }

export default {
    add,
    login,
    // get,
    update,
    // logout
}