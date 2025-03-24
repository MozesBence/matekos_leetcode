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


const getThemeById = async (req, res, next) => {
  try {
    const { theme_id } = req.params;
    const theme = await themeRepository.getThemeById(theme_id);
    
    if (!theme) {
      return res.status(404).json({ message: "Téma nem található!" });
    }

    res.status(200).json(theme);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllThemesController,
  getThemeById
};

