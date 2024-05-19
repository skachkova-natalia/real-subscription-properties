import i18n from 'i18next';

const resources = {
  ru: {
    translation: {
      property: 'Свойство',
      value: 'Значение',
      dimension: 'Единица измерения',
      substance: 'Вещество',
      parameter_mode: 'Параметры',
      pressure: 'Давление',
      density: 'Плотность',
      temperature: 'Температура',
      enthalpy: 'Энтальпия',
      enthropy: 'Энтропия',
      saturation_pressure: 'Давление на линии насыщения',
      saturation_temperature: 'Температура на линии насыщения',
      steam_mass_fraction: 'Массовое паросодержание',
    },
  },
  en: {
    translation: {
      property: 'Property',
      value: 'Value',
      dimension: 'Dimension',
      substance: 'Substance',
      parameter_mode: 'Parameter mode',
      pressure: 'Pressure',
      density: 'Density',
      temperature: 'Temperature',
      enthalpy: 'Enthalpy',
      enthropy: 'Entropy',
      saturation_pressure: 'Saturation pressure',
      saturation_temperature: 'Saturation temperature',
      steam_mass_fraction: 'Steam mass fraction',
    },
  },
};

i18n.init({
  lng: 'ru',
  debug: false,
  resources,
});

export default i18n;
