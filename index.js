let resize = { h: 100, w: 100 };
let originalImage = [];

function onChange(e) {
    let zakerxa = new ZakerxaImage();
    if (window.File && window.FileList && window.FileReader) {
        // Convert to File Object
        let files = Array.prototype.slice.call(e.files);
        // For Preview
        files.map(file => zakerxa.preview(file, resize).then(src => createImgTag(file.name, src, resize)));
        // For inputImage
        files.map(file => zakerxa.getFile(file).then(src => originalImage.push(src)));
    }

}

function remove(id) {
    let imgId = document.getElementById(id);
    originalImage.remove(originalImage.find(file => file.name == imgId.alt));
    imgId.parentNode.removeChild(imgId);
}

function createImgTag(name, src, resize) {
    var e = document.createElement("img");
    e.setAttribute("alt", name);
    e.setAttribute("id", makeid(10));
    e.setAttribute("onclick", "remove(this.id)");
    e.setAttribute("src", URL.createObjectURL(src));
    if (!resize) {
        e.setAttribute("height", "100");
        e.setAttribute("width", "100");
    }
    document.getElementById("preview").appendChild(e);
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}