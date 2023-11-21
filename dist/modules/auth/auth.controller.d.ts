import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './auth.dto';
import { FastifyReply } from 'fastify';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: LoginUserDTO, res: FastifyReply): Promise<void>;
    register(user: RegisterUserDTO): Promise<{
        data: unknown;
        message: string;
        status: number;
        success: boolean;
    }>;
    logout(res: FastifyReply): void;
}
