// Node Modules Imports
import Database from "better-sqlite3";
import fs from "fs";

// Custom Imports
import { DBNAME } from "./config/public-config.js";

// Init DB
const DB = new Database(`./db/${DBNAME}`);


console.log("Hello Carabistouilles.");


/* EXAMPLES D'USAGE DE LA BASE DE DONNEES */
DB.exec(fs.readFileSync('./db/scripts/clearDb.sql', 'utf-8'));
DB.exec(fs.readFileSync('./db/scripts/createDb.sql', 'utf-8'));
DB.exec(fs.readFileSync('./db/scripts/populateDb.sql', 'utf-8'));

console.log(DB.prepare('SELECT * FROM Users').all()); // Retourne un tableau
console.log(DB.prepare('SELECT * FROM Games').get()); // Retourne la première valeur
