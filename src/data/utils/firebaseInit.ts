import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_MESSAGING_SENDOR_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
  VITE_FIREBASE_DATABASE_URL,
  VITE_FIREBASE_VAPID_KEY,
} = import.meta.env;
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDOR_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export const getMessagingToken = async (): Promise<string> => {
  const token = await getToken(messaging, {
    vapidKey: VITE_FIREBASE_VAPID_KEY,
  });
  return token;
};

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
