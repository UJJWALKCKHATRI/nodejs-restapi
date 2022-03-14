const Bootcamp = require('../models/Bootcamp')

//@desc get all bootcamp
//@route get/api/v1/bootcamps
//@access public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success:true, data:bootcamps});
    } catch (err) {
        res.status(400).json({success:false});
    }
}

exports.getBootcamp = async (req, res, next) => {
    try {
       const bootcamp = await Bootcamp.findById(req.params.id);
       if(!bootcamp){
         return res.status(400).json({success:false});
       }
       res.status(200).json({success:true, data:bootcamp})
    } catch (err) {
        res.status(400).json({success:false});
    }
}

exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    }catch (err) {
        res.status(400).json({ success:false})
}
};

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });
    if(!bootcamp){
        return res.status(400).json({success:false});
      }
      res.status(200).json({success:true, data:bootcamp})
  } catch (err) {
    res.status(400).json({ success:false})
  }
}

exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if(!bootcamp){
            return res.status(400).json({success:false});
          }
          res.status(200).json({success:true, data:{}})
      } catch (err) {
        res.status(400).json({ success:false})
      }
}