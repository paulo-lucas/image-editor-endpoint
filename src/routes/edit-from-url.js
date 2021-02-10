const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { downloadImageV2, removeImage, extract, resize, trimAction, changeExtension } = require('../utils/actions');

const transform = (req, res) => {
    const {
        url,
        width,
        height,
        crop,
        trim,
        format
    } = req.query;

    downloadImageV2(url, uuidv4())
        .then(({ imageName, imagePath, imageMime }) => {
            try {
                // actions
                // extract(crop, imageName);
                // resize(width, height, imageName);
                // changeExtension(format, imageName);
                // trimAction(trim, format, imageName);

                // const s = fs.createReadStream(imagePath);
                // s.on('open', function () {
                //     res.set('Content-Type', imageMime);
                //     s.pipe(res);
                // });
                // s.on('error', function () {
                //     throw new Error();
                // });
                res.send('Em construção')
            } catch (err) {
                res.status(400).json({ message: 'Could not edit image' });
            }
            // removeImage(imageName);
        })
        .catch(err => res.status(400).json({ message: "Could not find image in " + url }));
}

module.exports = transform;