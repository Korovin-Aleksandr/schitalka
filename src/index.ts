import "./blocks/index.css";
import { EventEmitter } from "./components/base/events";
import { Page } from "./components/common/Page";
import { ModalContainer } from "./components/common/ModalContainer";
import { CardAddModal } from "./components/common/CardAddModal";
import { ensureElement, cloneTemplate } from "./utils/utils";
import { CardListData } from "./components/CardsListData";
import { ICard } from "./types";
import { CardListItem } from "./components/common/CardList";
import { CardChangeModal } from "./components/common/CardChangeModal";
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru";

const events = new EventEmitter();

const cardList = new CardListData(events);
const page = new Page(document.querySelector(".page"), events);
const modal = new ModalContainer(
  document.querySelector("#modal-container"),
  events
);

const cardAddTemplate = ensureElement<HTMLTemplateElement>("#modal__add");
const cardChangeTemplate = ensureElement<HTMLTemplateElement>("#modal__change");
const cardListTemplate = ensureElement<HTMLTemplateElement>("#card-list");

const cardAdd = new CardAddModal(cloneTemplate(cardAddTemplate), events);
const cardChange = new CardChangeModal(
  cloneTemplate(cardChangeTemplate),
  events
);

events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
});

//рендер списка карточек
events.on("update:cards", () => {
  page.gallery.innerHTML = "";
  cardList.items.forEach((product) => {
    const clonedTemplate = cloneTemplate(cardListTemplate);
    const card = new CardListItem(clonedTemplate, events);
    card.prewiew = product;
    page.gallery.append(card.render());
  });

  cardList.calculatingAmount();
  page.setAmount(cardList.getAmount());
});

//отерытие мадалки добавления карточки
events.on("modal:open", () => {
  modal.modalContent.append(cardAdd.render());
  modal.open();
});

//добавление карточки
events.on("card:add", (card: ICard) => {
  cardList.addCard(card);
  modal.close();
});

//удаление карточки
events.on("card:delete", (data: { id: string }) => {
  const { id } = data;
  const card = cardList.items.find((item) => item.id === id);
  cardList.deleteCard(card);
});

//открытие окна изменения
events.on("modal-chenge:open", (data: { id: string }) => {
  const card = cardList.items.find((item) => item.id === data.id);
  if (card) {
    cardChange.fillForm(card); // метод, который мы добавим
    modal.modalContent.append(cardChange.render());
    modal.open();
  }
});
//изменение данных карточки
events.on("card:change", (data: ICard) => {
  cardList.updateCard(data);
  modal.close();
});

//открытие календаря
events.on("calendar:open", ({ input }: { input: HTMLInputElement }) => {
  const inputWithPicker = input as HTMLInputElement & {
    _flatpickr?: flatpickr.Instance;
  };

  if (inputWithPicker._flatpickr) {
    inputWithPicker._flatpickr.destroy();
  }

  flatpickr(input, {
    locale: Russian,
    dateFormat: "d.m.Y",
    allowInput: true,
    closeOnSelect: true,
    onClose: function () {
      this.destroy();
    },
  });
});
