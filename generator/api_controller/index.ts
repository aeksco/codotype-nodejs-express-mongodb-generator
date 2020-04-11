// TODO - rename constructor options
import { ConstructorOptions } from "@codotype/generator";

const generator: ConstructorOptions = {
  name: "NodeExpressController",
  async forEachSchema({ project, schema }) {
    // Pulls `generate_api_doc` from configuration.options
    // Used to conditionally generate APIDoc headers

    // const { generate_api_doc = false } = project.configuration.documentation;
    const generate_api_doc = false;

    // Pulls schema api_actions
    let schemaApiActions = [];
    if (
      project.configuration.api_actions &&
      project.configuration.api_actions[schema.identifiers.singular.snake]
    ) {
      schemaApiActions =
        project.configuration.api_actions[schema.identifiers.singular.snake];
    }

    // Defines the schema-specific destination
    let resourceDest = "src/api/" + schema.identifiers.singular.snake;

    // Ensures the presence of the directory
    await this.ensureDir(resourceDest);

    // Deconstructs schema attributes
    let defaultModel = this.buildDefault({ schema, schemas: project.schemas });
    // TODO - might be helpful to abstract into util, or parent generator?
    let inlineDeconstruction = Object.keys(defaultModel).join(", ");
    let objectKeys = Object.keys(defaultModel);

    // src/api/resource/resource.controller.js
    await this.renderComponent({
      src: "resource.controller.js",
      dest:
        resourceDest +
        "/" +
        schema.identifiers.singular.snake +
        ".controller.js",
      data: {
        schema,
        generate_api_doc,
        schemaApiActions,
        inlineDeconstruction,
        objectKeys,
      },
    });

    // src/api/resource/index.js
    await this.renderComponent({
      src: "resource.router.js",
      dest: resourceDest + "/index.js",
      data: { schema, schemaApiActions },
    });
  },
};

export = generator;
