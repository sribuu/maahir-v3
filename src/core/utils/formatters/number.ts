export const numberFormatters = {
  replaceCharWithEmptyString(data: string) {
    const result = data.replace(/[^\d]/g, "");
    return result;
  },
  replaceInitialZeroWithEmptyString(data: string) {
    const result = data.charAt(0) === "0" ? data.replace("0", "") : data;
    return result;
  },
  indonesianMoneyToNumber(data: string) {
    const result = data.split(".").join("");
    return result;
  },
  thousandSeparatorToNumber(data: string) {
    const result = data.split(".").join("");
    return result;
  },
  withRpLabel(data: string) {
    return `Rp${data}`;
  },
  indonesianThousandSeparator(data: string) {
    const result = data.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return result;
  },
};
