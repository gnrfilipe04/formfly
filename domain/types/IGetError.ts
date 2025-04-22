export interface IGetError {
    type: 'ValidationError' | 'NetworkError' | 'UnknownError',
    title: string,
    message: string,
    details?: unknown
}