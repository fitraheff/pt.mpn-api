import { validate } from "../validations/validation.js";
import {
    // getUserValidation,
    loginUserValidation,
    // registerUserValidation,
    // updateUserValidation
} from "../validations/user-validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
// import { v4 as uuid } from "uuid";

// const register = async (request) => {
//     const user = validate(registerUserValidation, request);

//     const countUser = await prismaClient.user.count({
//         where: {
//             username: user.username
//         }
//     });

//     if (countUser === 1) {
//         throw new ResponseError(400, "Username already exists");
//     }

//     user.password = await bcrypt.hash(user.password, 10);

//     return prismaClient.user.create({
//         data: user,
//         select: {
//             username: true,
//             name: true
//         }
//     });
// }

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prisma.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
            role: true
        }
    });


    if (!user || !(await bcrypt.compare(loginRequest.password, user.password))) {
        return next(new ResponseError(401, 'Invalid email or password'));
    }

    const accessToken = generateAccessToken({
        userId: user.id,
        role: user.role,
    });

    return {
        accessToken,
        user: {
            id: user.id,
            username: user.username,
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

// const update = async (request) => {
//     const user = validate(updateUserValidation, request);

//     const totalUserInDatabase = await prismaClient.user.count({
//         where: {
//             username: user.username
//         }
//     });

//     if (totalUserInDatabase !== 1) {
//         throw new ResponseError(404, "user is not found");
//     }

//     const data = {};
//     if (user.name) {
//         data.name = user.name;
//     }
//     if (user.password) {
//         data.password = await bcrypt.hash(user.password, 10);
//     }

//     return prismaClient.user.update({
//         where: {
//             username: user.username
//         },
//         data: data,
//         select: {
//             username: true,
//             name: true
//         }
//     })
// }

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
    // register,
    login,
    // get,
    // update,
    // logout
}