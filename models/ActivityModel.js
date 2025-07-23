import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: String,
  action: String,
  timestamp: { type: Date, default: Date.now },
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
