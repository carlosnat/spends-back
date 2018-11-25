const mongoose = require('mongoose');
const dbDebuger = require('debug')('app:database');

class DataBase {
    constructor() {
        this.dataBase = process.env.DATABASE;
        this.dbDebuger = dbDebuger;
    }

    connect() {
        mongoose.connect(this.dataBase, () => {
            this.dbDebuger('Connecting to database -> ', this.dataBase);
        });
    }
}

module.exports = new DataBase();