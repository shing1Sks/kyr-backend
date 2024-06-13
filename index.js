import main from "./op-db/index.js";
import { configDotenv } from "dotenv";

configDotenv({ path: "./.env" });

main();