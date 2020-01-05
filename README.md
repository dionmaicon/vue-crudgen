# vue-crudgen
CRUD (Create, Read, Update and Delete) basic generator for Vue.js - Beta.

[![Coverage Status](https://coveralls.io/repos/github/dionmaicon/vue-crudgen/badge.svg?branch=master)](https://coveralls.io/github/dionmaicon/vue-crudgen?branch=master)
[![Build Status](https://travis-ci.org/dionmaicon/vue-crudgen.svg?branch=master)](https://travis-ci.org/dionmaicon/vue-crudgen)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=dionmaicon_vue-crudgen&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=dionmaicon_vue-crudgen)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=dionmaicon_vue-crudgen&metric=ncloc)](https://sonarcloud.io/dashboard?id=dionmaicon_vue-crudgen)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=dionmaicon_vue-crudgen&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=dionmaicon_vue-crudgen)
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=dionmaicon_vue-crudgen)](https://sonarcloud.io/dashboard?id=dionmaicon_vue-crudgen)

The focus this package is front-end with vue.

Next Releases:
- Vuetify
- Typescript

Best practices for better RESTful API:

| Resource      | GET (Read) | POST (Create)  | PUT (Update) | DELETE (Delete) |
| ------------- | ------------- |------------- | ------------- |------------- |
| /users        | Return a list of Users  | Create a new User  | Bulk Update of Users  | Delete all Users  |
| /users/123    | Returns a Specific User  | (405)  | Update a Specific User  | Delete a Specific User  |

Result for a model generate for this tool:

![vue-crudgen-laptop with hidpi screen](https://user-images.githubusercontent.com/19849921/51761375-05803080-20b4-11e9-9cab-055008397c32.png)


Install Vue-CLI and Vue-Crudgen.
```
npm install -g @vue/cli
npm install -g vue-crudgen

```

How to do?

You need to create a Vue-project and setup your structure of files. My Recomended configuration is: Babel, PWA, Router, Vuex, Eslint and Unit-Jest.
```
vue create <your-project-name>

```

IMPORTANT!! Vue crud Generator uses eslint to prettier/vue code. Check dependencies. You need to create or edit an .eslintrc.js file.

```
//.eslintrc.js
...
'extends': [
  'plugin:prettier/recommended',
  'plugin:vue/essential',
],
...
```

Now init Vue-Crudgen structure project pattern.
```
cd <you-root-project-path>
vue-crudgen -i
```
After run the command just wait some seconds for scaffold and lint.
Now you need to create models.
```
mkdir src/models
cd src/models
touch author.js
```
Files *.js models objects should be named in singular.

```javascript
//author.js

const resource = {
  endPoint: "authors"
};

const model = {
  name: {
    type: "text",
    required: true
  },
  birth: {
    type: "date",
    required: true
  },
  active: {
    type: "radio",
    options: [{ id: "Active", value: true }, { id: "Inactive", value: false }]
  },
  sponsor: {
    type: "select",
    options: ["Patreon", "Legacy"]
  }
};

module.exports = { model, resource };

```
After create a model, execute at command line:
```
vue-crudgen -m ./src/models/
```
After run, you will see something like this in your project structure:
```
project/
├── babel.config.js
├── jest.config.js
├── node_modules
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── img
│   ├── index.html
│   └── robots.txt
├── README.md
│   ├── src
│   |  ├── App.vue
│   |  ├── assets
│   |  |  └── logo.png
│   |  ├── components
│   |  │   ├── author
│   |  │   └── HelloWorld.vue
│   |  ├── helpers
│   |  │   └── alert.vue
│   |  ├── main.js
│   |  ├── models
│   |  │   └── author.js
│   |  ├── registerServiceWorker.js
│   |  ├── router
│   |  │   └── index.js
│   |  ├── routes
│   |  │   ├── author.js
│   |  │   └── index.js
│   |  ├── services
│   |  │   ├── author.js
│   |  │   └── httpService.js
│   |  ├── store
│   |  │   ├── index.js
│   |  │   └── modules
│   |  └── views
│   |  ├── About.vue
│   |  └── Home.vue
└── tests
    └── unit
```
You still have to create a .env file with your API base url or edit httpService.js in services directory.
```
VUE_APP_BASE_URL=http://localhost:8081
```
Now in your root project, start the app and browse to http://localhost:8080/author.

```
npm run serve

```

To test your requests, you can use this repository https://github.com/dionmaicon/books-backend. Follow the instructions in the page and run the backend.

Others models:

``` javascript
//book.js
const resource = {
  endPoint: "books"
};

const model = {
  title: {
    type: "text",
    required: true
  },
  ISBN: {
    type: "number",
    required: true
  },
  authors: {
    type: "oneToMany",
    attribute: "name",
    model: "author"
  },
  publishing: {
    type: "oneToOne",
    attribute: "name",
    model: "publishing"
  },
  year: {
    type: "number",
    required: true
  },
  price: {
    type: "currency"
  },
  fields: {
    type: "hiddenFields",
    options: ["price", "ISBN"]
  }
};
module.exports = { model, resource };
```

``` javascript
//publishing.js

const resource = {
  endPoint: "publishings"
};

const model = {
  name: {
    type: "text",
    required: true
  }
};

module.exports = { model, resource };
```
