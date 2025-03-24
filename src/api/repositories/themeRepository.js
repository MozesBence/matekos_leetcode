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
  async getThemeById(theme_id) {
    try {
      const theme = await Themes.findOne({
        where: { id: theme_id },
        attributes: ['theme']
      });
  
      if (!theme) {
        throw new Error("Téma nem található!");
      }
  
      return theme;
    } catch (error) {
      console.error("Error in getThemeById:", error);
      throw error;
    }
  }
  
};

module.exports = themeRepository;
