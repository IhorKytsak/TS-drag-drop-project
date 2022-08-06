namespace App {
  // Component Base Class
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;

      const importedMode = document.importNode(
        this.templateElement.content,
        true
      );

      this.element = importedMode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }

      this.attach(insertAtStart);
    }

    private attach(insertAtBegining: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBegining ? 'afterbegin' : 'beforeend',
        this.element
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }
}
