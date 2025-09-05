import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { Request } from 'express';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    constructor(private firebaseAdmin: FirebaseAdminService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid token');
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = await this.firebaseAdmin.verifyToken(token);
            if (!decoded.role || !decoded.tenantId) {
                throw new UnauthorizedException('Token is missing role or tenantId');
            }

            request['user'] = decoded;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
