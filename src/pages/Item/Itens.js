import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Spinner,
} from 'reactstrap';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import toastr from 'toastr';
import SweetAlert from 'react-bootstrap-sweetalert';
import parseNum from 'parse-num';

import Breadcrumbs from '../../components/Common/Breadcrumb';

import { dateFormFieldFormatter } from '../../helpers/format_helper';
import {
  createItem,
  getItemList,
  removeItem,
  updateItem,
  getStatusValues,
} from '../../services/item';
import {
  getSubcategoryList,
} from '../../services/subcategory';
import { isAuthenticated } from '../../services/auth';
import Dropdown from 'react-bootstrap/Dropdown';

import './datatables.scss';
import { date } from 'date-fns/locale/af';

const Itens = () => {
  const [statusList, setStatusList] = useState([]);
  const [additionalServiceList, setAdditionalServiceList] = useState([]);
  const initItem = {
    id: '',
    number: '',
    busy: '', // select
    seats: '',
    active: '',
  };

  const [values, setValues] = useState({
    breadcrumbItems: [{ title: '', link: '#' }],
    empty_val: 0,
    cupomList: [],
    loading: false,
    modal_static: false,
    isAlertOpen: false,
    item: initItem,
  });
  const [subcategories,setSubcategories] = useState([]);
  const [subcategory,setSubcategory] = useState();
  const { breadcrumbItems, cupomList, modal_static, item, loading } = values;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const loadStatusValues = () => {
  };

  const loadadditional_services = () => {};

  const init = () => {
    setValues({ ...values, loading: true });
    setShowConfirmDelete(false);
    setDeleteItemId(null);
    getSubcategoryList().then((res) => {
      if (res.error)
        setValues({
          ...values,
          error: res.error,
          loading: false,
        });
      else {
        console.log(res);
        setSubcategories(res);
      }
    });
    getItemList().then((res) => {
      if (res.error)
        setValues({
          ...values,
          error: res.error,
          loading: false,
        });
      else {
        console.log(res);
        setValues({
          ...values,
          cupomList: res,
          modal_static: false,
          loading: false,
        });
      }
    });
  };

  useEffect(() => {
    init();
    loadStatusValues();
    loadadditional_services();
  }, []);

  const filladditional_services = (form) => {
    return additionalServiceList.map((service) => ({
      qty: +form.services[service.additional_service._id].qty,
      additional_service: { _id: service.additional_service._id },
    }));
  };

  const saveItem = (event, cupomFormData) => {
    cupomFormData.busy = false;
    cupomFormData.active = true;
    if (!item.id) {
      createItem( cupomFormData).then((result) => {
        if (result.error) {
          toastr.error(result.error);
        } else {
          toastr.success('Item criado com sucesso!');
          init();
        }
      });
    } else {
      cupomFormData.id = item.id;
      updateItem(cupomFormData).then((data) => {
        if (data.error) {
          toastr.error(data.error);
        } else {
          toastr.success('Item salvo com sucesso!');
          init();
        }
      });
    }
  };

  const editItem = (cupomId) => {
    const editItens = cupomList.filter((item) => item.id === cupomId);
    editItens.map((cupomItem) => {
      cupomItem.valid_thru = moment(cupomItem.valid_thru).format('YYYY-MM-DD');
      setSubcategory(cupomItem.sub_category_id);
      setValues({ ...values, item: cupomItem, modal_static: !modal_static });
    });
  };

  const deleteItem = () => {
    removeItem(deleteItemId).then((result) => {
      if (result.error) {
        toastr.error(result.error);
      } else {
        toastr.success('Item excluído com sucesso!');
        init();
      }
    });
  };

  const confirmDeleteItem = () => (
    <SweetAlert
      title="Tem certeza?"
      warning
      showCancel
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      onConfirm={() => {
        deleteItem();
      }}
      onCancel={() => {
        setShowConfirmDelete(false);
        setDeleteItemId(null);
      }}
    >
      Esta ação não poderá ser desfeita.
    </SweetAlert>
  );

  const addNewItem = () => {
    setValues({ ...values, item: initItem, modal_static: !modal_static });
  };

  const actionColumn = (cupomId) => (
    <Fragment>
      <Dropdown>
        <Dropdown.Toggle className="btn btn-sm btn-secondary">
          Editar <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              editItem(cupomId);
            }}
          >
            Ver/Alterar
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setShowConfirmDelete(true);
              setDeleteItemId(cupomId);
            }}
          >
            Excluir
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

  const formattedItemList = (itens) => {
    if (!itens) return [];
    return itens.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      sub_category_id: item.sub_category_id,
      sub_category_id: item.sub_category_id,
      value: item.value,
      image_url: item.image_url,
      action: actionColumn(item.id),
    }));
  };

  const tableItemContent = {
    columns: [
      { label: 'Nome do Item', field: 'name', sort: 'asc', width: 100 },
      {
        label: 'Descrição',
        field: 'description',
        sort: 'asc',
        width: 100,
      },
      { label: 'Ações', field: 'action', width: 150 },
    ],
    rows: formattedItemList(cupomList),
  };

  const showModalItem = () => {
    setValues({ ...values, modal_static: !modal_static });
  };

  const modalItem = () => (
    <Modal
      isOpen={modal_static}
      toggle={showModalItem}
      backdrop="static"
      centered
      size="lg"
    >
      <ModalHeader toggle={showModalItem}>
        {item.id ? 'Editar Item' : 'Adicionar Item'}
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={saveItem}>
          <Row>
            <Col lg={6}>
              <FormGroup>
                <Label htmlFor="name">Nome do item</Label>
                <AvField
                  name="name"
                  value={item.name}
                  type="text"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Número do item"
                  errorMessage=" Informe o Número do item."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
            <FormGroup>
                <Label htmlFor="description">Descrição</Label>
                <AvField
                  name="description"
                  value={item.description}
                  type="text"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Número de cadeiras"
                  errorMessage=" Informe o Número do item."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
            <FormGroup>
              <Label htmlFor="sub_category_id">Categoria</Label>
                <AvField
                  name="sub_category_id"
                  type="select"
                  className="form-control"
                  id="sub_category_id"
                  placeholder="UF"
                  errorMessage=" Informe a UF do endereço."
                  value={subcategory}
                >
                  <option>Selecione</option>
                  {subcategories.map((id, i) => (
                    <option value={id.id} key={i}>
                      {id.name}
                    </option>
                  ))}
                </AvField>
              </FormGroup>
            </Col>
            <Col lg={6}>
            <FormGroup>
                <Label htmlFor="value">Valor</Label>
                <AvField
                  name="value"
                  value={item.value}
                  type="number"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Número de cadeiras"
                  errorMessage=" Informe o Número do item."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
            <FormGroup>
                <Label htmlFor="image_url">Url da imagem</Label>
                <AvField
                  name="image_url"
                  value={item.image_url}
                  type="text"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Número de cadeiras"
                  errorMessage=" Informe o Número do item."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
          </Row>
          <ModalFooter>
            <Button type="button" color="light" onClick={showModalItem}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </ModalFooter>
        </AvForm>
      </ModalBody>
    </Modal>
  );

  const showLoading = () =>
    loading && (
      <Row className="justify-content-center">
        <Spinner className="align-items-center mr-2" color="primary" />
      </Row>
    );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Itens" breadcrumbItems={breadcrumbItems} />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <div>
                    <Link
                      to="#"
                      onClick={addNewItem}
                      className="btn btn-success mb-2"
                    >
                      <i className="mdi mdi-plus mr-2"></i> Novo Item
                    </Link>
                  </div>
                  {showLoading()}
                  <MDBDataTable
                    responsive
                    data={tableItemContent}
                    noBottomColumns
                    disableRetreatAfterSorting
                    infoLabel={['Mostrando', 'a', 'de', 'itens']}
                    searchLabel="Buscar"
                    paginationLabel={['Anterior', 'Próximo']}
                    entriesLabel="Mostrando itens"
                    noRecordsFoundLabel="Nenhum item encontrado"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {modalItem()}
          {showConfirmDelete && confirmDeleteItem()}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Itens;
