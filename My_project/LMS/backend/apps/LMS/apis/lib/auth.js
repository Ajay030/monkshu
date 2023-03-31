const jwt = require("jsonwebtoken");
exports.Authentication =(jsonReq)=>{
  const token = jsonReq.TOKEN || req.headers["cookie"];
  console.log(token);
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token,"ajaybhatheja");
    console.log("hello");
    console.log(JSON.stringify(decoded))
  } catch (err) {
    return false;
  }
  return true;
}