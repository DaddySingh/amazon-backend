const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51M6HeNSHRyNnWnoHQeVHNblO6HjDhsmQWrNF7eOqRgGmAXMbdkv3IAb4KGbd6bUUVLSQptW9lm6L4eaBrt5vw6mo00MbYm77Pk"
);

// API

// - API config
const app = express();

// - Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => {
  response.status(200).send("hello world!");
});

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request received BOOM !!!", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

const port = process.env.PORT || 5000;

// - Listen Command
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
