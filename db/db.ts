import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'projects_mytodolist',
    namedPlaceholders: true,
    decimalNumbers: true,
})




