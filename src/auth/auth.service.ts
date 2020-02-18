import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){

    }
    signUp(authCredentials:AuthCredentialsDto){
        return this.userRepository.signUp(authCredentials);
    }

    async signIn(authCredentials:AuthCredentialsDto){
        const username =  await this.userRepository.validateUserPassword(authCredentials);

        if(!username){
            throw new UnauthorizedException("Invalid Credentials");
        }
    }
}
