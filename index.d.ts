declare namespace KaiLogs {

    interface ExceptionHandler {
        logger: Logger;
        catcher: Function | boolean;

        handle(): void;
        unhandle(): void;
    
        new(logger: Logger): ExceptionHandler;
    }

    interface Logger {
        debug(): void;
        delete(): void;
        error(): void;
        info(): void;
        log(): void;
        message(): void;
        save(): void;
        warn(): void;
        write(): void;
    }

    interface RejectionHandler {
        logger: Logger;
        catcher: Function | boolean;

        handle(): void;
        unhandle(): void;
    
        new(logger: Logger): RejectionHandler;
    }
}

export = KaiLogs