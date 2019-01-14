const resource = {
  endPoint: "https://vuejs-resource-tutorial.firebaseio.com/data.json"
}

const model = (function() {

  let name = {
    value: '',
    required: true,
    type: 'text',
  };

  let birth =  {
    value: '',
    required: true,
    type: 'date'
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

  let picture_file = {
    type: 'file',
    placeholder: 'Get the file',
    required: true
  };

  let hide = ['picture', 'message', 'partners', 'preference', 'gender']

  return {
    name: name,
    birth: birth,
    picture_file: picture_file,
    gender_select: gender_select,
    message_textarea: message_textarea,
    preference_radio: preference_radio,
    partners_checkbox: partners_checkbox,
    hide: hide
  }

})();

module.exports =  {model, resource};
