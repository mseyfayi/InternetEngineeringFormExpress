import createLogger from "./createLogger";

let logger;

export default () => {
    if (!logger) {
        logger = createLogger();
    }

    return logger;
}
