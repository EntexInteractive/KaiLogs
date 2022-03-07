/**
 * Class for handling 'uncaughtRejection' events.
 * 
 * (C) Enigma Software
 */

const Events = require('./events');

class RejectionHandler {
    constructor(logger) {
        if(!logger) {
            throw new Error("[NO_LOGGER]: logger is needed to handle rejections");
        }

        this.logger = logger;
    }

    /**
     * Handles 'uncaughtRejection' events for the current process.
     * @returns {undefined}
     */
    handle() {
        if(!this.catcher) {
            this.catcher = this._onRejection.bind(this);
            process.on('unhandledRejection', this.catcher);
        }
    }

    /**
     * Removes the handler tied to the 'uncaughtRejection' event
     * @returns {undefined}
     */
    unhandle() {
        if(this.catcher) {
            process.removeListener('uncaughtRejection', this.catcher);
            this.catcher = false;
        }
    }

    _onRejection(err) {
        this.logger.error(err.stack);
    }
}

module.exports = RejectionHandler;