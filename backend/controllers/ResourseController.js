let path = require('path');

const photoDir = __dirname + '/../photos/';

exports.sendPhoto = (req, res) => {
    let photoName = req.body.photo;
    res.set('Content-Type', 'image/jpeg');
    res.sendFile(path.resolve(photoDir + photoName));
}