// DataBase Code and Stuff

const addAddress = (userAccount) => {
  try {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3500/addaddress',
      data: { nftAddress: userAccount },
      success: function (data) {
        console.log(data)
      },
      error: function (data) {
        console.log(data)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const getCoins = (userAccount) => {
  try {
    $.ajax({
      type: 'GET',
      url: `http://localhost:3500/getcoins/${userAccount}`,
      success: function (data) {
        return data
      },
      error: function (error) {
        return error
      }
    })
  } catch (err) {
    return err
  }
}

const buyNft = (userAccount) => {
  try {
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3500/buynft',
      data: { nftAddress: userAccount },
      success: function (data) {
        console.log(data)
      },
      error: function (err) {
        console.log(err)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export { addAddress, getCoins, buyNft }
