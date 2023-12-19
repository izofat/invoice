const {Router} = require('express');

const router = Router();


const currencies = [
    {
        currency: "EUR",
        rate: 1,
    },
    {
        currency: "USD",
        rate: 0.91,
    },
    {
        currency: "CHF",
        rate: 1.05,
    },
    {
        currency: "DAI",
        rate: 0.92,
    },
    {
        currency : "TRY",
        rate : 0.031
    },
    {
        currency : "BTC",
        rate : 39500
    }
];

router.get('/api/:currency' , (req , res) => {
    const {currency} = req.params;
    const responseCurrency = currencies.find(currencyData => currencyData.currency === currency);
    res.send(responseCurrency);
})

module.exports = router