import { ICard } from "../../types";
import { IEvents } from "../base/events";

export class CardPrewiewModal {
  protected cardTitle: HTMLElement;
  protected cardDescription: HTMLElement;
  protected cardPrice: HTMLElement;
  protected cardDate: HTMLElement;
  protected cardId: string;
  protected events: IEvents;
  protected container: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    this.events = events;
    this.container = container;
    this.cardTitle = container.querySelector('.card__title');
    this.cardDescription = container.querySelector('.card__description');
    this.cardPrice = container.querySelector('.card__price');
    this.cardDate = container.querySelector('.card__date');
  }

  setCard(card: ICard): void {
    this.cardId = card.id;
    this.cardTitle.textContent = card.title;
    this.cardDescription.textContent = card.description;
    this.cardPrice.textContent = `${card.price} ₽`;
    this.cardDate.textContent = card.date;
  }

  render(): HTMLElement {
    return this.container;
  }
}