import { NextFunction, Request, Response } from 'express';
import passport, { PassportStatic } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { userRepository } from '../api/v1/User/user.repository';
import { config } from '../configs/core/config';

export const applyPassportStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.passport.secret }, async (payload, done) => {
      try {
        const user = await userRepository.findOne({ where: { email: payload.email } });
        if (!user) {
          return done(undefined, false, { message: `username ${user} not found.` });
        }
        return done(null, {
          email: payload.email,
          userId: user.id,
        });
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};

export async function tokenCheck(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) return next(err);
    if (info) return res.status(401).json({ message: info.message });
    if (!user) return res.status(401).json({ message: 'You need to login' });

    req.user = user;
    next();
  })(req, res, next);
}
