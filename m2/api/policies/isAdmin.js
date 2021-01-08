// isAdmin.js
module.exports = async function(req,res,proceed){


  if(req.session.username === 'admin' || req.session.role === 'admin'){
    return proceed();
  }
  return res.forbidden();

};
