# vue-crudgen
CRUD (Create, Read, Update and Delete) basic generator for Vue.js

[![Coverage Status](https://coveralls.io/repos/github/dionmaicon/vue-crudgen/badge.svg?branch=master)](https://coveralls.io/github/dionmaicon/vue-crudgen?branch=master)
[![Build Status](https://travis-ci.org/dionmaicon/vue-crudgen.svg?branch=master)](https://travis-ci.org/dionmaicon/vue-crudgen)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=dionmaicon_vue-crudgen&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=dionmaicon_vue-crudgen)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=dionmaicon_vue-crudgen&metric=ncloc)](https://sonarcloud.io/dashboard?id=dionmaicon_vue-crudgen)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=dionmaicon_vue-crudgen&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=dionmaicon_vue-crudgen)
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=dionmaicon_vue-crudgen)](https://sonarcloud.io/dashboard?id=dionmaicon_vue-crudgen)

The focus this package is front-end with vue..

Best practices for better RESTful API:

![image](https://user-images.githubusercontent.com/19849921/51780016-45660880-20f2-11e9-9d59-dec28b1bc5aa.png)


Result for a model generate for this tool:

![vue-crudgen-laptop with hidpi screen](https://user-images.githubusercontent.com/19849921/51761375-05803080-20b4-11e9-9cab-055008397c32.png)


Install Vue CLI and Vue-Crudgen.
```
npm install -g @vue/cli
npm install -g vue-crudgen

```

How to do?

First of all, You need create a Vue-project and set up your structure of files. My default configurations is babel, pwa, router, vuex, eslint, unit-jest.
```
vue create <your-project>

```
Now init Vue-Crudgen structure project pattern.

```
cd <you-root-project-path>
vue-crudgen -i
```
After run the command just wait some seconds for scaffold and lint.
Now you need to create models.
```
mkdir models
cd models
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
IMPORTANT!! Vue crud Generator uses eslint to prettier/vue code. Check dependencies.

```
//.eslintrc
...
'extends': [
  'plugin:prettier/recommended',
  'plugin:vue/essential',
],
...
```
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
    ├── router
    |    ├──index.js
    ├── services
        ├──service.js
    ├── models
    │   ├── user.js

```
Execute in root of the project:

```
vue-crudgen -m ./src/models/
```

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
    │   ├── author
    │   │   ├── AuthorCreate.vue
    │   │   ├── AuthorEdit.vue
    │   │   ├── AuthorForm.vue
    │   │   ├── AuthorIndex.vue
    │   │   └── AuthorView.vue
    ├── helpers
    │   └── alert.vue
    ├── App.vue
    ├── main.js
    ├── router
    |    ├──index.js
    ├── routes
    |    ├──author.js
    |    ├──index.js
    ├── services
    |    ├──author.js
    |    ├──service.js
    ├── store
    |    ├──modules
    |    |  ├──author.js
    |    |  ├──index.js
    |    ├──index.js
    ├── models
    │   ├── author.js
    |
```
Others models:

```
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
  hidden_fields: ["price", "ISBN"]
};

module.exports = { model, resource };


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
