import { ICard, ICardList, ICardsListData } from "../types";
import { IEvents } from "./base/events";

export class CardListData implements ICardsListData {
  protected _id: string;
  items: any[];
  protected amount: number;
  events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
    this._id = '';
    this.items = [];
  }

  setCardList(CardListData: ICardList) {
    this._id = CardListData.id;
    this.items = CardListData.items || [];
    this.amount = CardListData.amount || 0;
  }

  getCardList(): ICardList {
    return {
      id: this._id,
      items: this.items,
      amount: this.amount,
    }
  }

  addCard(card: ICard): void {
    this.items.push(card)
    this.events.emit("update:cards");
  }
  
  deleteCard(card: ICard): void {
    this.items = this.items.filter((item) => item.id !== card.id);
    this.events.emit("update:cards");
  }
  
  updateCard(updatedCard: ICard): void {
    const index = this.items.findIndex((item) => item.id === updatedCard.id);
    if (index !== -1) {
      this.items[index] = updatedCard;
      this.events.emit("update:cards");
    }
  }
  // calculatingAmount()
}