// middlewares/global-rate-limiter.js

import rateLimit from "express-rate-limit";

// Middleware pembatasan request untuk SELURUH route
export const RateLimiter = rateLimit({
    // windowMs = jangka waktu perhitungan (dalam milidetik)
    // contoh: 60 * 1000 = 1 menit
    windowMs: Number(process.env.RATE_WINDOW_MS) || 60 * 1000,

    // max = berapa banyak request yang diizinkan dalam windowMs
    max: Number(process.env.RATE_LIMIT) || 100,

    // Pesan error ketika limit terlampaui
    message: {
        status: 429,
        message: "Terlalu banyak request dari IP ini. Coba lagi nanti."
    },

    // Kirim header standar seperti RateLimit-Remaining, RateLimit-Reset
    standardHeaders: true,

    // Nonaktifkan header lama X-RateLimit-*
    legacyHeaders: false,
});
