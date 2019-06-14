import mongoose from 'mongoose'

const NewsPostSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const NewsPost = mongoose.model('news_post', NewsPostSchema);
export default NewsPost
