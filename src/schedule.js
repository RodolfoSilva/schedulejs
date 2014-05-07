(function (root, factory) {
    if (typeof exports === 'object') {
        // Node.
        module.exports = factory.call(root);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () { return factory.call(root) });
    } else {
        // Browser globals (root is window)
        root.Schedule = factory.call(root);
    }
}(typeof window !== 'undefined' ? window : this, function () {

    'use strict';

    var Schedule = function (args) {
        if (!(this instanceof Schedule)) {
            return new Schedule(args);
        }
        this.init.call(this, args);
    }

    Schedule.prototype.VERSION = '1.0.0';

    var mergeObjects = function () {
        var obj = {};
        for(var arg_key in arguments) {
           for(var key in arguments[arg_key]) {
               obj[key] = arguments[arg_key][key];
            }
        }
        return obj;
    };

    var loop = function (callback, interval) {
        var that = this;
        that.settings.intervalID = setInterval(function () {
            that.settings.cycle++;

            callback.call(that, that.settings.cycle);

            if (that.settings.auto_stop) {
                that.settings.auto_stop--;
                (that.settings.auto_stop != 1) || that.stop();
            }
        }, interval);
        return that.settings.intervalID;
    }

    Schedule.prototype.init = function (options) {
        this.settings = {
            options   : mergeObjects({
                second: 0,
                minute: 0,
                hour: 0,
                date: 0,
                month: 0,
                day: 0,
                interval: null
            }, options),
            cycle : 0,
            auto_stop : void 0,
            intervalID : void 0,
            start_delay : void 0
        };

        this.interval();

        return this;
    };

    Schedule.prototype.interval = function (interval) {
        if (this.settings.options.interval === null) {
            this.settings.options.interval = ((this.settings.options.second + (this.settings.options.minute * 60) + (this.settings.options.hour * 3600)) * 1000);
        }
    };

    Schedule.prototype.delay = function () {
        var date_now = new Date(),
            tmp = date_now.getSeconds() - this.settings.options.second;

        this.settings.start_delay = tmp > 0 ? -(tmp - 60) : -tmp;

        /*
        if (options.minute) {
            tmp = options.minute - (date_now.getMinutes() % options.minute);
            if (start && tmp === options.minute) {
             tmp -= 1;
            }
            start += tmp > 0 ? tmp * 60 : 0;
        }
        */

        this.settings.start_delay *= 1000;

        console.log('Starts in ' + this.settings.start_delay  / 1000 + 's');
        console.log('With interval ' + this.settings.options.interval / 1000 + 's');

        return this;
    };

    Schedule.prototype.start = function (callback) {
        this.stop();
        var args = [callback, this.settings.options.interval];

        if (this.settings.start_delay) {
            var that = this;
            setTimeout(function () {
                loop.apply(that, args);
            }, that.settings.start_delay);
        } else {
            loop.apply(this, args);
        }

        return this;
    };

    Schedule.prototype.stop = function (num_cycle) {
        if (num_cycle) {
            if (toString.call(num_cycle) == '[object Number]' && !isNaN(num_cycle) && num_cycle > 0) {
                this.settings.auto_stop = num_cycle + 1;
                return this;
            }
        }

        if (this.settings.intervalID) {
            clearInterval(this.settings.intervalID);
        }

        this.settings.intervalID = void 0;
        this.settings.auto_stop = void 0;
        this.settings.cycle = 0;
        return this;
    };

    return Schedule;
}));
