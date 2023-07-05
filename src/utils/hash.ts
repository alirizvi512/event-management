import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function generateSalt(password: string) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed = bcrypt.hash(password, salt);
    return hashed;
}

export async function verifyHash(password: string, hashedPassword: string) {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}