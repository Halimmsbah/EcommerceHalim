import { catchAsyncError } from "../../middleware/catchError.js"
import { cartModel } from "../../../database/models/cart.model.js"
import { AppError } from "../../utils/AppError.js"
import { orderModel } from "../../../database/models/order.model.js"
import { productModel } from "../../../database/models/product.model.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OpCIzCHnLlVXMX9ney1XAm4kXmyHJKZaWiCwH7g5Ki3b8l4s6yW5ZRmzFL0q9I9VIIhjO5DvXVZJDKoQkhnEoTO00ltu0ooZC');


const createCashOrder = catchAsyncError(async (req, res, next) => {

    //1- get cart -> cartId
    let cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', 404))
    //2- total order price
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    //3- create order -> cash
    let order = new orderModel({
        user: req.user._id,
        orderItems: cart.cartItems,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress,
    })
    await order.save()
    //4- increment sold & decrement quantity
    let options = cart.cartItems.map((prod) => {
        return {
            updateOne: {
                filter: { _id: prod.product },
                update: { $inc: { sold: prod.quantity, quantity: -prod.quantity } }
            }
        }
    })
    await productModel.bulkWrite(options)
    //5- clear cart 
    await cartModel.findByIdAndDelete(req.params.id)

    res.json({ message: 'success', order })
})

const getSpecififcOrder = catchAsyncError(async (req, res, next) => {
    let order = await orderModel.findOne({ user: req.user._id }).populate('orderItems.product')
    res.json({ message: 'success', order })

})

const getAllOrders = catchAsyncError(async (req, res, next) => {
    let orders = await orderModel.find().populate('orderItems.product')
    res.json({ message: 'success', orders })
})

const createCheckOutSession = catchAsyncError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', 404))
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    let session = await stripe.checkout.sessions.create({//doc api sessions to get this details
        line_items: [{
            price_data: {
                currency: 'egp',
                unit_amount: totalOrderPrice * 100,
                product_data: {
                    name: req.user.name
                }
            },
            quantity: 1
        }],
        mode: 'payment',
        success_url: "https://route-comm.netlify.app/#/",// frontend url
        cancel_url: "https://route-comm.netlify.app/#/cart",
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
        //we put email and cartId to get easey when bank send webhook with email for user and id for cart   
    })
    res.json({ message: 'success', session })
});

const createOnlineOrder = catchAsyncError((request, response) => {
    const sig = request.headers['stripe-signature'].toString();

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, "whsec_0P2DA0HyiDNzxPBE83zoJSPTCPpZl6TG");
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    if (event.type === 'checkout.session.completed') {
        card(event.data.object)
        console.log('Payment is success')
    } else {
        console.log(`Unhandled event type ${event.type}`);
    }
});

async function card(e) {

    //1- get cart -> cartId
    let cart = await cartModel.findById(e.client_reference_id)
    if (!cart) return next(new AppError('cart not found', 404))
    let user = await userModel.findOne({ email: e.customer_email })
    //3- create order -> cash
    let order = new orderModel({
        user: user._id,
        orderItems: cart.cartItems,
        totalOrderPrice: e.amount_total / 100,
        shippingAddress: e.metadata.shippingAddress,
        paymentMethod: e.payment_method_types[1],
        isPaid: true,
        paidAt: Date.now(),
        isDelivered: false,
        deliveredAt: Date.now(),

    })
    await order.save()
    if (order) {
        //4- increment sold & decrement quantity
        let options = cart.cartItems.map((prod) => {
            return {
                updateOne: {
                    filter: { _id: prod.product },
                    update: { $inc: { sold: prod.quantity, quantity: -prod.quantity } }
                }
            }
        })
        await productModel.bulkWrite(options)
        //5- clear cart 
        await cartModel.findOneAndDelete(user._id)
        return res.seatus(200).json({ message: 'success', order })
    }
    return next(new AppError('order not found', 404))
}

export {
    createCashOrder,
    getSpecififcOrder,
    getAllOrders,
    createCheckOutSession,
    createOnlineOrder
}

//bulk -> to increment sold & decrement quantity

// <- payment cycle ->
//1- place order in frontend
//2- backend call bank with any getway
//4- backend ask bank  for payment form
//5- bank give me URL session (payment form)
//6- backend give front this URL session (payment form)
//7- user sumbit the form and press pay
//8- money is reach to bank not to dev
//9- dev make specific api only for bank
//10- bank request to dev to tell him the payment is completed or not that notification called => (webhook)
//11- dev check if it's completed -> create order and delivered it to user
//****************NOTE****************
//this URL session (payment form) contain user information like email and id 
