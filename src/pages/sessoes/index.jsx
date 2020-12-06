import {showError} from '../../utils';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Card, DatePicker, Drawer, Form, Input, InputNumber, List, Popconfirm} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useMemo} from 'react';
import Cinemas from '../../components/cinemas';
import Container from '../../components/container';
import * as Actions from '../../store/sessoes/actions';

function SessoesPage(props) {
  const dispatch = useDispatch();
  const model = useSelector(state => state.sessoes);
  const {erro, cinemaAberto,itemAberto} = model;
  const [form] = Form.useForm();

 

  const abrir = useCallback(sessao => dispatch(Actions.abrir(sessao)), [dispatch]);
  const fechar = useCallback(() => dispatch(Actions.fechar()), [dispatch]);
  const excluir = useCallback(() => dispatch(Actions.excluir.request(itemAberto.id)), [dispatch, itemAberto]);
  const salvar = useCallback(sessao => dispatch(Actions.salvar.request({...itemAberto, ...sessao})), [dispatch, itemAberto]);
  


  const renderItem = useCallback(
      item => {
        if (item.id) {
          const description =
              <p>

              </p>;
          return (
              <List.Item key={item.id} >
                <Card hoverable>
                  <Card.Meta title={item.nome} description={description} />
                  <p>{item.sinopse}</p>
                </Card>
              </List.Item>
          );
        }

        return (
            <List.Item key={-1} >
              <Button type='link' icon={<PlusOutlined />} size='large'>
                Novo Cinema
              </Button>
            </List.Item>
        );
      },
      []);

  const drawerFooter = useMemo(() => (
      <div style={{textAlign: 'right'}}>
        <Popconfirm title="Você tem certeza que quer excluir este Cinema?"  okButtonProps={{type: 'danger'}}>
          <Button type="danger" style={{marginRight: 8}}>
            Excluir
          </Button>
        </Popconfirm>
        <Button
            style={{marginRight: 8}}
            onClick={e => {
              e.preventDefault();

            }}
        >
          Fechar
        </Button>
        <Button
            type="primary"
            onClick={e => {
              e.preventDefault();
              form.submit();
            }}
        >
          Salvar
        </Button>
      </div>
  ), []);

  return (
      <Container breadcrumb={['Sessões']}>

        <h1>Sessões  {cinemaAberto}</h1>
            <Cinemas.Select />

              <br/>
                <br/>
        <List

            grid={{
              gutter: 16,
              md: 1,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}

            renderItem={renderItem}
        />

        <Drawer
            title={itemAberto ? 'Alterar Sessão' : 'Nova Sessão'}
            placement="right"
            width={512}
            closable={false}
            maskClosable={false}


            footer={drawerFooter}
        >
          <Form layout='vertical' initialValues={itemAberto} form={form} >
            <Form.Item label="Fime" name="filme" rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item label="Dia da Semana" name="diaSemana" rules={[{required: true}]}>
              <Input />
            </Form.Item>
             <Form.Item label="Horário" name="horario" rules={[{required: true}]}>
               <Input />
             </Form.Item>
          </Form>
        </Drawer>
      </Container>
  );
}

export default SessoesPage;
