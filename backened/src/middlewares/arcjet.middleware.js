import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetMiddleware = async (req, res, next) => {
    try {
        // 1. Arcjet protection check
        const decision = await aj.protect(req);
        console.log("Arcjet decision:", decision);

        // 2. Handle denied requests
        if (decision.isDenied()) {

            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    success: false,
                    message: "Rate limit exceeded. Please try again later."
                });
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({
                    success: false,
                    message: "Bot access denied"
                });
            }

            return res.status(403).json({
                success: false,
                message: "Access denied by Arcjet security policy"
            });
        }

        // 3. Extra spoofed bot detection
        const spoofed = await isSpoofedBot(req);

        if (spoofed?.isSpoofed) {
            return res.status(403).json({
                success: false,
                message: "Spoofed bot access denied"
            });
        }

        // 4. Allow request
        next();

    } catch (error) {
        console.error("Arcjet middleware error:", error);

        return res.status(500).json({
            success: false,
            message: "Security middleware error"
        });
    }
};