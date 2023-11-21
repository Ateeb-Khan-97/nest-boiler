import { UserService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<{
        data: unknown;
        message: string;
        status: number;
        success: boolean;
    }>;
}
