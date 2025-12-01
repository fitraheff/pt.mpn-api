import testimonyService from "../services/testimoni-service.js"

const add = async (req, res, next) => {
    try {
        const result = await testimonyService.add(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    add
}