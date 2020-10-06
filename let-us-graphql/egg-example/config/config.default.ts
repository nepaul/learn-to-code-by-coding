import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1593250953582_9448";

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.security = {
    csrf: {
      ignore: () => true,
    },
  };

  config.graphql = {
    router: "/graphql",
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    apolloServerOptions: {
      tracing: true, // 设置为true时，以Apollo跟踪格式收集和公开跟踪数据
      debug: true, // 一个布尔值，如果发生执行错误，它将打印其他调试日志记录
    },
  };

  exports.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "egg_graphql_example_development",
  };

  // add your egg config in here
  config.middleware = ["graphql"];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
