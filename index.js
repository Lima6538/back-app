
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const LeadSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  data: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', LeadSchema);

app.post('/leads', async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
});

app.get('/leads', async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
