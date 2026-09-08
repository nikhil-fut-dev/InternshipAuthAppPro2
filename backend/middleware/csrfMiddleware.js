import { doubleCsrf } from "csrf-csrf";

const isProduction = process.env.NODE_ENV === "production";

const { invalidCsrfTokenError, generateCsrfToken, doubleCsrfProtection } =
  doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET,

    getSessionIdentifier: (req) => req.ip,

    cookieName: "csrfToken",

    cookieOptions: {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    },

    size: 32,

    ignoredMethods: ["GET", "HEAD", "OPTIONS"],

    getCsrfTokenFromRequest: (req) => req.headers["x-csrf-token"],
  });

export { invalidCsrfTokenError, generateCsrfToken, doubleCsrfProtection };
