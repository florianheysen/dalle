import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { Logtail } from "@logtail/node";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ succress: true, data: posts });
  } catch (error) {
    res.status(500).json({ succress: false, message: error });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    logtail.info("Image posted through Cloudinary & MongoDB", {
      name: name,
      prompt: prompt,
      photoUrl: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    logtail.error(error);
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
