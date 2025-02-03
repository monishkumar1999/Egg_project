const Admin = require("../models/admin");
const { jwt_secerat } = require("../utils/constant");
const checkAdminMobile = async (mobileNumber) => {
  const admin = await Admin.findOne({ mobile_no: mobileNumber });

  try{
  
    if (admin) {
        return admin
     }
     else{
       throw new Error("No user found");
     }
  }
  catch(err){
    throw new Error(err.message);
  }
  
};


module.exports={
    checkAdminMobile
}