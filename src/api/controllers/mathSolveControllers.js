const mathSolveServices = require("../services/mathSolveServices");

exports.getUsers = async (req, res, next) =>
{
    try{
        const get_users = await mathSolveServices.getUsers();
    
        if(!get_users){
            const error = new Error('Hiba történt a felhasználók lekérése közben!')

            error.status = 400;

            throw error;
        }

        res.status(200).send(get_users);
    }catch(error){
        next(error);
    }
}
