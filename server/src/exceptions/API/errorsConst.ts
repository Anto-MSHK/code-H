export const errorsMSG = {
  IS_EXIST: 'Уже существует!',
  NOT_Z: 'Не существует!',
  //validator
  NO_EMPTY: 'Не должно быть пустым!',
  NO_EMAIL: 'Нужен email!',
  NOT_TRUE: 'Не верно!',
  MIN_MAX: (min: number, max: number): string => {
    return `Поле должено содержать от ${min} до ${max} символов!`
  },
  //unknown
  UNKNOWN_SUSPICION: 'Возможно, ошибка в запросе.',
}
