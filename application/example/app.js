import express from "express";

const app = express();
app.use(express.json());

app.post("/webhook/omise", (req, res) => {
  const { key, data: charge } = req.body;
  
  // Handle payment events
  if (key === "charge.create" || key === "charge.complete") {
    const status = charge.paid && charge.status === "successful" ? "SUCCESS" : "FAILED";
    const icon = status === "SUCCESS" ? "✅" : "❌";
    const eventType = key === "charge.create" ? "CREATED" : "COMPLETED";
    
    console.log(`${icon} Payment ${eventType} - ${status}: ${charge.id} | Amount: ${charge.amount/100} ${charge.currency} | Card: ${charge.card?.brand} ****${charge.card?.last_digits}`);
  }

  res.status(200).json({ received: true, event: key });
});

app.listen(3000, () => console.log("🚀 Webhook running on http://localhost:3000"));
