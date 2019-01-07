var faker = require('faker');

function generateUsers () {
  var users = [];
  for (var id = 0; id < 50; id++){
    var name = faker.name.findName();
    var birth = faker.date.past();
    var gender = "M";
    users.push({
      "id": id,
      "name": name,
      "gender": gender,
      "birth": birth
    })
  }
  return { "users": users }
}
module.exports = generateUsers
