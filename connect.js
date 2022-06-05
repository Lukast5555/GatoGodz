let instance
let provider
let signer

const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'ApprovalForAll',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    inputs: [],
    name: '_paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: '_price',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      }
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxTokenIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes'
      }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'val',
        type: 'bool'
      }
    ],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'tokenByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'tokenIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]
async function connect() {
  try {
    const Web3Modal = window.Web3Modal.default
    const WalletConnectProvider = window.WalletConnectProvider.default
    console.log(WalletConnectProvider)
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        // options: {
        //   infuraId: '94d54bfb4a304752b9ed8f0ed3402aa1'
        // },
        rpc: {
          80001:
            'https://polygon-mumbai.infura.io/v3/94d54bfb4a304752b9ed8f0ed3402aa1'
        }
      }
    }

    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions, // required
      disableInjectedProvider: false // optional. For MetaMask / Brave / Opera.
    })

    instance = await web3Modal.connect()

    provider = new ethers.providers.Web3Provider(instance)
    const { chainId } = await provider.getNetwork()
    if (chainId !== 80001) {
      window.alert('Change the network to Matic Testnet')
      throw new Error('Change network to Matic Testnet')
    }
    signer = provider.getSigner()
    let userAccount = await signer.getAddress()
    window.value = userAccount
    document.getElementById('walletaddr').innerHTML = userAccount
    localStorage.setItem('walletaddr', userAccount)
    getAddress(userAccount) /// DataBase
    getCoins(userAccount) /// DataBase
    getusertokens(userAccount)
    if (signer != undefined) {
      document.getElementById('connect').innerHTML = 'connected'
    }
  } catch (err) {
    alert(err)
  }
}

async function mint() {
  try {
    if (instance == undefined) {
      await connect()
    }
    const contract = new ethers.Contract(
      '0xAA1A525D63B39EB0815414d236E3179FBDbD4457',
      abi,
      signer
    )
    // console.log(await contract.mint({ value: ethers.utils.parseEther('0.01') }))
    generateToken()
    const tokenValue = localStorage.getItem('tokenValue')

    tx = await contract.mint(tokenValue, {
      value: ethers.utils.parseEther('0.01')
    })
    tx.wait()
    buyNft(tx['from']) //// DataBase
  } catch (err) {
    alert(err.message)
  }
}

const getAddress = (userAccount) => {
  fetch('https://nft-game-card.herokuapp.com/addaddress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      nftAddress: userAccount
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
}

const getCoins = (userAccount) => {
  let coins = 0
  fetch(`https://nft-game-card.herokuapp.com/getcoins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      nftAddress: userAccount
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.coins)
      document.getElementById('coins').innerHTML = `Coins: ${data.coins}`
      localStorage.setItem('coins', data.coins)
      return data.coins
    })
    .catch((err) => console.log(err))
  return coins
}

const buyNft = (userAccount) => {
  fetch('https://nft-game-card.herokuapp.com/buynft', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      nftAddress: userAccount,
      token: localStorage.getItem('tokenValue')
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      document.getElementById('coins').innerHTML = `Coins: ${data.coins}`
    })
    .catch((err) => console.log(err))
}

const updateCoins = (userAccount, price) => {
  let coins = localStorage.getItem('coins')
  if (coins < price) {
    console.log('not enough coins')
    return
  }
  localStorage.setItem('coins', coins - price)
  fetch(`https://nft-game-card.herokuapp.com/updatecoins/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      nftAddress: userAccount,
      coins: price
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      localStorage.setItem('coins', data.coins)
    })
    .catch((err) => console.log(err))
  getCoins(userAccount)
}

const generateToken = () => {
  fetch('https://nft-game-card.herokuapp.com/gettoken', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      localStorage.setItem('tokenValue', data.token)
    })
}

const getusertokens = (userAccount) => {
  fetch('https://nft-game-card.herokuapp.com/getusertokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      nftAddress: userAccount
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.token)
      const tokens = data.token
      PrintTokens(tokens)
    })
}

const getCoinsFromUser = (coins) => {
  console.log(coins)
  let userAccount = localStorage.getItem('walletaddr')
  updateCoins(userAccount, coins)
}

// window.onload = () => {
//   document.getElementById('coins').innerHTML = `Coins : ${localStorage.getItem(
//     'coins'
//   )}`
//   // getusertokens(localStorage.getItem('walletaddr'))
//   // console.log(localStorage.getItem('walletaddr'))
// }

const PrintTokens = (tokens) => {
  tokens.map((token) => {
    if (token != null) {
      console.log(token)
      fetch(
        "https://gateway.pinata.cloud/ipfs/QmWyWWcEUSQNhVWvzqp1P1faC4chbJd5W1cU9u61GGKZf4/"+token+".json",
        {
          method: 'GET'
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.image)
          const image = "https://gateway.pinata.cloud/ipfs/"+data.image.slice(7)
          console.log(image)
          const card = document.createElement('div')
          card.className = 'card'
          card.innerHTML = `
            <div class="card-body" id=${token}>
                <img src=${image} alt="">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.attributes[7].trait_type}</p>
                <p class="card-text">${data.attributes[7].value}</p>
            </div>
            `
          document.getElementById('token-values').appendChild(card)
        })
    }
  })
}
