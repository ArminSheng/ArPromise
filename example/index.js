import Promise from '../src/Promise';

var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('some msg');
        }, 1000);
    });

promise.then(function(res) {
    let ele = document.createElement('p');
    ele.innerHTML = res;
    document.body.appendChild(ele);
    console.log('result: ' + res);
    let pm = Promise.resolve('2th msg');
    // return pm;
}).then(function(res) {
    console.log('next: ' + res);
}).then(function(res) {
    console.log(res)
})
console.log(promise)