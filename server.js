import { app } from "./app.js";
import { connectToDatabase } from "./utils/connection.js";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, PORT_SERVER = 3001 } = process.env;

const runServer = async () => {
  try {
    await connectToDatabase(DB_HOST);
    console.log(`Database connection successful`);

    app.listen(PORT_SERVER, () => {
      console.log(`Server running. Listening on port: ${PORT_SERVER}`);
      console.log(
        `
      This is a simple CRUD API application made with Express and documented with Swagger.

      Docs available at http://localhost:${PORT_SERVER}/api-docs

      API command list:
      
      Developer server: ===> http://localhost:${PORT_SERVER}/api

      /auth
         @POST /register - registration user
         @POST /login - login user 
         @GET /current - current user (requirement: auth token bearer)
         @POST /logout - logout user (requirement: auth token bearer)
         @POST /change-password - change password (requirement: auth token bearer)
         @POST /request-reset-password - request password reset
         @POST /reset-password - reset password
         @POST /activate - verify email

      /instructors
          @GET / - get all instructors
          @GET /:id - get instructor by id
          @POST /:id - create instructor info
      `
      );
    });
  } catch (err) {
    console.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

runServer();
