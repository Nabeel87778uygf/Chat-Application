import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId },      // payload
        process.env.JWT_SECRET,    // secret key
        { expiresIn: "7d" }        // options
    );

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (ms)
        httpOnly: true,                  // prevent XSS attacks
        // secure: process.env.NODE_ENV === "production", // https only in prod
        sameSite: "strict",               // CSRF protection
        secure: process.env.NODE_ENV === "development" ? false : true
    });

    return token
};

//http://localhost
//https://dsmakmk.com