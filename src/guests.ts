export type Guest = {
  id: string
  name: string
  title: string
}

export const guests: Guest[] = [
  { id: 'claude', name: 'Claude', title: 'Дорогой Claude!' },
  { id: 'ivan', name: 'Иван Петров', title: 'Дорогой Иван!' },
  { id: 'petrovy', name: 'Пётр и Анна Петровы', title: 'Дорогие Пётр и Анна!' },
]

const fallback: Guest = { id: 'unknown', name: 'Неизвестный гость', title: 'Дорогие гости!' }

export function getGuest(id: string | null): Guest {
  if (!id) return fallback
  return guests.find((g) => g.id === id) ?? { ...fallback, id }
}
