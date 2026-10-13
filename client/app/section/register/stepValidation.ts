export function continueIfValid(section: HTMLElement | null, onContinue: () => void) {
  const invalidField = section?.querySelector<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >("input:invalid, select:invalid, textarea:invalid");

  if (invalidField) {
    invalidField.reportValidity();
    invalidField.focus();
    return;
  }

  onContinue();
}
