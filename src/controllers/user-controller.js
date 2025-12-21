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
        const result = await userService.login(req.body, res);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await userService.getById(userId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await userService.getAll();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await userService.update(req.body, req.user.id || req.params.id);
        res.status(200).json({
<<<<<<< HEAD
            message: "Profile berhasil diperbarui",
=======
            message: "User berhasil diperbarui",
>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
            data: result
        });
    } catch (e) {
        next(e);
    }
}

<<<<<<< HEAD
=======
const remove = async (req, res, next) => {
    try {
        await userService.remove(req.params.id);
        res.status(200).json({
            message: "User berhasil dihapus",
        });
    } catch (e) {
        next(e);
    }
}

>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
// kalau pake localStorage
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

// pake http-only cookie
const logout = async (req, res, next) => {
    try {
        const result = await userService.logout(res);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};


export default {
    add,
    login,
    getById,
    getAll,
    update,
<<<<<<< HEAD
=======
    remove,
>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
    logout
}