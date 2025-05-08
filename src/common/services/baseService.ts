import 'reflect-metadata';
import { container } from 'tsyringe';
import { LanguageService } from './languageService';
import { StorageService } from './storageService';
import { LogggingService } from './loggingService';
import { StatusCode } from 'one-frontend-framework';

/**
 * For error system throwing
 */
export class SystemError {
    public code = 0;
    public message = '';
}

/**
 * App error
 */
export class AppError extends Error {
    public onApp: boolean = true;
}

/**
 * Base service
 */
export class BaseService {
    protected readonly languageService: LanguageService = container.resolve(LanguageService);
    protected readonly loggingService: LogggingService = container.resolve(LogggingService);
    protected readonly storageService: StorageService = container.resolve(StorageService);

    /**
     * Handle error
     * @param error 
     * @returns 
     */
    public handleError<T extends Error>(error: T): SystemError {
        const me = this;
        me.loggingService.logError(error);
        if (error instanceof AppError) {
            return {
                code: StatusCode.InternalServerError,
                message: error.message
            } as SystemError;
        }
        return {
            code: StatusCode.InternalServerError,
            message: 'Unknow error'
        } as SystemError;
    }
}