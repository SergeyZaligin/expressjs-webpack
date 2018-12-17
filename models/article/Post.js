const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  visible: {
    type: Boolean,
    default: 1,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  keywords: {
    type: String,
    default: '',
  },
  seoPreview: {
    type: String,
    default: '',
  },
  preview: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  category: {
    ref: 'Category',
    type: Schema.Types.ObjectId,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
  sort: {
    type: Number,
    default: 1,
  },
  thumbnail: {
    type: String,
    default: '',
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports = mongoose.model('Post', PostSchema);
