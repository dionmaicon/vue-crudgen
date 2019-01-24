# vue-crudgen
CRUD (Create, Read, Update and Delete) basic generator for Vue.js

mkdir models

cd models

touch user.js

```javascript
//user.js

//Resource object hold the rest api address
const resource = {
  endPoint: 'http://localhost:3002/users'
}

//Hide properties not are shows in the tables use "hide"
//Properties suffix with _select, _radio, _file, _checkbox and _textarea are especials
const model = ( function (){
  return  {
    'username': {
      type: 'text',
      required: 'true'
    },
    'password': {
      type: 'password',
      required: true
    },
    'name': {
      type: 'text',
      required: true
    },
    'email':{
      type: 'email',
      required: true
    },
    'typeDoc_select': {
      options: [{ text: "Type 1", value: 1}, { text: "Type 2", value: 0}]
    },
    'doc': {
        type: 'text',
        required : true,
        placeholder:"###.###.###-##",
        title:"CPF 999.999.999-99",
        pattern: "\d{3}\.\d{3}.\d{3}-\d{2}"
    },
    'dataNasc': {
      type: 'date',
    },
    'active_radio': {
      options: [
        {id:'Active', value: 'Yes'},
        {id:'Inactive', value: 'No'}
      ]
    },
    'hide': ['username','password', 'dataNasc', 'active',  'doc' ]
  }
})();

module.exports = {model, resource}

```
After create a model, execute at command line:

vue-crudgen -m models/ -c path-to-components/ -a path-to-sources-file/

Vue crud Generator use eslint to prettier/vue code.

Example: 
```
./
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── index.html
├── README.md
└── src
    ├── assets
    │   └── logo.png
    ├── App.vue
    ├── main.js
    ├── router.js
    ├── models
    │   ├── user.js
    
```
Execute in root of the project:

vue-crudgen -m src/models/ -a src/

Will be generate the follow:

```
./
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── index.html
├── README.md
└── src
    ├── assets
    │   └── logo.png
    ├── components
    │   ├── user
    │   │   ├── userCreate.vue
    │   │   ├── userEdit.vue
    │   │   ├── userForm.vue
    │   │   ├── userIndex.vue
    │   │   └── userView.vue
    │   ├── home.vue
    │   └── menu.vue
    ├── helpers
    │   └── alert.vue
    ├── App.vue
    ├── main.js
    ├── router.js
    ├── models
    │   ├── user.js
    |
```




