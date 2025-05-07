import { BaseComponentState } from '../../common/types/baseComponentState';
import { AboutModel } from './About.model';

export class AboutProps {
}

export class AboutState extends BaseComponentState {
    public model: AboutModel = new AboutModel();

    public async init(): Promise<void> {
        const me = this;
        me.isReady = true;
    }

    public async onMounted(): Promise<void> {
    }
}