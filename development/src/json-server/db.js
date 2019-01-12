var faker = require('faker');

function generate() {
  var users = [];
  var address = [];
  for (var id = 0; id < 50; id++) {
    var name = faker.name.findName();
    var birth = faker.date.past();
    users.push({
      "id": id,
      "name": name,
      "birth": birth,
      'address_id': id + 10,
    })
  }

  for (var id = 10; id < 60; id++) {
    let city = faker.address.city();
    let country = faker.address.country();
    address.push({
      'id': id,
      'city': city,
      'country': country
    })
  }

  return {
    "users": users,
    "address" : address
  }
}

module.exports = generate
