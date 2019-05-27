const bcrypt = require('bcryptjs');

const helper_functions = {};

helper_functions.encryptPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);

    const encryptedPass = await bcrypt.hash(password, salt);

    return encryptedPass;

}

helper_functions.matchPassword = async (current_password, database_password) => {
    try {

        return await bcrypt.compare(current_password, database_password);

    } catch (e) {

        console.log(e);
        
    }
}

module.exports = helper_functions;