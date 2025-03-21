// repositories/themeRepository.js
const db = require('../database/dbContext');
const { Themes } = db;

const themeRepository = {
  getAllThemes: async () => {
    return await Themes.findAll({
      distinct: true,
      order: [['id', 'ASC']],
      limit: 25,
    });
  },
};

module.exports = themeRepository;
