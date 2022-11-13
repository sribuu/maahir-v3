export const numberFormatters = {
  replaceCharWithEmptyString(data: string) {
    const result = data.replace(/[^\d]/g, "");
    return result;
  },
};
