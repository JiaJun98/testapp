const claims = require('../../models/claims');

module.exports.insert = async(params, res) => {
    const newClaim = new InsuranceClaim({
        name: params.name,
        Industry: params.Industry,

    } )

    try {
        
        const savedClaim = await newClaim.save();
        console.log(savedClaim)
        return res.status(201).json({message: "Claim created successfully"});
        
    } catch(error){
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}
