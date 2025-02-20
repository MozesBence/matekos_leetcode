const settingsConfirmService = require("../services/settingsConfirmService");
require("dotenv").config();

const nodemailer = require('nodemailer');

exports.sendConfirmCode = async (req, res, next) =>
{
    const { email, user_name, id } = req.query;
    
    try{

        if(email == null){
            const error = new Error("Nincs megadva email cím!");

            error.status = 400;

            throw error;
        }
        
        // Email küldése
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mathsolve597@gmail.com',
                pass: 'awsm uhrf dsrd xqcz',
            },
        });

        const randomSixDigitNumber = () => Math.floor(100000 + Math.random() * 900000); 

        const RandomDigits = randomSixDigitNumber();

        const mailOptions = {
            from: '"Math Solve" <mathsolve597@gmail.com>',
            to: email,
            subject: 'Megerősítő kód',
            html: `
                <div style="
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    font-family: Arial, sans-serif;
                ">
                    <table role="presentation" width="100%" style="position: relative;">
                        <tr>
                            <td style="position: relative; text-align: center;">
                                <img src="https://drive.google.com/uc?export=view&id=1kLXvCwA1hF9wACP8NPjqUsHrzcSDy8Gk" 
                                    alt="Header background image" 
                                    style="width: 100%; height: auto; border-radius: 12px 12px 0 0;">
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                                    <img src="https://drive.google.com/uc?export=view&id=1DVnRCatLIPKwrInPc62RLg89gBR1wJJG" 
                                        alt="Header logo Image" 
                                        style="width: 100px; height: auto;">
                                </div>
                            </td>
                        </tr>
                    </table>
                    <h1 style="color: #333;">Hello ${user_name}!</h1>
                    <p style="font-size: 12px; margin-bottom: 3px; color: red;">A megerősítő kód csak 15 percig érvényes!</p>
                    <div><p style="color: black; font-size: 16px;">Megerősítő kód: </p> <p style="color: black; font-size: 45px;">${RandomDigits}</p> </div>
                </div>`
        };

        const newToken =
        {
            token: RandomDigits,
            type: "beállítások",
            user_id: id,
        }

        const token_result = await settingsConfirmService.setConfirmCode(newToken);

        if(!token_result){
            const error = new Error("Hiba törént a kód feltöltése közbe!");

            error.status = 400;

            throw error;
        }

        const email_send = await transporter.sendMail(mailOptions);

        if(!email_send){
            const error = new Error("Hiba törént az email küldése közbe!");

            error.status = 400;

            throw error;
        }

        res.status(201).json({ message: 'Kód sikeresen elküldve'});
        }
    catch(error){
        next(error);
    }
}

exports.setSettings = async (req,res,next) =>{
    const { content, code, id, type } = req.body;

    console.log(content, code, id, type);

    const code_result = await settingsConfirmService.codeConfirm(code, id);

    try{
        if(!code_result){
            const error = new Error("Nem megfelelő kód lett megadva!");

            error.status = 400;

            throw error;
        }

        var setSettings_result = null;
        if(type == 'profile'){
            setSettings_result = await settingsConfirmService.setNewUsername(id,content);
        }

        res.status(200).send(setSettings_result);
    }
    catch(error){
        next(error);
    }

}