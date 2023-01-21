export const guestCheck: () => Promise<any> = () =>
  fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'guestCheck').then((res) => res.json());
