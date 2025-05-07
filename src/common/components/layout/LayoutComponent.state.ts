import { BaseComponentState } from '../../types/baseComponentState';
import { LayoutComponentModel } from './LayoutComponent.model';

export class LayoutComponentProps {
    public pageName?: string;
}

export class LayoutComponentState extends BaseComponentState {
    public model: LayoutComponentModel = new LayoutComponentModel();

    public async init(): Promise<void> {
        const me = this;
        me.isReady = true;
    }

    public async onMounted(): Promise<void> {
    }
}