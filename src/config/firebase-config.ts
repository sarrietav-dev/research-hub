import { Auth, getAuth, connectAuthEmulator } from 'firebase/auth';
import {
  FirebaseStorage,
  getStorage,
  connectStorageEmulator,
} from 'firebase/storage';
import { environment } from 'src/environments/environment';

export function connectAuth(): Auth {
  const auth = getAuth();

  if (!environment.production)
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });

  return auth;
}

export function connectStorage(): FirebaseStorage {
  const storage = getStorage();

  if (!environment.production)
    connectStorageEmulator(storage, 'localhost', 9199);

  return storage;
}
