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
const Generator = {
    name: "NodeExpressMongooseModel",
    forEachSchema({ project, schema }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Defines the schema-specific destination
            let resourceDest = "src/api/" + schema.identifiers.singular.snake;
            // Ensures the presence of the directory
            yield this.ensureDir(resourceDest);
            // Deconstructs schema attributes
            let defaultModel = this.buildDefault({
                schema,
                schemas: project.schemas,
            });
            // TODO - might be helpful to abstract into util, or parent generator?
            let inlineDeconstruction = Object.keys(defaultModel).join(", ");
            // src/api/resource/resource.model.js
            if (schema.identifiers.singular.snake === "user") {
                yield this.renderComponent({
                    src: "user.resource.model.js",
                    dest: resourceDest + "/" + schema.identifiers.singular.snake + ".model.js",
                    data: { schema, inlineDeconstruction },
                });
            }
            else {
                yield this.renderComponent({
                    src: "resource.model.js",
                    dest: resourceDest + "/" + schema.identifiers.singular.snake + ".model.js",
                    data: { schema },
                });
            }
        });
    },
};
module.exports = Generator;
//# sourceMappingURL=index.js.map