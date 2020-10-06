import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  graphql: {
    enable: true,
    package: "@switchdog/egg-graphql",
  },
  sequlize: {
    enable: true,
    package: "egg-sequelize",
  },
};

export default plugin;
