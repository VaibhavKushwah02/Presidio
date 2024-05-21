import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
const app = express();

connect('mongodb://localhost:27017/rentify', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(json());

// User Schema
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    password: String,
    role: String, // seller or buyer
});

const User = model('User', userSchema);

// Property Schema
const propertySchema = new Schema({
    title: String,
    description: String,
    location: String,
    bedrooms: Number,
    bathrooms: Number,
    rent: Number,
    seller: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Property = model('Property', propertySchema);

// Register Route
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, role } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ firstName, lastName, email, phoneNumber, password: hashedPassword, role });
    await user.save();
    res.json(user);
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = sign({ userId: user._id, role: user.role }, 'secretkey');
    res.json({ token });
});

// Middleware to authenticate user
const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = verify(token, 'secretkey');
    req.user = decoded;
    next();
};

// Seller Route to post property
app.post('/properties', auth, async (req, res) => {
    if (req.user.role !== 'seller') {
        return res.status(403).json({ error: 'Access denied' });
    }
    const property = new Property({ ...req.body, seller: req.user.userId });
    await property.save();
    res.json(property);
});

// Buyer Route to get properties
app.get('/properties', auth, async (req, res) => {
    const properties = await Property.find().populate('seller');
    res.json(properties);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});