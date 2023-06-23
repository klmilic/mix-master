// note: these are middleware

// temporary import: don't have info on database yet
const db = require('../models/SQLModel');

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userController = {};

// create user in database
userController.createUser = async (req, res, next) => {
  console.log('entering create user');
  // get username and password from form input submission
  const { username, password } = req.body;
  // if username or password fields not filled in
  // return error to express global error handler
  if (!username || !password) {
    return next({
      log: 'Error occurred in userController.createUser',
      message: 'Error: missing username or password',
    });
  }
  // check if username already taken
  const values = [username, password];
  const query = `SELECT * FROM users
    WHERE username = $1`;

  try {
    const { rows } = await db.query(query, [username]);
    console.log('Users: ', rows);
    if (rows.length) {
      console.log('User already exists');
      res.locals.token = false;
      next();
    }
    else {
      console.log('User does not exist');
      const hash = await bcrypt.hash(password, SALT_WORK_FACTOR);
      // console.log('hash: ', hash);
      const hashValues = [username, hash];
      const hashQuery = `INSERT INTO users (username, password)
            VALUES ($1, $2)`;
      const data = await db.query(hashQuery, hashValues)
      res.locals.token = true;
      res.cookie('username', username);
      next();
    }
    next();
  } catch (err) {
    console.log('Error retrieving users: ', err);
    throw err;
  }
  // console.log('rows: ', rows);
  // // console.log('rows: ', rows);
  // // if username exists, return error to express global error handler
  // if (rows.rows.length) {
  //   // console.log('data: ', rows.rows);
  //   return next({
  //     log:
  //       'Error occurred in userController.createUser: ' +
  //       JSON.stringify(new Error('username already exists in database')),
  //     message: 'Error: username already exists',
  //   });
  // }
  // // if username doesn't exist, bcrypt password and insert account into user table in SQL database
  // const hash = await bcrypt.hash(password, SALT_WORK_FACTOR);
  // // console.log('hash: ', hash);
  // const hashValues = [username, hash];
  // const hashQuery = `INSERT INTO users (username, password)
  //       VALUES ($1, $2)`;

  // const data = await db.query(hashQuery, hashValues)
  // // console.log('added to database');
  // res.locals.token = true;
  // next();
};


// verify user info upon login
userController.verifyUser = async (req, res, next) => {
  // obtain username and password from request body from frontend login post request
  const { username, password } = req.body;
  const values = [username, password];
  // find user in database
  const query = `SELECT * from users
    WHERE username = $1`;
  const rows = await db.query(query, [username]);
  console.log('returned rows: ', rows);
  // if username is not found (user doesn't exist), redirect to signup page (throw error for now)
  if (rows.rowCount < 1) {
    return next({
      log: 'Error occurred in userController.verifyUser',
      message: 'Error: username not found'
    });
  }
  // compare submitted password with hashed password stored in database
  const hashedPassword = rows.rows[0].password;
  const result = await bcrypt.compare(password, hashedPassword);
  try {
    // if they don't match redirect to signup page (throw error for now)
    if (!result) {
      return next({
        log: 'Error in userController.verifyUser',
        message: 'Error: invalid password'
      });
    };
    // if they match, store something in res.locals for postman result and proceed to next middleware
    res.locals.result = true;
    res.cookie('username', username);
    next();
  }
  catch(err) {
    next({
      log: 'Error in userController.verifyUser',
      message: 'Error: bcrypt issue'
    });
  }
};

module.exports = userController;