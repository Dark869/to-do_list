import crypto from 'crypto';

export const generateSalt = () => crypto.randomBytes(16).toString('hex');

export const hashPasswd = (passwd, salt) => {

    const hash = crypto
                    .createHmac('sha512', salt)
                    .update(passwd)
                    .digest('hex');
    
    return hash;
};
