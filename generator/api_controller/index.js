"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const generator = {
    name: "NodeExpressController",
    forEachSchema({ project, schema }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pulls `generate_api_doc` from configuration.options
            // Used to conditionally generate APIDoc headers
            // const { generate_api_doc = false } = project.configuration.documentation;
            const generate_api_doc = false;
            // Pulls schema api_actions
            let schemaApiActions = [];
            if (project.configuration.api_actions &&
                project.configuration.api_actions[schema.identifiers.singular.snake]) {
                schemaApiActions =
                    project.configuration.api_actions[schema.identifiers.singular.snake];
            }
            // Defines the schema-specific destination
            let resourceDest = "src/api/" + schema.identifiers.singular.snake;
            // Ensures the presence of the directory
            yield this.ensureDir(resourceDest);
            // Deconstructs schema attributes
            let defaultModel = this.buildDefault({ schema, schemas: project.schemas });
            // TODO - might be helpful to abstract into util, or parent generator?
            let inlineDeconstruction = Object.keys(defaultModel).join(", ");
            let objectKeys = Object.keys(defaultModel);
            // src/api/resource/resource.controller.js
            yield this.renderComponent({
                src: "resource.controller.js",
                dest: resourceDest +
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
            yield this.renderComponent({
                src: "resource.router.js",
                dest: resourceDest + "/index.js",
                data: { schema, schemaApiActions },
            });
        });
    },
};
module.exports = generator;
//# sourceMappingURL=index.js.map