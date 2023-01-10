export const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const trailingSlashRegex = /\s+$/;

export const invalidNameValidation = (value: string) =>
  !nameRegex.test(value) && !trailingSlashRegex.test(value);
