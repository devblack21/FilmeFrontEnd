import {showError} from '../../utils';
import {PlusOutlined} from '@ant-design/icons';
import {Option,Button, Card, DatePicker,TimePicker, Drawer, Form, Input, InputNumber, List, Popconfirm,AutoComplete} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import Cinemas from '../../components/cinemas';
import Container from '../../components/container';
import * as Actions from '../../store/sessoes/actions';

function SessoesPage(props) {
  const dispatch = useDispatch();
  const model = useSelector(state => state.sessoes);
  const {erro,carregando, cinemaAberto,itemAberto} = model;
  const lista = [...model.lista, {}];
  const [form] = Form.useForm();
  const { Option } = AutoComplete;

  useEffect(() => {
    if (erro) showError(erro, form);
  }, [erro, form]);

  useEffect(() => {
    dispatch(Actions.listar.request());
  }, [dispatch]);

  useEffect(() => {
    form.resetFields();
  }, [form, itemAberto]);


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
            <List.Item key={item.id} onClick={() => abrir(item)}>
              <Card hoverable>
                <Card.Meta title={item.nome} description={description} />
                <p>{item.sinopse}</p>
              </Card>
            </List.Item>
        );
      }

      return (
          <List.Item key={-1} onClick={() => abrir({})}>
            <Button type='link' icon={<PlusOutlined />} size='large'>
              Novo Filme
            </Button>
          </List.Item>
      );
    },
    [abrir]);

const drawerFooter = useMemo(() => (
    <div style={{textAlign: 'right'}}>
      <Popconfirm title="Você tem certeza que quer excluir este Filme?" onConfirm={excluir} okText="Excluir" okButtonProps={{type: 'danger'}}>
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


const options = [
  {
    id: 1,
    value: 'Burns Bay Road',
  },
  {
    id: 2,
    value: 'Downing Street',
  },
  {
    id: 3,
    value: 'Wall Street',
  },
];

const handleSearch = (value) => {
  
    value = value ;
};


const Complete = () => (
  <AutoComplete
  style={{
    width: 200,
  }}
  onSearch={handleSearch}
  placeholder="Selecione o Filme..."
>
  {options.map((filme) => (
    <Option key={filme.id} value={filme.id} >
      {filme.value}
    </Option>
  ))}
</AutoComplete>
);

return (
    <Container breadcrumb={['Filmes']}>
      <h1>Filmes ({model.lista.length}) </h1>
      <Cinemas.Select/>
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
          title={itemAberto?.id ? 'Alterar Filme' : 'Novo Filme'}
          placement="right"
          width={512}
          closable={false}
          maskClosable={false}
          onClose={fechar}
          visible={itemAberto !== null}
          footer={drawerFooter}
      >
        <Form layout='vertical' initialValues={itemAberto} form={form} onFinish={salvar} >
          
          <Form.Item label="Dia da Semana" name="diaSemana" rules={[{required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Cinema" name="cinema"  value={cinemaAberto} >
            <Input defaultValue={cinemaAberto}  disabled/>
          </Form.Item>
          <Form.Item label="Filme" name="filme" >
          <Complete />
          </Form.Item>
          <Form.Item label="Horario" name="horario" rules={[{required: true}]}>
            <TimePicker  format="HH:mm" />
          </Form.Item>
          <Form.Item label="Sala" name="sala" rules={[{required: true}]}>
              <InputNumber min={1} max={999} maxLength={3} />
            </Form.Item>
      
        </Form>
      </Drawer>
    </Container>
);
}

export default SessoesPage;
