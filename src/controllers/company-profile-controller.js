import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'company.json');

export const getProfile = (req, res) => {
    const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(json);
};

export const updateProfile = (req, res) => {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ message: 'Company profile updated successfully' });
};