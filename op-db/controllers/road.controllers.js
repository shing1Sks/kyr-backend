import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Road } from "../models/road.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadRoad = asyncHandler(async (req, res, next) => {
  // get description ,longitude ,latitude ,condition from the request !
  // get image from req.files
  // upload image to cloudinary
  // save road in db

  const { description, longitude, latitude, condition } = req.body;

  if (!description || !longitude || !latitude || !condition) {
    throw new ApiError(
      400,
      "description ,longitude ,latitude ,condition are required"
    );
  }

  const images = req.files;
//   console.log(images);
  var uploadedImages;
  if (images) {
    uploadedImages = await Promise.all(
      images.map(async (image) => {
        const response = await uploadOnCloudinary(image.path);
        return response.url;
      })
    );
  }

  const road = new Road({
    description,
    longitude,
    latitude,
    condition,
    images: uploadedImages,
  });

  await road.save();

  res
    .status(200)
    .json(new ApiResponse(200, road, "road uploaded successfully"));
});

export const getRoads = asyncHandler(async (req, res, next) => {
  const roads = await Road.find();
  res
    .status(200)
    .json(new ApiResponse(200, "roads fetched successfully", roads));
});
