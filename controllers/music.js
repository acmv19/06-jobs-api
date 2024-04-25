const Music = require("../models/music");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const getAllMusics = async (req, res) => {
  res.send("get all music");
};
const getMusic = async (req, res) => {
  res.send("get one of the music");
};
const createMusic = async (req, res) => {
  // res.send("create a music");
  //res.json(req.user);
  //res.json(req.body);
  req.body.createdBy = req.user.userId;
  const music = await Music.create(req.body);
  res.status(StatusCodes.CREATED).json({ music });
};
const updateMusic = async (req, res) => {
  res.send("update music");
};
const deleteMusic = async (req, res) => {
  res.send("delete music");
};

module.exports = {
  getAllMusics,
  getMusic,
  createMusic,
  updateMusic,
  deleteMusic,
};
