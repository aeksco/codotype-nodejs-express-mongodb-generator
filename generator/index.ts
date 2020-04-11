// TODO - rename constructor options
import { ConstructorOptions } from "@codotype/generator";

// Defines typed generator constant
const generator: ConstructorOptions = {
  name: "ExpressJS + MongoDB API",
  async write() {
    await this.composeWith("./api_base");
    await this.composeWith("./api_environment");
    await this.composeWith("./api_controller");
    await this.composeWith("./api_model");
    await this.composeWith("./api_routes");
    await this.composeWith("./docker_compose");
    // await this.composeWith("./api_resource_spec");
  },
};

// exports generator constructor options
export = generator;
