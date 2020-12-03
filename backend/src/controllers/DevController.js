const axios = require('axios');
const { request } = require('express');
const { update } = require('../models/dev');
const Dev = require('../models/dev');
const { index } = require('../models/utils/PointSchema');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(request, response) {
    const dev = await Dev.find();
    return response.json(dev);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    const dev = await Dev.findOne({ github_username });
    if (!dev) {
      const apiResponse = await axios.get(
        `http://api.github.com/users/${github_username}`
      );

      let { name = login, avatar_url, bio } = apiResponse.data;

      const location = {
        type: 'Point',
        coordinates: [latitude, longitude],
      };

      const techsArray = parseStringAsArray(techs);

      console.log(name);
      console.log(avatar_url);
      console.log(bio);
      console.log(github_username);
      console.log(techs);

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'newDev', dev);
    }
    return response.json(dev);
  },
  async update() {},

  async destroy() {},
};
