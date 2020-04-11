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
    name: "NodeExpressBase",
    write({ project }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Copies server base code
            yield this.copyDir({ src: "", dest: "" });
            // Isolates UserSchema + build inlineDeconstruction
            const userSchema = project.schemas.find((s) => s.identifiers.singular.snake === "user");
            const inlineDeconstruction = userSchema.attributes
                .map((r) => r.identifier)
                .join(", ");
            // Renders auth controller
            yield this.renderComponent({
                src: "src/api/auth/auth.controller.js",
                dest: "src/api/auth/auth.controller.js",
                data: { inlineDeconstruction },
            });
            // Writes LICENSE + package.json
            yield this.renderComponent({ src: "LICENSE", dest: "LICENSE" });
            yield this.renderComponent({ src: "package.json", dest: "package.json" });
        });
    },
};
module.exports = Generator;
//# sourceMappingURL=index.js.map