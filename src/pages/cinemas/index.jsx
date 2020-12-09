import {showError} from '../../utils';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Card, DatePicker, Drawer, Form, Input, InputNumber, List, Popconfirm} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useMemo} from 'react';
import Classificacao from '../../components/classificacao';
import Container from '../../components/container';
import * as Actions from '../../store/cinemas/actions';

function CinemasPage(props) {
  const dispatch = useDispatch();
  const model = useSelector(state => state.cinemas);
  const {erro, carregando, itemAbertoCinema} = model;
  const lista = [...model.lista, {}];
  const [form] = Form.useForm();

  useEffect(() => {
    if (erro) showError(erro, form);
  }, [erro, form]);

  useEffect(() => {
    dispatch(Actions.listar.request());
  }, [dispatch]);

  useEffect(() => {
    form.resetFields();
  }, [form, itemAbertoCinema]);

  const abrir = useCallback(filme => dispatch(Actions.abrir(filme)), [dispatch]);
  const fechar = useCallback(() => dispatch(Actions.fechar()), [dispatch]);
  const excluir = useCallback(() => dispatch(Actions.excluir.request(itemAbertoCinema.idCinema)), [dispatch, itemAbertoCinema]);
  const save = useCallback(filme => dispatch(Actions.salvar.request({...itemAbertoCinema, ...filme})), [dispatch, itemAbertoCinema]);

  const renderItem = useCallback(
      item => {
        if (item.idCinema) {
          const description =
              <p>

                  {item.cidade} , {item.estado}
                  
                
              </p>;
          return (
              <List.Item key={item.id} onClick={() => abrir(item)}>
                <Card hoverable>
                  <Card.Meta title={item.nome} description={description} />
                  <p>Salas: {item.salas}</p>
                </Card>
              </List.Item>
          );
        }

        return (
            <List.Item key={-1} onClick={() => abrir({})}>
              <Button type='link' icon={<PlusOutlined />} size='large'>
                Novo Cinema
              </Button>
            </List.Item>
        );
      },
      [abrir]);

  const drawerFooter = useMemo(() => (
      <div style={{textAlign: 'right'}}>
        <Popconfirm title="Você tem certeza que quer excluir este Cinema?" onConfirm={excluir} okText="Excluir" okButtonProps={{type: 'danger'}}>
          <Button type="danger" style={{marginRight: 8}}>
            Excluir
          </Button>
        </Popconfirm>
        <Button
            style={{marginRight: 8}}
            onClick={e => {
              e.preventDefault();
              fechar();
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
  ), [excluir, fechar, form]);

  return (
      <Container breadcrumb={['Cinema']}>
        <h1>Cinema ({model.lista.length})</h1>
        <List
            loading={carregando}
            grid={{
              gutter: 16,
              md: 1,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            dataSource={lista}
            renderItem={renderItem}
        />
        <Drawer
            title={itemAbertoCinema?.idCinema ? 'Alterar Cinema' : 'Novo Cinema'}
            placement="right"
            width={512}
            closable={false}
            maskClosable={false}
            onClose={fechar}
            visible={itemAbertoCinema !== null}
            footer={drawerFooter}
        >
          <Form layout='vertical' initialValues={itemAbertoCinema} form={form} onFinish={save}>
            <Form.Item label="Nome" name="nome" rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item label="Cidade" name="cidade" rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item label="Estado" name="estado" rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item label="Salas" name="salas" rules={[{required: true}]}>
              <InputNumber min={1} max={999} maxLength={3} />
            </Form.Item>
            
            
          </Form>
        </Drawer>
      </Container>
  );
}

export default CinemasPage;
