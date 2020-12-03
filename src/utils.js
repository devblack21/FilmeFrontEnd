import {message} from 'antd';

export function showError(error, form) {
  if (form) {
    if (error?.response?.data?.campos instanceof Object) {
      const fields = Object.entries(error.response.data.campos)
          .map(([name, errors]) => ({name, errors}));
      form.setFields(fields);
      return;
    }
  }
  if (error?.response?.data?.mensagem) {
    message.error(error.response.data.mensagem);
  } else if (error.response.status === 404) {
    message.error('Não encontrado.');
  } else {
    message.error('Erro desconhecido.');
  }
}
