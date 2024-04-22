import i18n from 'i18next';

const resources = {
  ru: {
    translation: {
      documents_one: '{{count}} документ',
      documents_few: '{{count}} документа',
      documents_many: '{{count}} документов',
      taxpayers_one: '{{count}} налогоплательщик',
      taxpayers_few: '{{count}} налогоплательщика',
      taxpayers_many: '{{count}} налогоплательщиков',
    },
  },
};

i18n.init({
  lng: 'ru',
  debug: false,
  resources,
});

export default i18n;
