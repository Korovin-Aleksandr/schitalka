import { ICard, ICardList, ICardsListData } from "../types";
import { IEvents } from "./base/events";

export class CardListData implements ICardsListData {
  protected _id: string;
  cardList: any[];
  protected amount: number;
  events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
    this._id = '';
    this.cardList = [];
  }

  setCardList(CardListData: ICardList) {
    this._id = CardListData.id;
    this.cardList = CardListData.items || [];
    this.amount = CardListData.amount || 0;
  }

  getCardList(): ICardList {
    return {
      id: this._id,
      items: this.cardList,
      amount: this.amount,
    }
  }

  addCard(card: ICard): void {
    this.cardList.push(card)
    this.events.emit("update:cards");
  }
  
  deleteCard(card: ICard): void {
    this.cardList = this.cardList.filter((item) => item.id !== card.id);
    this.events.emit("update:cards");
  }
  
  updateCard(updatedCard: ICard): void {
    const index = this.cardList.findIndex((item) => item.id === updatedCard.id);
    if (index !== -1) {
      this.cardList[index] = updatedCard;
      this.events.emit("update:cards");
    }
  }
  calculatingAmount(): void {
    this.amount = this.cardList.reduce((acc, item) => acc + item.price, 0);
  }
  
  getAmount(): number {
    return this.amount;
  }
  groupByDate(): Record<string, ICard[]> {
    return this.cardList.reduce((acc, card) => {
      if (!acc[card.date]) {
        acc[card.date] = [];
      }
      acc[card.date].push(card);
      return acc;
    }, {} as Record<string, ICard[]>);
  }
}