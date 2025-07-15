const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/jobtracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const JobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  date_applied: String,
  notes: String,
});

const Job = mongoose.model('Job', JobSchema);

app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post('/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

app.put('/jobs/:id', async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/jobs/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
