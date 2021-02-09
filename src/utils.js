const fs = require('fs');
const path = require('path');
const request = require('request');

const tmp = path.resolve(__dirname, '..', 'tmp');

module.exports.downloadImage = (url, uuid) => {
    return new Promise((resolve, reject) => {
        request.head(url, function (err1, res, body) {
            if (err1)
                return reject(err1);

            const imageType = res.headers['content-type'].split('image/')[1];
            const imageName = `${uuid}.${imageType}`;
            const imagePath = path.join(tmp, imageName);

            request(url).pipe(fs.createWriteStream(imagePath)).on('close', (err2) => {
                if (err2)
                    return reject(err2);

                resolve({
                    imageName,
                    imagePath,
                    mime: res.headers['content-type']
                });
            });
        });
    });
}

module.exports.saveImage = (binary, uuid) => {

}

module.exports.removeImage = (image) => {
    try {
        fs.unlinkSync(path.join(tmp, image));
    } catch (err) {
        console.error(err);
    }
}

module.exports.extract = (crop, image) => {
    if (!crop || crop.split(',') != 4)
        return;

    const [left, top, width, height] = crop.split(',');
}

module.exports.resize = (width, height, image) => {
    if (!width && !height)
        return;
}

module.exports.changeExtension = (format, image) => {

}

module.exports.trim = (trim, format, image) => {
    if (!trim || format != 'png')
        return;
}