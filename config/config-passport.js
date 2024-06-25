import passport from "passport";
import passportJWT from "passport-jwt";
import { User } from "../schemas/user.schema.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET_KEY;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("Token is invalid"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);
