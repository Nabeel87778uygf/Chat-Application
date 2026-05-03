import { Resend } from "resend";
import { ENV } from './env.js'

// dotenv.config();

export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sender = {
    name: process.env.EMAIL_FROM_NAME,
    email: process.env.EMAIL_FROM,
};