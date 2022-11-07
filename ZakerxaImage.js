class ZakerxaImage {

    constructor() {}

    getFile(file, resize) {
        return new Promise((resolve, reject) => {
            if (file) this.preview(file, resize).then(Blob => {
                const render = new File([Blob], file.name, { lastModified: new Date().getTime(), size: Blob.size, type: Blob.type });
                resolve(render)
            });
            else reject(new Error('No file detect'))
        })
    }

    dataURItoBlob(dataURI) {
        const bytes = (dataURI.toString().split(',')[0].indexOf('base64') >= 0) ? atob(dataURI.split(',')[1]) :
            unescape(dataURI.split(',')[1]);
        const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const max = bytes.length;
        const ia = new Uint8Array(max);
        for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    }

    canvasDataUrl(image, resize) {
        const canvas = document.createElement('canvas');
        let [maxWidth, maxHeight] = [resize.w, resize.h];
        let [imgWidth, imgHeight] = [image.naturalWidth, image.naturalHeight];
        const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        let fw = imgWidth * ratio;
        let fh = imgHeight * ratio;
        if (!(resize.keepRatio ? resize.keepRatio : (resize.keepRatio = false))) {
            fw = resize.w;
            fh = resize.h;
        }
        canvas.width = fw;
        canvas.height = fh;
        canvas.getContext('2d').drawImage(image, 0, 0, fw, fh);
        const dataUrl = canvas.toDataURL('image/jpeg', 1);
        return this.dataURItoBlob(dataUrl);
    }

    preview(file, resize) {
        const reader = new FileReader();
        const image = new Image();
        return new Promise((resolve, reject) => {
            if (!file.type.match(/image.*/)) return reject(new Error('Not an image'));
            reader.onload = () => {
                if (resize) image.onload = () => resolve(this.canvasDataUrl(image, resize));
                else image.onload = () => resolve(this.dataURItoBlob(reader.result))
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    }
}


Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};