export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const invalidEmailValidation = (value: string) =>
  !emailRegex.test(value);
