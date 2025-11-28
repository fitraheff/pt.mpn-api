import userService from "../services/user-service.js";

const add = async (req, res, next) => {
    try {
        const result = await userService.add(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

// const get = async (req, res, next) => {
//     try {
//         const username = req.user.username;
//         const result = await userService.get(username);
//         res.status(200).json({
//             data: result
//         });
//     } catch (e) {
//         next(e);
//     }
// }

const update = async (req, res, next) => {
    try {
        const result = await userService.update(req.body, req.user.id || req.params.id);
        res.status(200).json({
            message: "Profile berhasil diperbarui",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

// const logout = async (req, res, next) => {
//     try {
//         await userService.logout(req.user.username);
//         res.status(200).json({
//             data: "OK"
//         });
//     } catch (e) {
//         next(e);
//     }
// }

export default {
    add,
    login,
    // get,
    update,
    // logout
}