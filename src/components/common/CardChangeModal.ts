import { IEvents } from "../base/events";
import { BaseForm } from "../base/BaseForm";
import { ICard } from "../../types";

export class CardChangeModal extends BaseForm {
  protected inputs: NodeListOf<HTMLInputElement>;
  protected dateInput: HTMLInputElement;
  protected buttonSubmit: HTMLButtonElement;
  protected form: HTMLFormElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.form = this.container.querySelector(".modal__form");
    this.inputs =
      this.container.querySelectorAll<HTMLInputElement>(".modal__input");
    this.buttonSubmit = container.querySelector(".modal__button");

    this.dateInput = this.container.querySelector<HTMLInputElement>('input[name="date"]');

    this.dateInput.addEventListener("click", () => {
      this.events.emit("calendar:open", { input: this.dateInput });
    });


    this.initialize();
  }

  initialize(): void {
    this.buttonSubmit.disabled = true;

    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitCardData();
    });

    this.inputs.forEach((input) => {
      input.addEventListener("input", () => this.toggleSubmitButton());
    });
  }

  toggleSubmitButton(): void {
    const inputValues = this.getInputValues(this.inputs);
    const isValid = inputValues.name?.trim() && inputValues.price?.trim();

    if (!isValid) {
      this.setDisabled(this.buttonSubmit, true);
      return;
    }

    this.setDisabled(this.buttonSubmit, false);
  }

  submitCardData(): void {
    const data = this.getInputValues(this.inputs);
    const { name, description, date, price } = data;
  
    const id = this.container.dataset.cardId;
  
    this.events.emit("card:change", {
      title: name,
      description,
      date,
      price: Number(price),
      id,
    });
  
    this.resetForm();
    this.events.emit("modal:close"); // явно закрываем
  }

  close(): void {
   super.close(this.inputs, () => {
     this.form.reset();
   })
    this.setDisabled(this.buttonSubmit, true);
  }

  resetForm(): void {
    this.form.reset(); 
    this.setDisabled(this.buttonSubmit, true); 

  }

  fillForm(card: ICard) {
    this.inputs.forEach((input) => {
      switch (input.name) {
        case 'name':
          input.value = card.title;
          break;
        case 'description':
          input.value = card.description || '';
          break;
        case 'date':
          input.value = card.date || '';
          break;
        case 'price':
          input.value = card.price.toString();
          break;
      }
    });
  
    this.container.dataset.cardId = card.id;
    this.toggleSubmitButton();
  }
}
