const Sub = require("../models/subscriptionModel");
const stripe = require("stripe")(
  "sk_test_51OOfT2I0AsDkQn5UbAbPjp3BblXiCHpN7ayijWp2HORYjUIGuojouvCMlLev7B1tjKb2fPghnBhHn8SMRT3Olkcm00aiYic4lq"
);

exports.payment = async (req, res) => {
  const { amount, subcriberId, creatorId } = req.body;

  try {
    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 999,
      currency: "usd",
    });
    console.log(paymentIntent.client_secret);

    const Subscription = new Sub({
      creatorId: req?.body.creatorId,
      subcriberId: req?.body?.subcriberId,
      price: req?.body?.price,
      paymentStatus: "payment init",
      subStatus: "unsubscribe",
      paymentIntent: paymentIntent.client_secret,
    });
    const data = await Subscription.save();

    console.log(data);
    // Send the client secret key back to the client
    res.json({
        success: true,
      clientSecret: paymentIntent.client_secret,
      billId: data?._id,
    });
  } catch (err) {
    console.error("Error creating PaymentIntent:", err);
    res.status(500).json({ error: "Unable to create PaymentIntent" });
  }
  // try {
  // console.log(req.body);
  // const paymentMethodId = 'pm_1OrhYUI0AsDkQn5UF7Sfka6l';
  // stripe.paymentMethods.retrieve(
  //     paymentMethodId,
  //     function(err, paymentMethod) {
  //       if (err) {
  //         console.error('Error retrieving payment method:', err);
  //       } else {
  //         console.log('Payment method details:', paymentMethod);
  //       }
  //     }
  //   );
  // const customer = await stripe.customers.create();
  // const ephemeralKey = await stripe.ephemeralKeys.create(
  //     { customer: customer.id },
  //     { apiVersion: '2023-10-16' }
  // );
  // const paymentIntent = await stripe.paymentIntents.create({
  //     amount: 999,
  //     currency: 'usd',
  //     customer: customer.id,
  //     automatic_payment_methods: {
  //         enabled: true,
  //     },
  // });

  //         const Subscription = new Sub({
  //             // creatorId: req?.body.creatorId,
  //             // subcriberId: req?.body?.subcriberId,
  //             // price: req?.body?.price,
  //             paymentStatus: "payment init",
  //             subStatus: "unsubscribe",
  //             paymentIntent: paymentIntent.client_secret,
  //         });
  //         const data = await Subscription.save();

  //         if (data) {
  //             // console.log(bill._id);
  //             res.json({
  //                 paymentIntent: paymentIntent.client_secret,
  //                 // ephemeralKey: ephemeralKey.secret,
  //                 // customer: customer.id,
  //                 billedId: data._id
  //             });

  // // // res.send("all data")

  //             // res.status(200).json({ message: "Payment Successful" });
  //         } else {
  //             return res.status(500).json({ error: "Internal Server Error" });
  //         }

  // console.log('customer detail', customer);
  // console.log('payment detail', paymentIntent);

  // } catch (error) {
  //     //  res.send({msg: error.message });
  // }
};

exports.updateStatus = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    console.log(id);
    const sub = await Sub.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          paymentStatus: req?.body?.paymentStatus,
          subStatus: req?.body?.subStatus,
        },
      },
      { new: true }
    );
    console.log("sub",sub);
    res.send({ succes: true, msg: "subscribe successful" });
  } catch (error) {
    console.error("Error updating name:", error);
    throw error;
  }
};
exports.getAllSubscriber = async (req, res) => {
  try {
    const sub = await Sub.find();
    if (sub == null) {
      return res.json({ error: "subscriber not found" });
    }
    res.json({ message: "sub found", data: sub });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
