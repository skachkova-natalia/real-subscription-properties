import { notification } from 'antd';

export function showSuccessNotification(title: string = 'Запрос отправлен', description?: string) {
  notification.success({
    title,
    description,
    duration: 3,
  });
}

export function showErrorNotification(title: string = 'Запрос отправлен', description?: string) {
  notification.error({
    title,
    description,
    duration: 3,
  });
}
