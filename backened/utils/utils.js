import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured in environment variables");
    }


    // Create JWT token
    const token = jwt.sign(
        { userId },        // payload
        JWT_SECRET,        // secret key
        { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,                  // JS access block (XSS protection)
        sameSite: "strict",              // CSRF protection
        secure: process.env.NODE_ENV === "production" // only HTTPS in production
    });

    return token;
};

//http://localhost
//https://dsmakmk.com