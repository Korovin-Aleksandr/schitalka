import { ICard } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class CardData extends Component<ICard> {
  protected idCard: string;
  protected titleCard: HTMLElement;
  protected descriptionCard: HTMLElement;
  protected dateCard: HTMLElement;
  protected priceCard: HTMLElement;
  protected events: IEvents

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events
    this.titleCard = container.querySelector('.card__title');
    this.descriptionCard = container.querySelector('.card__description');
    this.dateCard = container.querySelector('.card__date');
    this.priceCard = container.querySelector('.card__price');
  }

  set title(value: string) {
    this.setText(this.titleCard, value)
  }

  get title(): string {
		return this.titleCard.textContent || '';
	}

  set description(volue: string) {
    this.setText(this.descriptionCard, volue)
  }

  get description(): string {
    return this.descriptionCard.textContent || '';
  }

  set date(volue: string) {
    this.setText(this.dateCard, volue)
  }

  get date(): string {
    return this.dateCard.textContent || '';
  }

  set price(volue: number) {
    this. setText(this.priceCard, volue)
  }
  get prise():string {
    return this.priceCard.textContent || '';
  }

  set id(value: string) {
		this.idCard = value;
	}

	get id() {
		return this.idCard;
	}




  // setCardInfo(cardData: ICard) {
  //   this.id = cardData.id;
  //   this.title = cardData.title;
  //   this.description = cardData.description;
  //   this.date = cardData.date;
  //   this.price = cardData.price;
  // }

  // getCardInfo(): ICard {
  //   return {
  //     id: this.id,
  //     title: this.title,
  //     description: this.description,
  //     date: this.date,
  //     price: this.price,
  //   };
  // }
}
