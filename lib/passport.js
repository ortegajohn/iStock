const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const database = require('../database/database_connection');
const {
    encryptPassword,
    matchPassword
} = require('../lib/helper_pass');

passport.use('local.signin', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {

    const rows = await database.query("SELECT * FROM iStock_users WHERE username = ? ", [username]);

    if (rows.length > 0) {

        const user = rows[0];
        const validPassword = await matchPassword(password, user.password);

        if (validPassword) {

            // done(null, user, req.flash('success', 'Welcome user: ' + user.username));
            done(null, user, req.flash('success', 'Welcome user: ' + user.id));

        } else {

            done(null, false, req.flash('message', 'Incorrect password'));

        }

    } else {

        return done(null, false, req.flash('message', 'The username does not exists'));

    }

}));

passport.use('local.signup', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {

    const {
        firstname
    } = req.body;

    const {
        lastname
    } = req.body;

    const newUser = {
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname
    }

    newUser.password = await encryptPassword(password);

    const result = await database.query("INSERT INTO iStock_users SET ?", [newUser]);

    newUser.id = result.insertId;

    console.log(newUser);

    return done(null, newUser, req.flash('success', 'Welcome user: ', newUser.username));
    // return done(null, newUser, req.flash('success', 'Welcome user: ', newUser.id));

}));

passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser(async (id, done) => {

    const rows = await database.query("SELECT * FROM iStock_users WHERE id = ?", [id]);
    done(null, rows[0]);

});