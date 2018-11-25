const mongoose = require('mongoose');
const dbDebuger = require('debug')('app:database');

class DataBase {
    constructor() {
        this.dataBase = process.env.DATABASE;
        this.dbDebuger = dbDebuger;
    }

    connect() {
        return mongoose.connect(this.dataBase)
        .then( res => {
            this.dbDebuger('connected to database -> ', this.dataBase);
        })
        .catch( err => {
            this.dbDebuger('Connecting to database -> ', err);
        });
    }
}

module.exports = new DataBase();