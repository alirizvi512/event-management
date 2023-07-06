export async function codeGenerator() {
    const codeLength = 6;
    const characters = '0123456789';
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}