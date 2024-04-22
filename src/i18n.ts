import i18n from 'i18next';

const resources = {
  ru: {
    translation: {
      property: 'Свойство',
      value: 'Значение',
      dimension: 'Единица измерения',
      substance: 'Вещество',
      parameterMode: 'Параметры',
    },
  },
  en: {
    translation: {
      property: 'Property',
      value: 'Value',
      dimension: 'Dimension',
      substance: 'Substance',
      parameterMode: 'Parameter mode',
    }
  }
};

i18n.init({
  lng: 'ru',
  debug: false,
  resources,
});

export default i18n;
