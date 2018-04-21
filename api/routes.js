'use strict'

module.exports = function(app, model, path){
    
    app.get('/api/'+path, function(req, res){
        model.find(req.body).then(function(data){
            res.json(data);
        })
    })

    app.post('/api/'+path, function(req, res){
        model.create(req.body).then(function(data){
            res.json(data);
        });
    })

    app.put('/api/'+path, function(req, res){
        model.findOneAndUpdate({_id:req.body._id}, req.body).then(function(data){
            res.json(data);
        });
    });

    app.delete('/api/'+path, function(req, res){
        model.remove({_id:req.query._id}).then(function(data){
            res.json(data);
        });
    });
}
