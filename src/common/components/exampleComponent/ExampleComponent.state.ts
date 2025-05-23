import { BaseComponentState } from '../../types/baseComponentState';
import { ExampleComponentModel } from './ExampleComponent.model';

export class ExampleComponentProps {
    public name?: string;
    public msg?: string;
}

export class ExampleComponentState extends BaseComponentState {
    public model: ExampleComponentModel = new ExampleComponentModel();

    public async init(): Promise<void> {
        const me = this;
        const response = await fetch('https://dummyjson.com/products')
        const data = await response.json();
        console.table(data);
        me.isReady = true;
    }

    public async onMounted(): Promise<void> {
    }
}