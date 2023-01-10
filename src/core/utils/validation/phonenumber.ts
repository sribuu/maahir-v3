export const indonesianPhonenumberRegex =
  /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;

export const invalidPhonenumberValidation = (value: string) =>
  !indonesianPhonenumberRegex.test(value);
