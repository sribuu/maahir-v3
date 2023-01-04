export const limitPayload = (currentPage: number) => currentPage * 16;
export const offsetPayload = (currentPage: number) => (currentPage - 1) * 16;
