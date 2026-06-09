export type Guest = {
  id: string
  name: string
  title: string
}

export const guests: Guest[] = [
  { id: 'test', name: 'Тестовый юзер', title: 'Дорогой тестовый гость!' },
  { id: 'U2lD3X2t', name: 'Яна и Леша', title: 'Дорогие Яна и Лёша!' },
  { id: 'pvIrHudY', name: 'Папа и Люба', title: 'Дорогие Папа и Люба!' },
  { id: 'ZRYT_KAx', name: 'Никита и Алёна', title: 'Дорогие Никита и Алёна!' },
  { id: 'WveT16EO', name: 'Дедушка', title: 'Дорогой Дедушка!' },
  { id: 'pw3fUStq', name: 'Даня', title: 'Дорогая Даня!' },
  { id: 'FKP0oJ29', name: 'Саша', title: 'Дорогая Саша!' },
  { id: 'UEfbbM43', name: 'Саня', title: 'Дака это че, есь писят рублей на свадьбу?' },
  { id: 'G4PJ311j', name: 'Лера и Кирилл', title: 'Дорогие Лера и Кирилл!' },
  { id: 'uJHKXx0j', name: 'Тимоха', title: 'Здарова бля заебал' },
  { id: 'tnz4NWwl', name: 'Егор', title: 'Бля Егора женюсь ваще ахуй' },
  { id: 'HdapTcxZ', name: 'Степан', title: 'Будто вчера бобу фунфырики на крышу кидали, а тут вон женюсь' },
  { id: 'FrIOO9po', name: 'Виталина', title: 'Дорогая Вита!' },
  { id: '9SOzYf50', name: 'Диана', title: 'Прикинь бро аж сайт запилил' },
]

const fallback: Guest = { id: 'unknown', name: 'Неизвестный гость', title: 'Дорогие гости!' }

export function getGuest(id: string | null): Guest {
  if (!id) return fallback
  return guests.find((g) => g.id === id) ?? { ...fallback, id }
}
