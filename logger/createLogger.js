import winston from "winston";

const errorLogFileName = 'logfile-error.log';
const combinedLogFileName = 'logfile-combined.log';

const createLogger = () => {
    const logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.simple(),
            winston.format.errors({stack: true}),
            winston.format.json(),
        ),
        transports: [
            new winston.transports.File({filename: errorLogFileName, level: 'error'}),
            new winston.transports.File({filename: combinedLogFileName})
        ],
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }))
    }

    return logger;
};

export default createLogger
