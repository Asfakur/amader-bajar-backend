const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { PaidOrder } = require('../models/paidOrder');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.get('/', async (req, res) => {
    const checkoutOrders = await PaidOrder.find().sort('-orderDate');
    res.send(checkoutOrders);
});

router.get('/:id', async (req, res) => {
    const checkoutOrder = await PaidOrder.find({
        customerId: req.params.id
    });

    if (!checkoutOrder) return res.status(404).send('The order with the given ID was not found.');

    res.send(checkoutOrder);
});

router.put('/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("Object id is wrong");
    const paidOrder = await PaidOrder.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, {
        new: true
    })
    if (!paidOrder) return res.status(404).send('The order with the given ID was not found.');
    res.send(paidOrder);
});


function setPaymentInfo(result) {
    const { id, balance_transaction, billing_details, amount, currency } = result;
    const { city, country, postal_code } = billing_details.address;
    const deliveryAddress = `${city} - ${postal_code} ${country}`;
    return {
        paymentId: id,
        transactionId: balance_transaction,
        deliveryAddress,
        paidAmount: amount,
        currency
    };
}

function setOrderInfo(productDetails, customerDetails, paymentResponse) {
    const paymentInfo = setPaymentInfo(paymentResponse);
    return {
        paymentInfo,
        customerId: customerDetails._id,
        customerPhone: customerDetails.phone,
        productId: productDetails._id,
        quantity: productDetails.quantity,
        pricePerUnit: productDetails.price,
        productName: productDetails.name
    };
}



router.post("/", async (req, res) => {
    // console.log("Request body", req.body);
    let error;
    let paymentDone;
    let response;
    let orderInfo;
    let orderSaved;
    let orderSavedToDb;


    try {
        const { productDetails, customerDetails, token } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotencyKey = uuidv4();

        const charge = await stripe.charges.create({
            amount: Math.round((productDetails.price * productDetails.quantity * 100) / 85.79),
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Product name: ${productDetails.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }

        },
            {
                idempotencyKey
            });

        // console.log("Charged: ", { charge });
        paymentDone = true;
        response = charge;

        if (charge.status === "succeeded") {
            // console.log("payment done");
            orderInfo = setOrderInfo(productDetails, customerDetails, charge)

            try {
                let newOrder = new PaidOrder(orderInfo);
                newOrder = await newOrder.save();
                // console.log(newOrder);
                orderSaved = newOrder;

                orderSavedToDb = true;

            } catch (ex) {
                console.log(ex);
                orderSavedToDb = false;
            }

        }

    }
    catch (error) {
        // console.error("Error", error);
        paymentDone = false;
    }
    res.send({ error, paymentDone, response, orderInfo, orderSaved, orderSavedToDb });

    // if(paymentDone){
    //     try {
    //         let paidOrder = new PaidOrder({
    //             customerId: 
    //         })
    //     } catch (ex) {

    //     }
    // }

});



module.exports = router;