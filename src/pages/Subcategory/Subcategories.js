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
  createSubcategory,
  getSubcategoryList,
  removeSubcategory,
  updateSubcategory,
  getStatusValues,
} from '../../services/subcategory';
import {
  getCategoryList,
} from '../../services/category';
import { isAuthenticated } from '../../services/auth';
import Dropdown from 'react-bootstrap/Dropdown';

import './datatables.scss';
import { date } from 'date-fns/locale/af';

const Subcategories = () => {
  const [statusList, setStatusList] = useState([]);
  const [additionalServiceList, setAdditionalServiceList] = useState([]);
  const initSubcategory = {
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
    subcategory: initSubcategory,
  });
  const [categories,setCategories] = useState([]);
  const [category,setCategory] = useState();
  const { breadcrumbItems, cupomList, modal_static, subcategory, loading } = values;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteSubcategoryId, setDeleteSubcategoryId] = useState(null);

  const loadStatusValues = () => {
  };

  const loadadditional_services = () => {};

  const init = () => {
    setValues({ ...values, loading: true });
    setShowConfirmDelete(false);
    setDeleteSubcategoryId(null);
    getCategoryList().then((res) => {
      if (res.error)
        setValues({
          ...values,
          error: res.error,
          loading: false,
        });
      else {
        console.log(res);
        setCategories(res);
      }
    });
    getSubcategoryList().then((res) => {
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

  const saveSubcategory = (event, cupomFormData) => {
    cupomFormData.busy = false;
    cupomFormData.active = true;
    if (!subcategory.id) {
      createSubcategory( cupomFormData).then((result) => {
        if (result.error) {
          toastr.error(result.error);
        } else {
          toastr.success('Subcategory criado com sucesso!');
          init();
        }
      });
    } else {
      cupomFormData.id = subcategory.id;
      updateSubcategory(cupomFormData).then((data) => {
        if (data.error) {
          toastr.error(data.error);
        } else {
          toastr.success('Subcategory salvo com sucesso!');
          init();
        }
      });
    }
  };

  const editSubcategory = (cupomId) => {
    const editSubcategories = cupomList.filter((item) => item.id === cupomId);
    editSubcategories.map((cupomItem) => {
      cupomItem.valid_thru = moment(cupomItem.valid_thru).format('YYYY-MM-DD');
      setCategory(cupomItem.category_id);
      setValues({ ...values, subcategory: cupomItem, modal_static: !modal_static });
    });
  };

  const deleteSubcategory = () => {
    removeSubcategory(deleteSubcategoryId).then((result) => {
      if (result.error) {
        toastr.error(result.error);
      } else {
        toastr.success('Subcategory excluído com sucesso!');
        init();
      }
    });
  };

  const confirmDeleteSubcategory = () => (
    <SweetAlert
      title="Tem certeza?"
      warning
      showCancel
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      onConfirm={() => {
        deleteSubcategory();
      }}
      onCancel={() => {
        setShowConfirmDelete(false);
        setDeleteSubcategoryId(null);
      }}
    >
      Esta ação não poderá ser desfeita.
    </SweetAlert>
  );

  const addNewSubcategory = () => {
    setValues({ ...values, subcategory: initSubcategory, modal_static: !modal_static });
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
              editSubcategory(cupomId);
            }}
          >
            Ver/Alterar
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setShowConfirmDelete(true);
              setDeleteSubcategoryId(cupomId);
            }}
          >
            Excluir
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

  const formattedSubcategoryList = (subcategories) => {
    if (!subcategories) return [];
    return subcategories.map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.name,
      description: subcategory.description,
      seats: subcategory.seats,
      active: subcategory.active,
      action: actionColumn(subcategory.id),
    }));
  };

  const tableSubcategoryContent = {
    columns: [
      { label: 'Nome do Subcategory', field: 'name', sort: 'asc', width: 100 },
      {
        label: 'Descrição',
        field: 'description',
        sort: 'asc',
        width: 100,
      },
      { label: 'Ações', field: 'action', width: 150 },
    ],
    rows: formattedSubcategoryList(cupomList),
  };

  const showModalSubcategory = () => {
    setValues({ ...values, modal_static: !modal_static });
  };

  const modalSubcategory = () => (
    <Modal
      isOpen={modal_static}
      toggle={showModalSubcategory}
      backdrop="static"
      centered
      size="lg"
    >
      <ModalHeader toggle={showModalSubcategory}>
        {subcategory.id ? 'Editar Subcategory' : 'Adicionar Subcategory'}
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={saveSubcategory}>
          <Row>
            <Col lg={6}>
              <FormGroup>
                <Label htmlFor="name">Nome do subcategory</Label>
                <AvField
                  name="name"
                  value={subcategory.name}
                  type="text"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Número do subcategory"
                  errorMessage=" Informe o Número do subcategory."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
            <FormGroup>
                <Label htmlFor="description">Descrição</Label>
                <AvField
                  name="description"
                  value={subcategory.description}
                  type="text"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Número de cadeiras"
                  errorMessage=" Informe o Número do subcategory."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
            <FormGroup>
              <Label htmlFor="category_id">Estado</Label>
                <AvField
                  name="category_id"
                  type="select"
                  className="form-control"
                  id="category_id"
                  placeholder="UF"
                  errorMessage=" Informe a UF do endereço."
                  value={category}
                >
                  <option>Selecione</option>
                  {categories.map((id, i) => (
                    <option value={id.id} key={i}>
                      {id.name}
                    </option>
                  ))}
                </AvField>
              </FormGroup>
            </Col>
          </Row>
          <ModalFooter>
            <Button type="button" color="light" onClick={showModalSubcategory}>
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
          <Breadcrumbs title="Subcategories" breadcrumbItems={breadcrumbItems} />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <div>
                    <Link
                      to="#"
                      onClick={addNewSubcategory}
                      className="btn btn-success mb-2"
                    >
                      <i className="mdi mdi-plus mr-2"></i> Novo Subcategory
                    </Link>
                  </div>
                  {showLoading()}
                  <MDBDataTable
                    responsive
                    data={tableSubcategoryContent}
                    noBottomColumns
                    disableRetreatAfterSorting
                    infoLabel={['Mostrando', 'a', 'de', 'subcategories']}
                    searchLabel="Buscar"
                    paginationLabel={['Anterior', 'Próximo']}
                    entriesLabel="Mostrando subcategories"
                    noRecordsFoundLabel="Nenhum subcategory encontrado"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {modalSubcategory()}
          {showConfirmDelete && confirmDeleteSubcategory()}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Subcategories;
