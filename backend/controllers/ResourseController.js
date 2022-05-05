let path = require('path');

const photoDir = __dirname + '/../photos/';

/**
 * Send client's photo to photo directory
 * @param {Object} req
 * @param {Object} res
 * @param {String} req.body.photo photo name
 */
exports.sendPhoto = (req, res) => {
    let photoName = req.body.photo;
    res.set('Content-Type', 'image/jpeg');
    res.sendFile(path.resolve(photoDir + photoName));
}