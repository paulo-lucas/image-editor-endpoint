const fs = require('fs');
const path = require('path');
const request = require('request');
const fetch = require('node-fetch');

const tmp = path.resolve(__dirname, '..', '..', 'tmp');

module.exports.downloadImageV1 = (url, uuid) => {
    return new Promise((resolve, reject) => {
        request.head(url, function (err1, res, body) {
            if (err1)
                return reject(err1);

            const imageMime = res.headers['content-type'] || `image/${url.split('.')[url.split('.').length - 1]}`;
            const imageType = res.headers['content-type'].split('image/')[1] || url.split('.')[url.split('.').length - 1];
            const imageName = `${uuid}.${imageType}`;
            const imagePath = path.join(tmp, imageName);

            console.log(res.headers)
            if (!["png", "jpg", "jpeg"].includes(imageType))
                return reject("Image type not accepted");


            try {
                request(url).pipe(fs.createWriteStream(imagePath)).on('close', () => {
                    resolve({
                        imageName,
                        imagePath,
                        imageMime
                    });
                });
            } catch (err2) {
                reject(err2);
            }
        });
    });
}

module.exports.downloadImageV2 = (url, uuid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, { redirect: 'follow', follow: 20 });
            const buffer = await response.buffer();

            const imageMime = response.headers.get('content-type') || `image/${url.split('.')[url.split('.').length - 1]}`;
            const imageType = response.headers.get('content-type').split('image/')[1] || url.split('.')[url.split('.').length - 1];
            const imageName = `${uuid}.${imageType}`;
            const imagePath = path.join(tmp, imageName);

            console.log(imageMime, imageType, imageName, imagePath)
            console.log(response.headers.raw())

            if (!imageMime || !imageType || !imageName || !imagePath)
                return reject("Something went wrong.")

            if (!["png", "jpg", "jpeg"].includes(imageType))
                return reject("Image type not accepted");

            fs.writeFile(imagePath, buffer, () => {
                resolve({ imageName, imagePath, imageMime });
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports.saveUploadedImage = (binary, uuid) => {

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
    if (!["png", "jpg", "jpeg"].includes(format) || String(image).includes(format))
        return;
}

module.exports.trimAction = (trim, format, image) => {
    if (!trim || format != 'png')
        return;
}