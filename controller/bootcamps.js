const { query } = require("express");
const path = require("path");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
//@desc get all bootcamp
//@route get/api/v1/bootcamps
//@access public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  bootcamp.remove();

  res.status(200).json({ success: true, data: bootcamp });
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  // add user to req.body
  req.body.user = req.user.id;

  // check for pub;ish bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // if the user is not admin they can only add one bootcamp
  if (publishedBootcamp && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`user with id of ${req.user.id} has already published`, 400)
    );
  }

  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  //make sure user is bootcamp owner
  if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin'){
      return next(
        new ErrorResponse(`User ${req.params.id} is not authorized to update`, 401)
      );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  res.status(200).json({ success: true, data: bootcamp });
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin'){
    return next(
      new ErrorResponse(`User ${req.params.id} is not authorized to delete`, 401)
    );
}
  bootcamp.remove()
  res.status(200).json({ success: true, data: {} });
})

exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload a image file`, 400));
  }
  // CHECK FILE Size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload a image file less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });

  console.log(file.name);
});
