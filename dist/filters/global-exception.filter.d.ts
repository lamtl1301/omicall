import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request } from 'express';
export declare class GlobalExceptionFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): void;
}
export interface IResponseError {
    statusCode: number;
    message: string;
    code: string;
    timestamp: string;
    path: string;
    method: string;
}
export declare const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError;
