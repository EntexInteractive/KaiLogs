declare namespace KaiLogs {
    export function createLog(
        /**
         * Creates a new log in the specified path.
         */
        path: string
    )

    export function loadLog(
        /**
         * Loads the latest log in the specified path.
         * 
         * If file doesn't exist it will create a new one.
         */
        path: string
    )

    export function log(
        /**
         * Prints to the console and sends the line to be logged.
         */
        message: string,
        where?: "main" | "events" | "commands" | "database",
        type?: "DEBUG" | "INFO" | "WARN" | "ERROR"
    )

    export function write(
        /**
         * Just prints to the console. Does NOT send to be logged.
         * 
         */
        message: string,
        where?: "main" | "events" | "commands" | "database",
        type?: "DEBUG" | "INFO" | "WARN" | "ERROR"
    )

    export function save()
}

export = KaiLogs