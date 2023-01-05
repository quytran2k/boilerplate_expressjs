import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { userRepository } from '../api/v1/User/user.repository';
import { config } from '../configs/core/config';
import { comparePassword } from './encryption';

export const applyPassportStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.passport.secret }, async (payload, done) => {
      try {
        const user = await userRepository.findOne({ where: { email: payload.email } });
        if (!user) {
          return done(undefined, false, { message: `username ${user} not found.` });
        }
        const res = await comparePassword(payload.password, user.password || '');
        if (res) return done(undefined, user);
        return done(undefined, false, { message: 'Incorrect password.' });
      } catch (err) {
        return done(err);
      }
    }),
  );
};
