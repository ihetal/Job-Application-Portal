const jwt = require("jsonwebtoken");
SECRET_KEY = "secret_divyang";

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err instanceof jwt.JsonWebTokenError) {
      console.log(err);
      return res.status(401).send({
        responseMsg: "Please login to perform this action",
        authenticated: false,
      });
    } else if (err) {
      return res.status(403).send({ responseMsg: "Bad request!" });
    }
    req.payload = payload;
    next();
  });
};

exports.verifyEmployerToken = (req, res, next) => {
  const token = req.headers["authorization"];
  jwt.verify(token, "secret_divyangemployer", (err, payload) => {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({
        responseMsg: "Please login to perform this action",
        authenticated: false,
      });
    } else if (err) {
      return res.status(403).send({ responseMsg: "Bad request!" });
    }
    req.payload = payload;
    next();
  });
};

exports.getUserId = (req, res, next) => {
  const token = req.headers["authorization"];
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err instanceof jwt.JsonWebTokenError) {
      console.log(err);
      req.payload = {};
    } else {
      console.log(payload);
      req.payload = payload;
    }
    next();
  });
};
