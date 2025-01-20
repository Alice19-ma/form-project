import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const FormSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

let FormModel;
try {
  FormModel = mongoose.model('Form');
} catch {
  FormModel = mongoose.model('Form', FormSchema);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongoose.connect(MONGODB_URI);
      const formData = new FormModel(req.body);
      await formData.save();
      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
