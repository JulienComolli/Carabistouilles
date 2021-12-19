import Database from 'better-sqlite3';
import fs from 'fs';

import { DBNAME } from '../../config/publicConfig.js';

var DB;

// Init DB
if(!fs.existsSync(`./db/${DBNAME}`)){
    console.error('DataBase must be created before populating it. Launch the server once create it.');
} else {
    DB = new Database(`./db/${DBNAME}`); // Charger en mémoire
    DB.exec(fs.readFileSync('./db/scripts/populateDb.sql', 'utf-8'));
}

