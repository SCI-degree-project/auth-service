import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
import serviceAccount from '../config/firebase-service-account.json';
@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    }
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return await admin.auth().verifyIdToken(idToken);
  }

  async setCustomUserClaims(uid: string, claims: { [key: string]: any }) {
    return await admin.auth().setCustomUserClaims(uid, claims);
  }

  async getUser(uid: string) {
    return await admin.auth().getUser(uid);
  }

  async createUser(email: string, password: string) {
  return await admin.auth().createUser({ email, password });
}

}
