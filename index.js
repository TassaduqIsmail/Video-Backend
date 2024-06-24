// app.js
const dotenv = require('dotenv')
const express = require('express');
const MongoDB = require('./dbconnection');
const userRoutes = require('./src/routes/userRoutes');
const userProfileRoutes = require('./src/routes/userProfileRoutes');
const imageAndVideo = require('./src/routes/imageAndVideoRoutes');
const subscription = require('./src/routes/subscriptionRoutes');
const accountDetails = require('./src/routes/accountDetailsRoutes');
const admin = require('./src/routes/adminRoutes');
var cors = require('cors')
var bodyParser = require('body-parser')
dotenv.config()
const stripe = require('stripe')('sk_test_51OOfT2I0AsDkQn5UbAbPjp3BblXiCHpN7ayijWp2HORYjUIGuojouvCMlLev7B1tjKb2fPghnBhHn8SMRT3Olkcm00aiYic4lq')

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
// app.use(express.json());

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
// Connect to cloudinary
// cloudinary()
// Connect to MongoDB
MongoDB()
// Use centralized routes
app.use('/api/user', userRoutes);
app.use('/api/subcription/', subscription);
app.use('/api/userProfile/', userProfileRoutes);
app.use('/api/userProfile/assets/', imageAndVideo);
app.use('/api/user/accountDetails/', accountDetails);
app.use('/api/admin/', admin);

app.get('/', (req, res) => {
  res.send('hello world')
})







app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
