//@desc get all bootcamp
//@route get/api/v1/bootcamps
//@access public
exports.getBootcamps = (req,res,next)=>{
    res
    .status(200)
    .json({success:true, msg:'Show all bootcamps'})
}

exports.getBootcamp = (req,res,next)=>{
    res
    .status(200)
    .json({success:true, msg:`get ${req.params.id}`})
}

exports.createBootcamp = (req,res,next)=>{
    res
    .status(200)
    .json({success:true, msg:'create'})
}

exports.updateBootcamp = (req,res,next)=>{
    res
    .status(200)
    .json({success:true, msg:`update ${req.params.id}`})
}

exports.deleteBootcamp = (req,res,next)=>{
    res
    .status(200)
    .json({success:true, msg:`delete ${req.params.id}`})
}