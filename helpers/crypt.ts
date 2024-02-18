import CryptoJS from 'crypto-js';

export const encryptToken = (token:string) => {
  if (!token) {
    console.error('cryptToken: cannot encrypt, token is empty');
    return '';
  }
  if (token.indexOf('enc_') === 0) return token;
  if (!process.env.CRYPTO_SECRET) {
    console.error(
      'cryptToken: cannot encrypt, encryptionPassphrase is empty, do not encrypt',
    );
    return token;
  }
  return `enc_${CryptoJS.AES.encrypt(
    token,
    process.env.CRYPTO_SECRET,
  ).toString()}`;
};

export const decryptToken = (encryptedToken:string) => {
  if (!encryptedToken) {
    console.error('cryptToken: cannot decrypt, encryptedToken is empty');
    return '';
  }
  if (encryptedToken.indexOf('enc_') !== 0) return encryptedToken;
  if (!process.env.CRYPTO_SECRET) {
    console.error('cryptToken: cannot decrypt, encryptionPassphrase is empty');
    return '';
  }

  let res;
  try {
    res = CryptoJS.AES.decrypt(
      encryptedToken.substr(4),
      process.env.CRYPTO_SECRET,
    ).toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error('cryptToken: failed', { encryptedToken, err });
    return '';
  }
  return res;
};
