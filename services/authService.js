const bcrypt=require("bcrypt");
const pool = require("../db");
exports.createUser = async ({name,email,password}) => {
    const normalizedName=name.trim();
    const normalizedEmail=email.trim().toLowerCase();
    const password_hash= await bcrypt.hash(password,12);
    const result = await pool.query(
        `INSERT INTO users(name,email,password_hash)
         VALUES ($1,$2,$3)
         RETURNING id,name,email `,[normalizedName,normalizedEmail,password_hash]
    );
    return result.rows[0];
}
exports.findUserByEmail = async (email)=>{
    const normalizedEmail = email.trim().toLowerCase();
    const result = await pool.query(
        `SELECT id,name,email,password_hash
         FROM users
         WHERE email=$1
        `,[normalizedEmail]
    );
    return result.rows[0];
};
exports.findUserById = async (id)=>{
    const result = await pool.query(
        `SELECT id,name,email,created_at
         FROM users
         WHERE id=$1
        `,[id]
    );
    return result.rows[0]??null;

}