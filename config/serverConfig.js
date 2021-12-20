export const DBNAME = 'carabistouilles.db';
export const SERVER_PORT = 8000;
export const SALT_ROUND = 10; // For Bcrypt hashing function
export const DEFAULT_USER_PICTUREPATH = 'default.png';
export const SESSION_SECRET_KEY = "notverysecretkey"; // Secret key to handle sessions, do not reveal !
export const AUTHORIZED_IMG_TYPES = { 'image/png': '.png', 'image/jpeg': '.jpeg', 'image/bmp': '.bmp' }