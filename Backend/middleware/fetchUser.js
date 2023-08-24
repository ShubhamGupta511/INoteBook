const JWT=require('jsonwebtoken');
const JWT_SECRET="shubhamis$bo$y";

const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');
if(!token){
    res.status(401).send({error:"Please Authenticate with a Valid Token"});
}

try {
    const data=JWT.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
} catch (error) {
    res.status(401).send({error:"Please Authenticate with a Valid Token"});
}

}

module.exports=fetchUser;