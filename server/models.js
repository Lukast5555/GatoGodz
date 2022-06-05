import mongoose from 'mongoose'
const nftSchema = mongoose.Schema({
  nftAdress: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  coins: {
    type: Number,
    default: 0
  },
  buyedNft: {
    type: Boolean,
    default: false
  },
  buyedCount: {
    type: Number,
    default: 0
  },
  tokensPurchased: {
    type: Array,
    default: []
  }
})

const nft = mongoose.model('nft', nftSchema)
export default nft
