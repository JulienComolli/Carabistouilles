import sqlite from "sqlite3";
import { DBNAME } from "./config/public-config.js";

const db = new sqlite.Database(`./db/${DBNAME}`);


console.log("Hello Carabistouilles.");
