const Astro = require('../models/Astro')

exports.createAstro = async(req,res) =>{
    try {
        const {name} = req.body;
        if(!name){
          return res.status(400).json({
            success: false,
            msg: "Name is required"
          })
        }
        const astrologer = await Astro.create({name})
        
        res.status(201).json({ message: 'Astrologer created successfully', astrologer });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}