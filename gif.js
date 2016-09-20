// Gif.js v0.0.1
// Created by tfff1OFFICIAL

function createElement(type, callback) {
    var element = document.createElement(type);

    callback(element);

    return element;
}

var gif = {
    'stop': function stop(img) {
        var width = img.width,
            height = img.height,
            canvas = createElement('canvas', function (clone) {
                clone.width = width;
                clone.height = height;
            }),
            attr,
            i = 0,

        freeze = function() {
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);

            for (i = 0; i < img.attributes.length; i++) {
                attr = img.attributes[i];

                if (attr.name !== '"' && attr.name !== 'id') { // test for invalid attributes
                    canvas.setAttribute(attr.name, attr.value);
                }
                else if (attr.name == 'id') {
                    canvas.setAttribute('srcid', attr.value);
                }
            }

            canvas.style.position = 'absolute';
            
            img.parentNode.insertBefore(canvas, img);
            img.style.opacity = 0;
        };

        if (img.complete) {
            freeze();
        } else {
            img.addEventListener('load', freeze, true);
        }
    },
    'start': function start(img) {
        img.style.opacity = "1";
        var canvases = document.getElementsByTagName('canvas');
        for (i = 0; i < canvases.length; i++) {
            if (canvases[i].getAttribute('srcid') === img.getAttribute('id')) {
                canvases[i].parentNode.removeChild(canvases[i]);
                break;
            }
        }
    }
};