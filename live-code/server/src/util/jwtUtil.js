import jwt from 'jsonwebtoken'; // npm install jsonwebtoken https://github.com/auth0/node-jsonwebtoken#readme

const SUPER_SECRET = 'catsareawesomebutdogsareawesometoo';

function generate(username) {
  // registered claims (pre defined payload variables)
  let payloadOptions = {
    issuer: "express-rest-jwt-demo",
    subject: "send and receive access token",
    expiresIn: "15m" // 15 minutes
  }

  // private claims (custom payload)
  let payload = {
    username: username,
    role: "USER"
  }

  let token = jwt.sign(payload, SUPER_SECRET, payloadOptions);

  return token;
}

function verify(token) {
  try {
    return jwt.verify(token, SUPER_SECRET); // verify signature and return payload
  } catch (err) {
    let verfError = new Error(); //custom verification error

    if (err.name == "JsonWebTokenError") {
      verfError.clientMessage = "Digital signing is invalid, request new token";
      verfError.serverMessage = "Token verification failed";
    }

    if (err.name == "TokenExpiredError") {
      verfError.clientMessage = "Digital signing is invalid, request new token";
      verfError.serverMessage = "Token expired";
    }

    throw verfError;
  }
}

export default { generate, verify }