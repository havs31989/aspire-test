import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import en from '../../../public/language/en.json';
import vi from '../../../public/language/vi.json';
import { AbstractLanguageService, AnyType, LanguageCode, StorageKey } from 'one-frontend-framework';
import { StorageService } from './storageService';
import { LanguageText } from '../types/languageText';

@singleton()
export class LanguageService extends AbstractLanguageService<StorageService> {
    public readonly storeService = container.resolve(StorageService);
    public text: LanguageText = {} as LanguageText;
    public currentLanguage: string = LanguageCode.VI;

    public async initLanguage(defaultLanguage: string): Promise<void> {
        const me = this;
        let storagedLanguage = await this.storeService.getObject<string>(StorageKey.language);
        if (!storagedLanguage) {
            storagedLanguage = defaultLanguage;
        }
        me.getLanguageText(storagedLanguage);
    }

    /**
     * Set language to store
     * @param value 
     */
    public async setLanguage(value: string): Promise<void> {
        const me = this;
        await me.storeService.saveObject<string>(StorageKey.language, value);
        me.getLanguageText(value);
    }

    /**
     * Get language text from json
     * @param value 
     */
    public getLanguageText(value: string): void {
        const me = this;
        me.currentLanguage = value;
        if (value == LanguageCode.EN) {
            me.text = en as unknown as LanguageText;
        }
        else {
            me.text = vi as unknown as LanguageText;
        }
    }

    /**
     * Get language text using a dot notation key
     * @param key 
     * @returns value associated with the key in the language JSON
     */
    public getLanguageTextByKey(key: string): string {
        const me = this;
        const keys = key.split('.');

        let result: AnyType = me.text;

        for (const subKey of keys) {
            result = result[subKey];
            if (result === undefined) {
                return key; // Return undefined if key not found
            }
        }
        return result;
    }
}