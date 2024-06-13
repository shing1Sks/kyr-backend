import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Configure CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.CORS_ORIGIN === "*" || !origin) {
      callback(null, true);
    } else {
      callback(null, process.env.CORS_ORIGIN.split(",").includes(origin));
    }
  },
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Additional OPTIONS preflight requests for all routes
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import section - 1
import userRoutes from "./routes/user.routes.js";
import roadRoutes from "./routes/road.routes.js";

//routes declaration section - 2
app.use("/api/user", userRoutes);
app.use("/api/roads", roadRoutes);

export default app;
