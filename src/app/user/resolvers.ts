import axios from 'axios';
import { prismaClient } from '../../client/db';
import JWTService from '../../services/jwt';
import { GraphqlContext } from '../../interfaces';


interface GoogleTokenResult {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified?: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
};
  

const queries = {
    verifyGoogleToken : async(parent : any, {token}:{token:string}) => {
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.set('id_token', googleToken);

        const {data} = await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {responseType : 'json'});
        let  user = await prismaClient.user.findUnique({where : {email : data.email}});
        
        if(!user){
            user = await prismaClient.user.create({
                data : {
                    email : data.email,
                    firstName : data.given_name,
                    lastName : data.family_name,
                    profileImageURL : data.picture,
                    
                }
            })
            
        };
        if(!user){
            throw new Error('Failed To Find User In Db !!');
        };
        const userJWTtoken = await JWTService.genrateJWTtoken(user);
        return userJWTtoken;
    },

    getCurrentUser : async (parent:any, args:any, ctx:GraphqlContext) => {
        console.log("ctx : ", ctx)
        const id = ctx.user?.id;
        if(!id) return null
        const user = await prismaClient.user.findUnique({where : {id}});
        return user
    }
};

export const resolvers = {queries};