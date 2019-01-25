# vue-crudgen
CRUD (Create, Read, Update and Delete) basic generator for Vue.js

The focus this package is front-end with vue. The 4 main actions are complete.

Some tips:

Use an API like JSON-SERVER and listen in some port, inform your endPoint in resource const object. Create all files for models and run with option "-a" or "--all".


![vue-crudgen-laptop with hidpi screen](https://user-images.githubusercontent.com/19849921/51761375-05803080-20b4-11e9-9cab-055008397c32.png)

```
mkdir models
cd models
touch user.js
```
Files *.js models objects should be named in singular. 

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
```
vue-crudgen -m models/ -c path-to-components/ -a path-to-sources-file/
```
Vue crud Generator use eslint to prettier/vue code. Check dependencies.

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


Others screenshots

![vue-crudgen-create-iphone](https://user-images.githubusercontent.com/19849921/51761373-04e79a00-20b4-11e9-9adc-56a49384338f.png)
![vue-crud-gen iphone 6_7_8](https://user-images.githubusercontent.com/19849921/51761374-04e79a00-20b4-11e9-91e8-6457bd56c484.png)

