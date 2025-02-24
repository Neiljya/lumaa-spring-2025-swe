import { User } from '../../shared/schemas/UserSchema';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }

    }
}

export { };