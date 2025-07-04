import {Alert,  Form, Input} from 'antd';
import {color} from '@src/theme';
import {useTranslation} from 'react-i18next';
import {$changingEmail, sendChangeEmail} from '@models/user';
import * as S from './styled';
import {useUnit} from 'effector-react';
import i18n from 'i18next';

export default function ChangeEmailSection() {
  const {t} = useTranslation();
  const {sending, error} = useUnit($changingEmail);

  return (
    <>
      {error && (
        <Alert
          message={error[`msg_user_${i18n.language}`]}
          type='error'
          showIcon
        />
      )}
      <Form
        layout='vertical'
        validateTrigger='onBlur'
        autoComplete='off'
        onFinish={sendChangeEmail}
        style={{maxWidth: 600}}
      >
        <S.FormContainer>
          <Form.Item
            label='Новый E-mail'
            name='new_email'
            rules={[
              {required: true, message: 'Обязательное поле'},
              {
                type: 'email',
                message: 'Некорректный формат почты. Пример: name@company.ru',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <S.StyledButton htmlType='submit' type='primary' loading={sending} style={{backgroundColor: color.primary.s700}}>
            {t('user.change_email')}
          </S.StyledButton>
        </S.FormContainer>
      </Form>
    </>
  );
}
