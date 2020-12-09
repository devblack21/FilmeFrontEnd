import {showError} from '../../utils';
import {PlusOutlined} from '@ant-design/icons';
import {Select,Option,Button, Card, DatePicker,TimePicker, Drawer, Form, Input, InputNumber, List, Popconfirm,AutoComplete} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import Container from '../../components/container';
import * as Actions from '../../store/sessoes/actions';

function SessoesPage(props) {
  const dispatch = useDispatch();
  const model = useSelector(state => state.sessoes);
  const {erro,carregando, cinemaAberto,itemAberto,cinemaDigitado,filmeDigitado} = model;
  const lista = [...model.lista, {}];
  const listaCinemas = [...model.listaCinemas, {}];
  const [form] = Form.useForm();
  const { Option } = Select;


  useEffect(() => {

    if (erro) showError(erro, form);
  }, [erro, form]);


  useEffect(() => {
    dispatch(Actions.listarCinemas.request());
  }, [dispatch]);

  useEffect(() => {
    
    form.resetFields();
  }, [form, itemAberto]);


  const abrir = useCallback(sessao => dispatch(Actions.abrir(sessao)), [dispatch]);
  const fechar = useCallback(() => dispatch(Actions.fechar()), [dispatch]);
  const excluir = useCallback(() => dispatch(Actions.excluir.request(itemAberto.idSessao)), [dispatch, itemAberto]);
  const salvar = useCallback(sessao => dispatch(Actions.salvar.request({...itemAberto, ...sessao})), [dispatch, itemAberto]);
  const listar = useCallback((value) => dispatch(Actions.listarPorCinema.request(cinemaAberto)),[dispatch,cinemaAberto]);
  const abrirCinema = useCallback(selected => dispatch(Actions.abrirCinema(selected)), [dispatch]);
  const cinemaDigitad = useCallback(selected => dispatch(Actions.cinemaDigitado(selected)), [dispatch]);
  const filmeDigitad = useCallback(selected => dispatch(Actions.filmeDigitado(selected)), [dispatch]);
  const retornarCinema = useCallback(selected => dispatch(Actions.retornarCinema.request(selected)), [dispatch]);
  const retornarFilme = useCallback(selected => dispatch(Actions.retornarFilme.request(selected)), [dispatch]);
  
  const handleProvinceChange = value => {
      abrirCinema(value);
      listar(2);
  };

  const handleCinema = (e) =>  {
    if(itemAberto){
   
      cinemaDigitad(e.target.value);
      retornarCinema();

    }
    
};

const handleFilme = (e) =>  {
  if(itemAberto){
 
    filmeDigitad(e.target.value);
    retornarFilme();
  }
  
};

  const renderItem = useCallback(
    item => {
      
      if (item.idSessao) {
      
      
        const description =
            <p>
               Sala: {item.sala} | Dia: {item.diaSemana} | Horario: {item.horario}  
             
            </p>;
        return (
            <List.Item key={item.idSessao} onClick={() => abrir(item)} >
              <Card hoverable>
                <Card.Meta title= {item.nomeFilme} description={description} />

                  {item.nomeCinema}
                 
                
              </Card>
            </List.Item>
            
        );
      }

      return (
          <List.Item key={-1} onClick={() => abrir({})}>
            <Button type='link' icon={<PlusOutlined />} size='large'>
              Nova Sessão
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


return (
  
    <Container breadcrumb={['Sessões']}>
      
      <h1>Sessões ({model.lista.length}) </h1>
     
      <Select      label="Cinema"
                   placeholder="Selecione um Cinema"
                   style={{ width: '20%' }}
                   value={cinemaAberto}
                   onChange={handleProvinceChange}
                   >
                     {model.listaCinemas.map(item => (
                       
                        <Option key={item.idCinema}  value={item.idCinema}>{item.nome}</Option>
                       
                    )) .filter((item) => item.key !== null)}
                 </Select>

      <br/>  <br/>
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
          title={itemAberto?.idSessao ? 'Alterar Filme' : 'Novo Filme'}
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
          <Select placeholder="Selecione um Cinema" style={{ width: '100%' }}>
                                          
                <Option value="SEGUNDA">Segunda-Feira</Option>
                <Option value="TERCA">Terça-Feira</Option>
                <Option value="QUARTA">Quarta-Feira</Option>
                <Option value="QUINTA">Quinta-Feira</Option>
                <Option value="SEXTA">Sexta-Feira</Option>
                <Option value="SABADO">Sabado</Option>
                <Option value="DOMINGO">Domingo</Option>
    
          </Select>
          
          </Form.Item>
          <label>Cinema: {itemAberto?.cinema?.nome == null ? itemAberto?.nomeCinema: itemAberto?.cinema?.nome} {}<br/></label>
          
          <Form.Item  id="cinema"  name="cinema" onChange={handleCinema}>
          <Input />
          </Form.Item>
          <label>Filme: {itemAberto?.filme?.nome == null ? itemAberto?.nomeFilme: itemAberto?.filme?.nome}<br/></label>
          <Form.Item id="filme" name="filme"  onChange={handleFilme}>
          <Input />
          </Form.Item>
          <Form.Item label="Horario" name="horario" rules={[{required: true}]}>
            <Input format="HH:mm" />
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
