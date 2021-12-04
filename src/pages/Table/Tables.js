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
  createTable,
  getTableList,
  removeTable,
  updateTable,
  getStatusValues,
} from '../../services/table';
import { isAuthenticated } from '../../services/auth';
import Dropdown from 'react-bootstrap/Dropdown';

import './datatables.scss';
import { date } from 'date-fns/locale/af';

const Tables = () => {
  const [statusList, setStatusList] = useState([]);
  const [additionalServiceList, setAdditionalServiceList] = useState([]);
  const initTable = {
    _id: '',
    code: '',
    discount_type: '', // select
    discount_value: '',
    valid_thru: '',
    products_apply: '', // select
    customer_apply: '',
    cycles_qty: '',
    selling_model: '',
  };

  const [values, setValues] = useState({
    breadcrumbItems: [{ title: '', link: '#' }],
    empty_val: 0,
    cupomList: [],
    loading: false,
    modal_static: false,
    isAlertOpen: false,
    table: initTable,
  });

  const { breadcrumbItems, cupomList, modal_static, table, loading } = values;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTableId, setDeleteTableId] = useState(null);

  const loadStatusValues = () => {
  };

  const loadadditional_services = () => {};

  const init = () => {
    setValues({ ...values, loading: true });
    setShowConfirmDelete(false);
    setDeleteTableId(null);
    getTableList().then((res) => {
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

  const saveTable = (event, cupomFormData) => {
    cupomFormData.discount_value = parseNum(cupomFormData.discount_value, ',');
    cupomFormData.cycles_qty = parseNum(cupomFormData.cycles_qty, ',');
    cupomFormData.customer_apply = '';
    cupomFormData.products_apply = '';
    cupomFormData.valid_thru = moment(cupomFormData.valid_thru).endOf('day');
    if (!table._id) {
      createTable( cupomFormData).then((result) => {
        if (result.error) {
          toastr.error(result.error);
        } else {
          toastr.success('Table criado com sucesso!');
          init();
        }
      });
    } else {
      cupomFormData._id = table._id;
      updateTable(cupomFormData).then((data) => {
        if (data.error) {
          toastr.error(data.error);
        } else {
          toastr.success('Table salvo com sucesso!');
          init();
        }
      });
    }
  };

  const editTable = (cupomId) => {
    const editTables = cupomList.filter((item) => item.id === cupomId);
    editTables.map((cupomItem) => {
      cupomItem.valid_thru = moment(cupomItem.valid_thru).format('YYYY-MM-DD');
      setValues({ ...values, table: cupomItem, modal_static: !modal_static });
    });
  };

  const deleteTable = () => {
    removeTable(deleteTableId).then((result) => {
      if (result.error) {
        toastr.error(result.error);
      } else {
        toastr.success('Table excluído com sucesso!');
        init();
      }
    });
  };

  const confirmDeleteTable = () => (
    <SweetAlert
      title="Tem certeza?"
      warning
      showCancel
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      onConfirm={() => {
        deleteTable();
      }}
      onCancel={() => {
        setShowConfirmDelete(false);
        setDeleteTableId(null);
      }}
    >
      Esta ação não poderá ser desfeita.
    </SweetAlert>
  );

  const addNewTable = () => {
    setValues({ ...values, table: initTable, modal_static: !modal_static });
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
              editTable(cupomId);
            }}
          >
            Ver/Alterar
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setShowConfirmDelete(true);
              setDeleteTableId(cupomId);
            }}
          >
            Excluir
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

  const formattedTableList = (tables) => {
    if (!tables) return [];
    return tables.map((table) => ({
      id: table.id,
      number: table.number,
      busy: table.busy? 'Ocupada':'Livre',
      seats: table.seats,
      active: table.active,
      action: actionColumn(table.id),
    }));
  };

  const tableTableContent = {
    columns: [
      { label: 'Número do Table', field: 'number', sort: 'asc', width: 100 },
      {
        label: 'Ocupada',
        field: 'busy',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Assentos',
        field: 'seats',
        sort: 'asc',
        width: 100,
      },
      { label: 'Ações', field: 'action', width: 150 },
    ],
    rows: formattedTableList(cupomList),
  };

  const showModalTable = () => {
    setValues({ ...values, modal_static: !modal_static });
  };

  const modalTable = () => (
    <Modal
      isOpen={modal_static}
      toggle={showModalTable}
      backdrop="static"
      centered
      size="lg"
    >
      <ModalHeader toggle={showModalTable}>
        {table._id ? 'Editar Table' : 'Adicionar Table'}
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={saveTable}>
          <Row>
            <Col lg={6}>
              <FormGroup>
                <Label htmlFor="code">Código do table</Label>
                <AvField
                  name="code"
                  value={table.code}
                  type="text"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Código do table"
                  errorMessage=" Informe o código do table."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <Label htmlFor="valid_thru">Válido até</Label>
                <AvField
                  name="valid_thru"
                  placeholder="DD/MM/YYY"
                  type="date"
                  errorMessage=" Informe a validade do table."
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="cupomValid_thru"
                  value={table.valid_thru}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <FormGroup>
                <Label htmlFor="discount_type">Tipo de table</Label>
                <AvField
                  name="discount_type"
                  type="select"
                  errorMessage=" Selecione o tipo de table."
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="cupomDiscount_type"
                  value={table.discount_type}
                >
                  <option>Selecione</option>
                  <option value="percent" key="percent">
                    Porcentagem
                  </option>
                  <option value="value" key="value">
                    Valor
                  </option>
                </AvField>
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <Label htmlFor="discount_value">Valor do desconto</Label>
                <AvField
                  name="discount_value"
                  value={table.discount_value}
                  type="number"
                  className="form-control"
                  id="cupomDiscount_value"
                  placeholder="0"
                  errorMessage=" Informe o desconto do table."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <FormGroup>
                <Label htmlFor="selling_model">Modelo de venda</Label>
                <AvField
                  name="selling_model"
                  type="select"
                  errorMessage=" Selecione o modelo de venda."
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="cupomSelling_model"
                  value={table.selling_model}
                >
                  <option>Selecione</option>
                  <option value="plan" key="plan">
                    Plano
                  </option>
                  <option value="sale" key="sale">
                    Venda
                  </option>
                </AvField>
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <Label htmlFor="cycles_qty">Ciclos de desconto</Label>
                <AvField
                  name="cycles_qty"
                  value={table.cycles_qty}
                  type="number"
                  className="form-control"
                  id="cupomCycles_qty"
                  placeholder="0"
                  errorMessage=" Informe o desconto do table."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
          </Row>
          <ModalFooter>
            <Button type="button" color="light" onClick={showModalTable}>
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
          <Breadcrumbs title="Tables" breadcrumbItems={breadcrumbItems} />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <div>
                    <Link
                      to="#"
                      onClick={addNewTable}
                      className="btn btn-success mb-2"
                    >
                      <i className="mdi mdi-plus mr-2"></i> Novo Table
                    </Link>
                  </div>
                  {showLoading()}
                  <MDBDataTable
                    responsive
                    data={tableTableContent}
                    noBottomColumns
                    disableRetreatAfterSorting
                    infoLabel={['Mostrando', 'a', 'de', 'tables']}
                    searchLabel="Buscar"
                    paginationLabel={['Anterior', 'Próximo']}
                    entriesLabel="Mostrando tables"
                    noRecordsFoundLabel="Nenhum table encontrado"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {modalTable()}
          {showConfirmDelete && confirmDeleteTable()}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Tables;
