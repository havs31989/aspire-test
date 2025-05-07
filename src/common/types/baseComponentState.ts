import { ComponentState } from 'one-frontend-framework';
import { container } from 'tsyringe';
import { LanguageService } from '../services/languageService';

export abstract class BaseComponentState extends ComponentState {
    public lanuage = container.resolve(LanguageService);
    /**
     * App on mounted
     */
    abstract onMounted(): void;
}