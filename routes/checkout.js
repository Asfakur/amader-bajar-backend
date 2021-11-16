const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get("/", (req, res) => {
    res.send("Working checkout api");
});

router.post("/", async (req, res) => {
    console.log("Request body", req.body);
    let error;
    let isSuccess;


    try {
        const { productDetails, token } = req.body;
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

        console.log("Charged: ", { charge });
        isSuccess = true;

    }
    catch (error) {
        console.error("Error", error);
        isSuccess = false;
    }
    res.send({ error, isSuccess });

});

module.exports = router;