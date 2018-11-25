const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, () => {
    console.log('Connecting to database -> ', process.env.DATABASE);
});
