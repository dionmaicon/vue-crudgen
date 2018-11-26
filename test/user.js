const user = (function() {
  let name = {
    value: '',
    required: true,
    type: 'text',
  };

  let age = {
    value: '',
    required: true,
    type: 'number'
  };

  let gender_select = {
    options: [
      {text: 'Men', value: 'M'},
      {text: 'Woman', value: 'W'}
    ]
  };

  let preference_radio = {
    options: [
      {id:'one', value: 'One'},
      {id:'two', value: 'Two'},
      {id:'three', value: 'Three'}
    ]
  };

  let partners_checkbox = {
    options: [
      {id: 'tryus', value: 'TryUs. Software'},
      {id: 'twitter', value: 'Twitter'},
      {id: 'google', value: 'Google'},
      {id: 'vuemastery', value: 'Vue Mastery'}
    ]
  };

  let message_textarea = {

  };

  return {
    age: age,
    name: name,
    gender_select: gender_select,
    message_textarea: message_textarea,
    preference_radio: preference_radio,
    partners_checkbox: partners_checkbox
  }

})();

module.exports = user;
