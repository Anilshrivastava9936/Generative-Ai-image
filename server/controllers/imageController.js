import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;
        console.log("c0", userId)
        console.log("c0", prompt)
        const user = await userModel.findById(userId)
        console.log("c1")
        console.log("user", user)
        console.log("prompt", prompt)
        if (!user || !prompt) {
            return res.json({ success: false, message: "missing Detailes" })
        }
        console.log("c2")
        if (user.creditBalance <= 0) {
            console.log("c2.1",user.creditBalance)
            return res.json({ success: false, message: "No Credit Balance 1", creditBalance: user.creditBalance });
        }

        if (userId.creditBalance === 0 || userModel.creditBalance < 0) {
            return res.json({ success: false, message: "No Credit Balance", creditBalance: user.creditBalance })
        }


        const formData = new FormData()
        formData.append('prompt', prompt)
        console.log("c3")

        console.log("c3.1")

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        })

        console.log("c4")

        // const base64Image = Buffer.form(data, 'binary').toString('base64')
        // const base64Image = Buffer.from(data, "binary").toString("base64");
        const base64Image = Buffer.from(data, 'binary').toString('base64');

        console.log("c4.1")

        const resultImage = `data:image/png;base64,${base64Image}`
        // console.log("c4.2",resultImage)

        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })
        console.log("c5")

        return res.json({ success: true, message: "Image Generated", creditBalance: user.creditBalance - 1, resultImage })



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}