import { verifyToken } from '../utils/jwt.js';
import { prisma } from '../application/database.js'
import { ResponseError } from '../error/response-error.js';

export const authMiddleware = async (req, res, next) => {
    try {
        // kalau pake localStorage
        // const authHeader = req.headers.authorization;
        // if (!authHeader?.startsWith('Bearer ')) {
        //     return res.status(401).json({ errors: 'Access token required' });
        // }

        // const token = authHeader.split(' ')[1];

        // pake http-only cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: "Access token required" });
        }

        const decoded = verifyToken(token);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true, role: true },
        });

        if (!user) {
            return res.status(401).json({ errors: 'Invalid token: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Access token expired" });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        next(error);
    }
};

// Middleware untuk SUPERADMIN-only
export const authSuperadminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'SUPERADMIN') {
        return next(new ResponseError(403, "Forbidden"));
    }
    next();
};

