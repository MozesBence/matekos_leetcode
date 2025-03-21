const themeRepository = require('../repositories/themeRepository');

const getAllThemesController = async (req, res, next) => {
  try {
    const themes = await themeRepository.getAllThemes();

    if(!themes){
      const error = new Error("Nem sikerült lekérni a feladat témáit!");

      error.status = 400;

      throw error;
    }

    const uniqueThemes = themes.filter((theme, index, self) =>
      index === self.findIndex((t) => t.id === theme.id)
    );

    res.status(200).json(uniqueThemes);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getAllThemesController,
};

