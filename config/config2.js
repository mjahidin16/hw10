const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cobalagi",
    password: "12345678",
    port: 5432
});

module.exports = pool;
