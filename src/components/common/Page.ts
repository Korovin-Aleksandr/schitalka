import { ICard } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IPage {
  cardList: any[];
  amount: number;
}

export class Page extends Component<IPage> {
  protected amountCard: HTMLElement;
  protected buttonAdd: HTMLButtonElement;
  gallery: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.amountCard = container.querySelector('.header__amount');
    this.buttonAdd = container.querySelector('.add__button');
    this.gallery = container.querySelector('.upcoming__cards-list')

    this.buttonAdd.addEventListener('click', () => {
			this.events.emit('modal:open');
		});
  }
}
