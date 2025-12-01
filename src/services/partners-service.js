import { validate } from "../validations/validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

import { 
    createPartnerValidation,
    getPartnerByIdValidation,
    updatePartnerValidation
 } from "../validations/partners-validation.js";
import { request } from "express";

//  CREATE PARTNER
 const create = async (request) => {
    // Validasi text
    const partnerData = validate(createPartnerValidation, {
        nama_partner: request.nama_partner,
        deskripsi: request.deskripsi,
    });

    // Logo wajib ditangani dari middleware
    if (!request.logo) {
        throw new ResponseError(400, "Logo wajib diisi");
    }

    return prisma.partners.create({
        data: {
            ...partnerData,
            logo: request.logo // biasanya filename atau URL CDN
        },
        select: {
            id: true,
            nama_partner: true,
            deskripsi: true,
            logo: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

// GET ALL
const getAll = async () => {
    return prisma.partners.findMany({
        select: {
            id: true,
            nama_partner: true,
            deskripsi: true,
            logo: true,
            createdAt: true,
            updatedAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

// GET BY ID
const getById = async (id) => {
    id = validate(getPartnerByIdValidation, id);

    const partner = await prisma.partners.findUnique({
        where: { id },
        select: {
            id: true,
            nama_partner: true,
            deskripsi: true,
            logo: true,
            createdAt: true,
            updatedAt: true
        }
    });
    
    if (!partner) {
        throw new ResponseError(404, "Partner not found");
    }

    return partner;
};

// UPDATE PARTNER
const update = async (request) => {
    // Validasi text yang dikirm
    const partnerData = validate(updatePartnerValidation, {
        nama_partner: request.nama_partner,
        deskripsi: request.deskripsi,
    });

    // validasi ID
    const partnerID = validate(getPartnerByIdValidation, request.id);

    // Cek apakah partner ada?
    const existingPartner = await prisma.partners.findUnique({
        where: { id: partnerID },
    });

    if (!existingPartner) {
        throw new ResponseError(404, "Partner not found");
    }

    // Siapkan data update
    const data = {};
    if (partnerData.nama_partner !== undefined) {
        data.nama_partner = partnerData.nama_partner;
    }

    if (partnerData.deskripsi !== undefined) {
        data.deskripsi = partnerData.deskripsi;
    }   

    if (request.logo) {
        data.logo = request.logo;
    }

    return prisma.partners.update({
        where: { id: partnerID },
        data,
        select: {
            id: true,
            nama_partner: true,
            deskripsi: true,
            logo: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

// DELETE PARTNER
const remove = async (id) => {
    id = validate(getPartnerByIdValidation, id);

    const partner = await prisma.partners.findUnique({
        where: { id },
    });

    if (!partner) {
        throw new ResponseError(404, "Partner not found");
    }

    await prisma.partners.delete({
        where: {id},
    });

    return {
        message: "Partner deleted successfully", id
    }
};

export default {
    create,
    getAll,
    getById,
    update,
    remove
};