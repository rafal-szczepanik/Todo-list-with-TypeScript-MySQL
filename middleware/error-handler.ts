class ValidationError extends Error {
    message: string;
    statusCode: number

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const createCustomError = (msg, statusCode) => {
    throw new ValidationError(msg, statusCode);
};

export const handleError = (err, req, res, next) => {
    return err instanceof ValidationError
        ? res.status(err.statusCode).json({msg: err.message})
        : res.status(500).json({msg: 'Something went wrong, please try again'});
};


