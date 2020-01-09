import 'dotenv/config';
import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';

import User from '../app/models/User';
import Card from '../app/models/Card';

const models = [User, Card];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(process.env.DATABASE_URL, dataBaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
