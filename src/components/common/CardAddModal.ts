import { IEvents } from "../base/events";
import { BaseForm } from "../base/BaseForm";

export class CardAddModal extends BaseForm {
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

    const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    this.events.emit("card:add", {
      title: name,
      description,
      date: date,
      price: Number(price),
      id,
    });

    this.resetForm();
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
}
