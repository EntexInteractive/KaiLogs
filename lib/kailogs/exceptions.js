/**
 * Class for handling 'uncaughtException' events.
 * 
 * (C) Enigma Software
 */

class ExceptionHandler {
    constructor(logger) {
        if(!logger) {
            throw new Error("[NO_LOGGER]: logger is needed to handle errors");
        }

        this.logger = logger;
    }

    /**
     * Handles 'uncaughtException' events for the current process.
     * @returns {undefined}
     */
    handle() {
        if(!this.catcher) {
            this.catcher = this._onException.bind(this);
            process.on('uncaughtException', this.catcher);
        }
    }

    /**
     * Removes the handler tied to the 'uncaughtException' event
     * @returns {undefined}
     */
    unhandle() {
        if(this.catcher) {
            process.removeListener('uncaughtException', this.catcher);
            this.catcher = false;
        }
    }

    _onException(err) {
        this.logger.error(err.stack);
    }
}

module.exports = ExceptionHandler;