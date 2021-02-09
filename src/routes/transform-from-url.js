const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { downloadImage, removeImage, extract, resize, trim, changeExtension } = require('../utils');

const transform = (req, res) => {
    const {
        url,
        width,
        height,
        crop,
        trim,
        format
    } = req.query;

    downloadImage(url, uuidv4())
        .then(({ imageName, imagePath, mime }) => {
            try {
                // actions



                const s = fs.createReadStream(imagePath);
                s.on('open', function () {
                    res.set('Content-Type', mime);
                    s.pipe(res);
                });
                s.on('error', function () {
                    throw new Error();
                });
            } catch (err) {
                res.status(400).json({ message: 'Could not edit image' });
            }
            removeImage(imageName);
        })
        .catch(err => res.status(400).json({ message: "Could not find image in " + url }));
}

module.exports = transform;