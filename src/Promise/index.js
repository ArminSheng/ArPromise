class APromise {
    constructor(exec) {
        let self = this;

        this.state = 'pending';
        this.onFullfilled = null;
        this.onRejected = null;

        let resolve = function(val) {
            self.resolve(val);
        };

        let reject = function(err) {
            self.reject(err);
        };

        typeof exec === 'function' && exec(resolve, reject);
    }

    then(resolve, reject) {
        let promise = new APromise();

        this.onFullfilled = function(val) {
            val = resolve ? resolve(val) : val;
            if (val instanceof APromise) {
                val.then(function(res) {
                    promise.resolve(res);
                });
            } else {
                promise.resolve(val);
            }
        };

        this.onRejected = function(err) {
            err = reject ? reject(err) : err;
            promise.reject(err);
        };

        return promise;
    }

    resolve(val) {
        if (this.state === 'pending' || this.state === 'resolved') {
            this.state = 'resolved';
            this.onFullfilled && this.onFullfilled(val);
        }
    }

    reject(err) {
        if (this.state === 'pending' || this.state === 'rejected') {
            this.state = 'rejected';
            this.onRejected && this.onRejected(err);
        }
    }

    catch(reject) {
        return this.then(null, reject);
    }
};

APromise.resolve = function(obj) {
    var promise = new APromise();
    if (obj && typeof obj.then === 'function') {
        for (var i in promise) {
            obj[i] = promise[i];
        }
        return obj;
    }
    else {
        setTimeout(function () {
            promise.resolve(obj);
        });
        return promise;
    }
};

export default APromise;