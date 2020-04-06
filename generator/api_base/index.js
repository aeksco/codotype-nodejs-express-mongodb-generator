module.exports = {
  name: "NodeExpressBase",
  async write({ project }) {
    // Copies server base code
    await this.copyDir({ src: "", dest: "" });

    // Isolates UserSchema + build inlineDeconstruction
    // const userSchema = project.schemas.find((s) => s.identifier === "user");
    // const inlineDeconstruction = userSchema.attributes
    //   .map((r) => r.identifier)
    //   .join(", ");

    // Renders auth controller
    // await this.renderComponent({
    //   src: "src/api/auth/auth.controller.js",
    //   dest: "src/api/auth/auth.controller.js",
    //   data: { inlineDeconstruction },
    // });

    // Writes LICENSE + package.json
    await this.renderComponent({ src: "LICENSE", dest: "LICENSE" });
    await this.renderComponent({ src: "package.json", dest: "package.json" });
  },
};
