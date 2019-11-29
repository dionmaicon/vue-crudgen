const capitalize = require("../libs/capitalize");
const pluralize = require("pluralize");

const Service = class {
  constructor(config) {
    this.config = config;
  }

  getTemplate() {
    let name = capitalize(this.config.name);
    let pluralizedName = pluralize(name);

    let template = `
    import service from "@/services/httpService";

    const END_POINT = "/${this.config.resource.endPoint}";

    const get${name} = id => service.get(END_POINT + "/" + id);

    const getAll${pluralizedName} = params => service.get(END_POINT, { params });

    const create${name} = ${this.config.name} => service.post(END_POINT,  ${this.config.name} );

    const update${name} = ${this.config.name} => service.put(END_POINT  + "/" + id,  ${this.config.name} );

    const delete${name} = id => service.delete(END_POINT  + "/" + id);

    export {
      get${name},
      getAll${pluralizedName},
      create${name},
      update${name},
      delete${name}
    };
    `;
    return template;
  }
};

module.exports = Service;
