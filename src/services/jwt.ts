import JWT from 'jsonwebtoken';
const JWT_SECRET="$suoper$secret@123789852456"
import { User } from '@prisma/client';
import { JWTUser } from '../interfaces';

class JWTService{
    public static async genrateJWTtoken(user:User) {
        const payload:JWTUser = {
            id : user?.id,
            email : user?.email
        }
        const token = JWT.sign(payload, JWT_SECRET);
        return token;
    }

    public static decodeToken(token:string){
        try {
            return JWT.verify(token, JWT_SECRET) as JWTUser;
        } catch (error) {
            return null
        }
    }
};

export default JWTService;
