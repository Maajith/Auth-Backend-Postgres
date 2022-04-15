const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants/index");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

//importing passport middleware, only allowing user who has the token to the protected route. when we logOut - cookies will be cleared and we automatically redirected to login page.
require('./middlewares/passportMiddleware')

// In order to accept JSON in Body: 
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// Routes
app.use("/api/v1", authRoutes);

// Starting the app
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on the port ${PORT}`); 
        })
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}
appStart();