const Chanel = require("../models/channels.schema")

const create = async (req,res) =>{
    try {
        const {name, admin_id} = req.body
        console.log(req.body)
      
        await Chanel.create({name, admin_id})


        res.status(200).json({message:"Successfully created channel"})
    } catch (error) {
        res.status(500).json({message:"Error creating channel"})
    }
}



module.exports = {create}