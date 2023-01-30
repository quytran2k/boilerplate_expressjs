import jwt from 'jsonwebtoken';

export const signAccessToken = async (email: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      email,
    };
    const secret = process.env.ACCESS_TOKEN_JWT_SECRET || '';
    const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const signRefreshToken = async (email: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      email,
    };
    const secret = process.env.REFRESH_TOKEN_JWT_SECRET || '';
    const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const verifyRefreshToken = async (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET || '', (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};
