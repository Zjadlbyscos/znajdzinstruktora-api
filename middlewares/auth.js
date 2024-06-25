import passport from "passport";

export const auth = (req, res, next) => {
  // Middleware unauthorized error
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        code: 401,
        status: `error`,
        message: "Token is invalid",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
