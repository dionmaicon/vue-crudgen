const resource = {
  endPoint: "http://localhost:3002/address/"
}

const model = ( function(){

  let street = {
    value: "",
    type: "text",
    required: true
  }

  let number = {
    type: "text",
    required: true
  }

  let city = {
    type: "text",
    required: true
  }

  let country = {
    type: "text",
    required: true
  }

  let hide = ["number", "street"]

  return {
    street : street,
    number: number,
    country: country,
    city: city,
    hide: hide
  }

})();

module.exports = {model, resource}
