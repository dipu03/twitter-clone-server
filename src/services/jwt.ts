import JWT from 'jsonwebtoken';
const JWT_SECRET="$suoper$secret@123789852456"
import { User } from '@prisma/client';

class JWTService{
    public static async genrateJWTtoken(user:User) {
        const payload = {
            id : user?.id,
            email : user?.email
        }
        const token = JWT.sign(payload, JWT_SECRET);
        return token;
    }
};

export default JWTService;
