import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  ru: {
    translation: {
      common: {
        select_all: 'Выбрать все',
        apply: 'Применить',
        cancel: 'Отмена',
        no_data: 'Нет данных',
        copied: 'Скопировано',
        main_page: 'На главную',
        need: 'Необходимо',
      },
      user: {
        name: 'Имя пользователя',
        email: 'Почта пользователя',
        account: 'аккаунт',
        verify_email: 'Верификация почты',
        verify: 'верифицировать',
        not_verified: 'Аккаунт пользователя не подтверждён.',
        reset_password: 'Сбросить пароль',
        change_email: 'Изменить почту',
        personal_account: 'Личный кабинет',
      },
      verification: {
        title: 'Верификация учётной записи пользователя',
      },
      sign_in: 'Вход',
      sign_out: 'Выход',
      registration: 'Регистрация',
      register: 'Зарегистрироваться',
      login: 'Логин',
      password: 'Пароль',
      settings: 'Настройки',
      screenshot: 'Скриншот',
      property: 'Свойство',
      value: 'Значение',
      dimension: 'Единица измерения',
      substance: 'Вещество',
      parameter_mode: 'Параметры',
      no_data: 'Нет данных',
      table: 'Таблица',
      table_settings: 'Настройка таблицы',
      messages: {
        need_to_select_parameter: 'Для отображения свойств необходимо выбрать параметр',
      },
    },
  },
  en: {
    translation: {
      common: {
        select_all: 'Select all',
        apply: 'Apply',
        cancel: 'Cancel',
        no_data: 'No data',
        copied: 'Copied',
        main_page: 'Main page',
        need: 'Need to',
      },
      user: {
        name: 'User name',
        email: 'User email',
        account: 'account',
        verify_email: 'Verify e-mail',
        verify: 'verify',
        not_verified: 'User\'s account is not verified.',
        reset_password: 'Reset password',
        change_email: 'Change e-mail',
        personal_account: 'Personal account',
      },
      verification: {
        title: 'User\'s account verification',
      },
      sign_in: 'Sign in',
      sign_out: 'Sign out',
      registration: 'Registration',
      register: 'Register',
      login: 'Login',
      password: 'Password',
      settings: 'Settings',
      screenshot: 'Screenshot',
      property: 'Property',
      value: 'Value',
      dimension: 'Dimension',
      substance: 'Substance',
      parameter_mode: 'Parameter mode',
      no_data: 'No data',
      table: 'Table',
      table_settings: 'Table settings',
      messages: {
        need_to_select_parameter: 'Select parameter to show substances, please',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    debug: false,
    resources,
  });

export default i18n;
