import Database from 'better-sqlite3';
import fs from 'fs';

import { DBNAME } from '../config/publicConfig.js';

var DB;

// Init DB
if(!fs.existsSync(`./db/${DBNAME}`)){
    console.log('Setting up database structure ...');
    DB = new Database(`./db/${DBNAME}`);
    DB.exec(fs.readFileSync('./db/scripts/createDb.sql', 'utf-8'));
    DB.exec(fs.readFileSync('./db/scripts/populateDb.sql', 'utf-8'));
} else {
    DB = new Database(`./db/${DBNAME}`); // Charger en mémoire
}

export default DB;