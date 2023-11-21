import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO, RegisterUserDTO } from './auth.dto';
import { CommonService } from '../common/common.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private commonService;
    constructor(userService: UserService, jwtService: JwtService, commonService: CommonService);
    login({ email, password }: LoginUserDTO): Promise<{
        user: Omit<{
            name: string;
            username: string;
            email: string;
            password: string;
            id: string;
            created: Date;
            updated: Date;
        }, "password">;
        accessToken: string;
    }>;
    register(user: RegisterUserDTO): Promise<Omit<{
        name: string;
        username: string;
        email: string;
        password: string;
        id: string;
        created: Date;
        updated: Date;
    }, "password">>;
}
