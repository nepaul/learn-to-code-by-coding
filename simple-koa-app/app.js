'use strict';

const path = require('path');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
});
const bookshelf = require('bookshelf')(knex);
const co = require('co');
const koa = require('koa');
const staticServe = require('koa-static');
const devLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const koaValidate = require('koa-validate');
const render = require('koa-ejs');


// DB migration
function* upMigration() {
  const isExist = yield knex.schema.hasTable('infos');
  if (isExist) return;
  yield knex.schema.createTable('infos', function (table) {
    table.increments('id').primary();
    table.time('date'),
    table.string('user', 100);
    table.string('project', 100);
    table.string('video', 100);
    table.text('questionnaire');
  });
}

const InfoModel = bookshelf.Model.extend({
  tableName: 'infos',
});
const infoModelMethods = {
  getAllInfos: function* getAllInfos() {
    const infos = yield new InfoModel().fetchAll();
    if (!infos) return [];
    return infos.toJSON();
  },
  saveInfos: function* saveInfo(date, user, project, video, qustionnaire) {
    const result =  yield new InfoModel({date, user, project, video, qustionnaire }).save();
    return result.toJSON();
  },
};

const InfoController = {
  saveInfo: function* saveInfo() {
    this.checkBody('date').isInt();
    this.checkBody('user').notEmpty().len(1, 100);
    this.checkBody('project').notEmpty().len(1, 100);
    this.checkBody('video').notEmpty().len(1, 100);
    this.checkBody('questionnaire').optional().empty().len(1, 5000);
    if (this.errors) {
      this.body = this.errors;
      return;
    }

    const { date, user, project, video, qustionnaire } = this.body;
    try {
      const result = yield infoModelMethods.saveInfo(date, user, project, video, qustionnaire);
      this.body = { result };
    } catch (error) {
      console.error(error);
      this.throw(500, error.message);
    }
  },
  getAllInfos: function* getAllInfos() {
    try {
      const infos = yield infoModelMethods.getAllInfos();
      yield this.render('info', { infos });
    } catch (error) {
      console.error(error);
    }
  }
};


const app = koa();
app.init = co.wrap(function* init() {
  yield upMigration();

  app.use(staticServe(path.join(__dirname, 'public'), { gzip: true, maxage: 7 * 24 * 60 * 60 * 1000 }));

  render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: true,
  });
  koaValidate(app);
  app.use(devLogger());
  app.use(bodyParser());

  // mount routers
  router
    .get('/', InfoController.getAllInfos)
    .post('/api/info', InfoController.saveInfo);
  app
    .use(router.routes())
    .use(router.allowedMethods());

  const server = app.listen(3000);
  server.on('listening', () => {
    console.log('listening on 3000');
  });
});

if (!module.parent) {
  app.init().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
