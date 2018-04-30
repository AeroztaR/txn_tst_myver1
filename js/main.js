'use strict';

// 1. Promises

let doc = document,
    myBtn = doc.querySelector('.myBtn'),
    myResult = doc.querySelector('.myResult');

function dataSend(url) {
    return new Promise ((resolve, reject) => {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status == 200){
                resolve(JSON.stringify(JSON.parse(xhr.response), null, '\t'));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => {
            reject(xhr.statusText);
        };
        xhr.send();
    });
};


myBtn.addEventListener('click', () => {
    let promise = dataSend('test.json');

    promise
    .then((test) => {
        myResult.innerText = test;
    })
    .catch((error) => {
        myResult.innerText = 'EPIC FAIL BRO!';
    });
});


// 2. Equality

let Equal = (a, b) => {
    if (a === b) {
        return true;
    } else if (a && b && typeof a === 'object' && typeof b === 'object' && Object.keys(a).length === Object.keys(b).length) {
        if (Array.isArray(a) === Array.isArray(b)) {
            for (let key in a) {
                if (key in b) {
                    if(!Equal(a[key], b[key])) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
};

console.log(Equal(1, 1)); // true
console.log(Equal({ a: [1, 2, 3], b: { foo: 'bar' } }, { a: [1, 2, 3], b: { foo: 'bar' } })); // true
console.log(Equal({ a: 1, b: 2 }, { a: 1, c: 2 })); // false
