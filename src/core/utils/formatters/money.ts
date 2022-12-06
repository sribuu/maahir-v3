export const thousandSeparator = (data: number) => {
  return `Rp${data?.toFixed(0)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
};
