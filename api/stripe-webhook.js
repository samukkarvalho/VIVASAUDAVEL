const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const email = session.metadata.email;

    // Gerar código de licença
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const licenseCode = `VIDA-${year}-${random}`;

    try {
      // Criar licença
      await db.collection('licenses').doc(licenseCode).set({
        code: licenseCode,
        email: email,
        price: session.amount_total / 100,
        currency: session.currency,
        status: 'active',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        userId: userId,
        activatedAt: admin.firestore.FieldValue.serverTimestamp(),
        type: 'lifetime',
        stripeSessionId: session.id,
      });

      // Atualizar usuário para premium
      await db.collection('users').doc(userId).update({
        isPremium: true,
        licenseCode: licenseCode,
        upgradedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Licença ${licenseCode} criada e ativada para ${email}`);
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
  }

  res.json({ received: true });
};
