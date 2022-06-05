import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Cors from 'cors'
import nft from './models.js'

import cron from 'node-cron'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000
const uri = process.env.CONNECTION_URL

app.use(Cors())

app.use(express.json())

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to DB......')
  })
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*').send('Hello World')
})

app.post('/addaddress', async (req, res) => {
  try {
    console.log(req)
    const { nftAddress } = req.body
    console.log(nftAddress)
    const oldUser = await nft.collection.findOne({
      nftAdress: nftAddress
    })
    if (oldUser) {
      res.header('Access-Control-Allow-Origin', '*').send('User already exists')
    } else {
      const newUser = new nft({
        nftAdress: nftAddress,
        coins: 0,
        buyedNft: false,
        tokensPurchased: []
      })
      await newUser.save()
      res.header('Access-Control-Allow-Origin', '*').send({
        message: 'User added successfully',
        coins: newUser.coins
      })
    }
  } catch (err) {
    res.header('Access-Control-Allow-Origin', '*').send(err)
  }
})

app.post('/getcoins', async (req, res) => {
  try {
    const nftAddress = req.body.nftAddress.trim()
    const user = await nft.collection.findOne({
      nftAdress: nftAddress
    })
    if (user) {
      res.header('Access-Control-Allow-Origin', '*').send({ coins: user.coins })
    } else {
      res.header('Access-Control-Allow-Origin', '*').send('User not found')
    }
  } catch (err) {
    res.header('Access-Control-Allow-Origin', '*').send(err)
  }
})

app.put('/buynft', async (req, res) => {
  try {
    const { nftAddress } = req.body
    const { token } = req.body
    const user = await nft.collection.findOne({
      nftAdress: nftAddress
    })
    if (user) {
      await nft.collection.updateOne(
        {
          nftAdress: nftAddress
        },
        {
          $set: {
            buyedNft: true,
            tokensPurchased: [...user.tokensPurchased, token]
          },
          $inc: {
            buyedCount: 1,
            coins: 10
          }
        }
      )
      res.header('Access-Control-Allow-Origin', '*').send({ coins: user.coins })
    } else {
      const newUser = new nft({
        nftAdress: nftAddress,
        coins: 0,
        buyedNft: true
      })
      await newUser.save()
      res.header('Access-Control-Allow-Origin', '*').send('User not found')
    }
  } catch (err) {
    res.header('Access-Control-Allow-Origin', '*').send(err)
  }
})

app.get('/allnftbuyer', async (req, res) => {
  try {
    const nfts = await nft.find({ buyedNft: true })
    res.header('Access-Control-Allow-Origin', '*').send(nfts)
  } catch (err) {
    res.header('Access-Control-Allow-Origin', '*').send(err)
  }
})

app.put('/updatecoins', async (req, res) => {
  try {
    const { nftAddress, coins } = req.body
    const user = await nft.collection.findOne({
      nftAdress: nftAddress
    })
    if (user.coins < coins) {
      res.header('Access-Control-Allow-Origin', '*').send('Not enough coins')
    }
    if (user) {
      await nft.collection.updateOne(
        {
          nftAdress: nftAddress
        },
        {
          $set: {
            coins: user.coins - coins
          }
        }
      )
      res.header('Access-Control-Allow-Origin', '*').send({ coins: user.coins })
    } else {
      res.header('Access-Control-Allow-Origin', '*').send('User not found')
    }
  } catch (err) {
    res.header('Access-Control-Allow-Origin', '*').send(err)
  }
})

app.get('/gettoken', async (req, res) => {
  try {
    res
      .header('Access-Control-Allow-Origin', '*')
      .send({ token: await getRandomNumber() })
  } catch (err) {
    res.header('Access-Control-Allow-Origin', '*').send(err)
  }
})

const updateCoins = async () => {
  const nfts = await nft.find({})
  for (let i = 0; i < nfts.length; i++) {
    const nft = nfts[i]
    if (nft.buyedNft) {
      await nft.updateOne({
        $inc: {
          coins: nft.buyedCount * 10
        },
        $set: {
          updatedAt: Date.now()
        }
      })
    }
  }
}

app.post('/getusertokens', async (req, res) => {
  try {
    const userAccount = req.body.nftAddress

    const nftVal = await nft.collection.findOne({
      nftAdress: userAccount
    })
    const tokens = [...nftVal.tokensPurchased]
    res.header('Access-Control-Allow-Origin', '*').send({
      token: tokens
    })
  } catch (err) {
    res.header('Access-Control-Allow-Origin', '*').send(err)
  }
})

const getRandomNumber = async () => {
  const nfts = await nft.find({})
  const tokensBuyed = []
  for (let i = 0; i < nfts.length; i++) {
    const tokens = nfts[i].tokensPurchased
    tokensBuyed.push(...tokens)
  }
  while (true) {
    const min = 0
    const max = 5554
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    if (!tokensBuyed.includes(randomNumber)) {
      return randomNumber
    }
  }
}

cron.schedule('0 0 * * *', () => {
  updateCoins()
  console.log('running a task every day')
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
