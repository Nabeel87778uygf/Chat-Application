import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./EmailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        const { data, error } = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Welcome to Chatify!",
            html: createWelcomeEmailTemplate(name, clientURL),
        });

        if (error) {
            console.error("Email Error:", error);
            throw new Error("Email failed");
        }

        console.log(" Email sent:", data);
    } catch (err) {
        console.log(" Email failed:", err.message);
    }
};