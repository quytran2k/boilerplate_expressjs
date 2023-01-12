import { User } from '../../../entities/User.entity';
import { ApiError } from '../../../utils/ApiError';

export default async function checkUserExist({ email = '' }) {
  try {
    return await User.findOneBy({
      email,
    });
  } catch (err) {
    throw new ApiError(`Don't found user with email ${email}`, 'Not found user', 404);
  }
}
