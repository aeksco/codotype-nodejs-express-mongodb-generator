import { ConstructorOptions } from "@codotype/generator";

const Generator: ConstructorOptions = {
  name: "NodeExpressMongooseModel",
  async forEachSchema({ project, schema }) {
    // Defines the schema-specific destination
    let resourceDest = "src/api/" + schema.identifiers.singular.snake;

    // Ensures the presence of the directory
    await this.ensureDir(resourceDest);

    // Deconstructs schema attributes
    let defaultModel = this.buildDefault({
      schema,
      schemas: project.schemas,
    });
    // TODO - might be helpful to abstract into util, or parent generator?
    let inlineDeconstruction = Object.keys(defaultModel).join(", ");

    // src/api/resource/resource.model.js
    if (schema.identifiers.singular.snake === "user") {
      await this.renderComponent({
        src: "user.resource.model.js",
        dest:
          resourceDest + "/" + schema.identifiers.singular.snake + ".model.js",
        data: { schema, inlineDeconstruction },
      });
    } else {
      await this.renderComponent({
        src: "resource.model.js",
        dest:
          resourceDest + "/" + schema.identifiers.singular.snake + ".model.js",
        data: { schema },
      });
    }
  },
};

export = Generator;
