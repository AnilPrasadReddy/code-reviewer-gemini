const generateContent = require("../services/ai.services");


async function codeReview(req,res){
    const code = req.body.code

    if(!code){
        res.status(403).json({msg:"code is Required"});
    }

    const result = await generateContent(code);
    res.send(result);
}

module.exports = codeReview;