const bcryptjs = require('bcryptjs');

const hashPassword = async(password)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        return hashedPassword;

    } catch (error) {
        console.log(error.message);
        return error;
    }
}

const comparePassword = async(password, hashedPassword)=>{
    try {
        return bcryptjs.compare(password, hashedPassword)
    } catch (error) {
        console.log(error.message)
        return error;
    }
}

module.exports = {hashPassword, comparePassword};