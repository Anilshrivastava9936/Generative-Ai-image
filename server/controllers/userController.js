
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js'

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({ success: false, message: "Missing Detailes Fill" })
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name, email, password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.status(201).json({
            success: true, token, user: { name: user.name }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "user Controller Api" })
    }
}


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) return res.send({ success: false, message: "User Not Available" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.status(201).json({
                success: true, token, user: { name: user.name }
            })
        } else {

            return res.json({
                success: false, message: "user invalid"
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "user Controller login Api" })
    }
}
const userCredits = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await userModel.findById(userId)
        res.json({
            success: true, credits: user.creditBalance, user: { name: user.name }
        })

    } catch (error) {

        res.json({
            success: false, message: error.message
        })
    }
}


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})


const paymentRazorpay = async (req, res) => {
    try {

        const { userId, planId } = req.body;
        const userData = await userModel.findById(userId)

        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing Detailes" })

        }

        let credits, plan, amount, data

        switch (planId) {
            case 'Basic':
                plan = 'Basic',
                    credits = 100
                amount = 10
                break;

            case 'Advance':
                plan = 'Advance',
                    credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business',
                    credits = 100
                amount = 10
                break;
            default:
                return res.json({ success: false, message: "plan not found" });
        }

        const date = Date.now()

        const transactionData = {
            userId, plan, amount, credits, date
        }

        const newTransaction = await transactionModel.create(transactionData)
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }


        // await razorpayInstance.order.create(options, (error, order) => {
        //     if (error) {
        //         console.log(error);
        //         res.json({ success: false, message: error })
        //     }
        //     res.json({ success: true, order })
        // })

        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });


    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


const verifyRazorypay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                return res.json({ success: false, message: 'payment Failed' })
            }
            const userData = await userModel.findById(transactionData.userId)
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, { creditBalance })
            await transactionModel.findByIdAndUpdate(transactionData4._id, { payment: true })

res.json({success:true,message:"Credits added"})
}else{
            res.json({success:false,message:"Credits Failed"})

        }



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


export { registerUser, loginUser, userCredits, paymentRazorpay,verifyRazorypay };
