import { ICardList } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class CardList extends Component<ICardList> {
  upcomingList: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container)
    this.events = events;
    this.upcomingList = container.querySelector('.upcoming__cards-list')
  }
}

export class CardListItem extends Component<ICardList> {
  cardListItem: HTMLElement;
  protected deleteItem: HTMLButtonElement;
  protected itemTitle: HTMLElement;
  protected itemPrice: HTMLElement;
  protected itemId: string;
  protected itemButtonChange: HTMLButtonElement;
  protected cardPrewiewButton: HTMLElement;
  protected events: IEvents;  

  constructor(container: HTMLElement, events: IEvents) {
    super(container)
    this.events = events
    this.cardListItem = container.querySelector('.card__container');
    this.itemTitle = container.querySelector('.card__title');
    this.itemPrice = container.querySelector('.card__price');
    this.itemButtonChange = container.querySelector('.card__change-button')
    this.cardPrewiewButton = container.querySelector('.card__content')
    this.deleteItem = container.querySelector('.card__delete-button')

    this.deleteItem.addEventListener('click', () => {
      this.events.emit('card:delete', { id: this.itemId })
    })
    this.itemButtonChange.addEventListener('click', () => {
      this.events.emit('modal-chenge:open', { id: this.itemId })
    })
    this.cardPrewiewButton.addEventListener('click', () => {
      this.events.emit('modal:preview:open', { id: this.itemId });
    });
  }

  set prewiew({
    title,
    price,
    id,
  }: {
    title: string;
    price: number;
    id: string;
  }) {
    this.setText(this.itemTitle, title);
    this.setText(this.itemPrice, `${price}`);
    this.itemId = id
  }

  get prewiew() {
    return {
      title: this.itemTitle.textContent || '',
      price: parseFloat(this.itemPrice.textContent?.replace(/\D+/g, '') || '0'),
      id: this.itemId || '',
    };
  }
}