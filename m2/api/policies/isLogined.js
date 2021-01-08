// isAdmin.js
module.exports = async function(req,res,proceed){


  if(req.session.username === 'admin' || req.session.role === 'admin' ||  req.session.role === 'user'){
    return proceed();
  }
  return res.redirect('../../login');

};

