export interface ICard {
	id: string;
	title: string;
	description: string;
	date: string;
	price: number;
}

export interface ICardList {
  id: string;
	items: ICard[];
	amount: number;
}

export type TCardInfo = Pick<ICard, 'title' | 'description' | 'price' | 'date'>;

export interface ICardsListData {
  setCardList(CardListData: ICardList): void;
  getCardList(): ICardList;
  addCard(card: ICard): void;
  deleteCard(card: ICard): void;
  updateCard(card: ICard): void;
  // getCard(cardId: string): ICard;
  // checkValidation(data: Record<keyof TCardInfo, string>): boolean;
}