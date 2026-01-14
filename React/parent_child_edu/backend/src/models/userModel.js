const db = require('../config/db.js');

async function findUserByPhone(phone) {
    const [rows] = await db.execute('SELECT * FROM users WHERE phone = ? LIMIT 1', [phone]);
    return rows[0];
}

async function createUser({ phone, passwordHash, nickname }) {
    const [res] = await db.execute('INSERT INTO users (phone, password_hash, create_time, nickname) VALUES (?, ?, NOW(), ?)', [phone, passwordHash, nickname]);
    // console.log(res);
    if (res.affectedRows) {
        return {
            id: res.insertId,
            phone
        }
    }
}

module.exports = {
    findUserByPhone,
    createUser
}