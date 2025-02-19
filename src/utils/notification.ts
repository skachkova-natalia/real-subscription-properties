import { notification } from 'antd';

export function showSuccessNotification(message: string = 'Запрос отправлен', description?: string) {
  notification.success({
    message,
    description,
    duration: 3,
  });
}

export function showErrorNotification(message: string = 'Запрос отправлен', description?: string) {
  notification.error({
    message,
    description,
    duration: 3,
  });
}
