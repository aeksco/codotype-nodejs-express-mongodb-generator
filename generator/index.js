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
// Defines typed generator constant
const generator = {
    name: "ExpressJS + MongoDB API",
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.composeWith("./api_base");
            yield this.composeWith("./api_environment");
            yield this.composeWith("./api_controller");
            yield this.composeWith("./api_model");
            yield this.composeWith("./api_routes");
            yield this.composeWith("./docker_compose");
            // await this.composeWith("./api_resource_spec");
        });
    },
};
module.exports = generator;
//# sourceMappingURL=index.js.map