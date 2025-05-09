import 'reflect-metadata';
import { AbstractModel, AnyType, ErrorModel as FWErrorModel } from 'one-frontend-framework';

/**
 * Model for showing error
 */
export interface ErrorModel extends FWErrorModel {
    property: string;
    error: string;
}

/**
 * Abstract for model
 */
export abstract class BaseModel extends AbstractModel<ErrorModel> {
    [key: string]: number | string | AnyType;
    public errors: ErrorModel[] = [];

    public checkError(prop: string): boolean {
        const me = this;
        if (me.errors.findIndex(a => a.property === prop) != -1) {
            return true;
        }
        return false;
    }

    public getError(prop: string): string {
        const me = this;
        let errorMessage = '';
        if (me.errors.length > 0) {
            for (const error of me.errors) {
                if (error.property === prop) {
                    errorMessage = error.error;
                }
            }
        }
        return errorMessage;
    }
}