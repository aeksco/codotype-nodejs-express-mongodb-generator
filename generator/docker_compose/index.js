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
    name: "NodeExpressDockerCompose",
    write({ project }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pulls `generate_docker_compose` from configuration.options
            // const { generate_docker_compose } = project.configuration.options;
            const generate_docker_compose = true;
            // Short-circuits generator execution if `generate_docker_compose` is not defined
            if (!generate_docker_compose) {
                return;
            }
            yield this.renderComponent({
                src: "docker-compose.yml",
                dest: "docker-compose.yml",
            });
            yield this.renderComponent({
                src: "docker-compose-dev.yml",
                dest: "docker-compose-dev.yml",
            });
        });
    },
};
module.exports = Generator;
//# sourceMappingURL=index.js.map