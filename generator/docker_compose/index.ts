import { ConstructorOptions } from "@codotype/generator";

const Generator: ConstructorOptions = {
  name: "NodeExpressDockerCompose",
  async write({ project }) {
    // Pulls `generate_docker_compose` from configuration.options
    // const { generate_docker_compose } = project.configuration.options;
    const generate_docker_compose = true;

    // Short-circuits generator execution if `generate_docker_compose` is not defined
    if (!generate_docker_compose) {
      return;
    }

    await this.renderComponent({
      src: "docker-compose.yml",
      dest: "docker-compose.yml",
    });
    await this.renderComponent({
      src: "docker-compose-dev.yml",
      dest: "docker-compose-dev.yml",
    });
  },
};

export = Generator;
