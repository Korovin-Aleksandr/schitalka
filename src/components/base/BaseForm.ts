import { ICardList } from "../../types";
import { Component } from "./Component";
import { IEvents } from "./events";


export class BaseForm extends Component<ICardList>{
    protected container: HTMLElement;
    protected events: IEvents
    protected errorSpan: HTMLElement;
    
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.container = container;
        this.events = events;
        this.errorSpan = container.querySelector('.form__errors');
    }

    protected getInputValues(
		inputs: NodeListOf<HTMLInputElement>
	): Record<string, string> {
		const valuesObject: Record<string, string> = {};
		inputs.forEach((element) => {
			valuesObject[element.name] = element.value;
		});
		return valuesObject;
	}

	protected setInputValues(
		inputs: NodeListOf<HTMLInputElement>,
		data: Record<string, string>
	): void {
		inputs.forEach((element) => {
			element.value = data[element.name] || '';
		});
	}

	close(inputs: NodeListOf<HTMLInputElement>, resetState?: () => void): void {
		inputs.forEach((input) => {
			input.value = '';
		});
		
		if (resetState) {
			resetState();
		}
	}
}