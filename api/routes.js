'use strict'

module.exports = function(app, model, path){
    
    app.get('/api/'+path, async (req, res) => {
        try {
            const modelFound = await model.find(req.body);
            res.json(modelFound);
        } catch (err) {
            res.status(502).json({err})
        }
    })

    app.post('/api/'+path, async (req, res) => {
        try {
            const modelCreated = await model.create(req.body);
            res.json(modelCreated);
        } catch (err) {
            res.status(502).json({err})
        }
    })

    app.put('/api/'+path, async (req, res) => {
        try {
            const modelUpdated = await model.findByIdAndUpdate(req.body._id, req.body, {new: true});
            res.json(modelUpdated);
        } catch (err) {
            res.status(502).json({err})
        }
    });

    app.delete('/api/'+path, async (req, res) => {
        console.log('query', req.query._id)
        try {
            const modelDeleted = await model.remove({_id:req.query._id});
            res.json(modelDeleted);
        } catch (err) {
            res.status(502).json({err})
        }
    });
}
