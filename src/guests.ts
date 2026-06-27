export type Guest = {
  id: string
  name: string
  title: string
  /** true — обращение во множественном числе («с вами»), false — в единственном («с тобой») */
  plural: boolean
}

export const guests: Guest[] = [
  { id: 'test', name: 'Тестовый юзер', title: 'Дорогой тестовый гость!', plural: false },
  { id: 'U2lD3X2t', name: 'Яна и Леша', title: 'Дорогие Яна и Лёша!', plural: true },
  { id: 'pvIrHudY', name: 'Папа и Люба', title: 'Дорогие Папа и Люба!', plural: true },
  { id: 'ZRYT_KAx', name: 'Никита и Алёна', title: 'Дорогие Никита и Алёна!', plural: true },
  { id: 'WveT16EO', name: 'Дедушка', title: 'Дорогой Дедушка!', plural: false },
  { id: 'pw3fUStq', name: 'Даня', title: 'Дорогая Даня!', plural: false },
  { id: 'FKP0oJ29', name: 'Саша', title: 'Дорогая Саша!', plural: false },
  { id: 'UEfbbM43', name: 'Саня', title: 'Дака это че, есь писят рублей на свадьбу?', plural: false },
  { id: 'G4PJ311j', name: 'Лера и Кирилл', title: 'Дорогие Лера и Кирилл!', plural: true },
  { id: 'uJHKXx0j', name: 'Тимоха', title: 'Здарова бля заебал', plural: false },
  { id: 'tnz4NWwl', name: 'Егор', title: 'Бля Егора женюсь ваще ахуй', plural: false },
  { id: 'HdapTcxZ', name: 'Степан', title: 'Будто вчера бобу фунфырики на крышу кидали, а тут вон женюсь', plural: false },
  { id: 'FrIOO9po', name: 'Виталина', title: 'Дорогая Вита!', plural: false },
  { id: '9SOzYf50', name: 'Диана', title: 'Прикинь бро аж сайт запилил', plural: false },
  { id: 'VoV0EG21', name: 'Вова', title: 'Вова!', plural: false },
  { id: 'EfN67PfN', name: 'Даша Никитина', title: 'Дорогая Даша!', plural: false },
  { id: 'HdsJkDSJ', name: 'Аня', title: 'Дорогая Аня!', plural: false },
]

const fallback: Guest = { id: 'unknown', name: 'Неизвестный гость', title: 'Дорогие гости!', plural: true }

export function getGuest(id: string | null): Guest {
  if (!id) return fallback
  return guests.find((g) => g.id === id) ?? { ...fallback, id }
}
