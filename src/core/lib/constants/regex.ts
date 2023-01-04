export const REGEX = {
  // source: https://www.regextester.com/93648
  NAME: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  TRAILING_SLASH: /\s+$/,
  // source: https://regexr.com/3e48o
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  // source: https://www.regextester.com/113246
  INDONESIA_PHONE_NUMBER: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
};
