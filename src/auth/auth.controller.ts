import {
    Controller,
    Post,
    Body,
    UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { UsersService } from 'src/user/users.service';
import { RegisterUserDto } from 'src/user/register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private firebaseAdmin: FirebaseAdminService,
        private usersService: UsersService,
    ) { }

    @Post('login')
    async login(@Body('idToken') idToken: string) {
        const decoded = await this.firebaseAdmin.verifyToken(idToken);

        if (!decoded.email || !decoded.role || !decoded.tenantId) {
            throw new UnauthorizedException('Token missing claims');
        }

        const user = await this.usersService.findOrCreateUserFromFirebase({
            firebaseUid: decoded.uid,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
            tenantId: decoded.tenantId,
        });

        return {
            message: 'Login successful',
            user,
        };
    }

    @Post('register')
    async register(@Body() dto: RegisterUserDto) {
        const { email, password, role, tenantId } = dto;

        const firebaseUser = await this.firebaseAdmin.createUser(email, password);

        await this.firebaseAdmin.setCustomUserClaims(firebaseUser.uid, {
            role,
            tenantId,
        });

        const user = await this.usersService.create({
            firebaseUid: firebaseUser.uid,
            email,
            name: dto.name || '',
            role,
            tenantId,
        });

        return { message: 'User created successfully', user };
    }

}
