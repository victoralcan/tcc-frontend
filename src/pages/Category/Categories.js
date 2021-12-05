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
  createCategory,
  getCategoryList,
  removeCategory,
  updateCategory,
  getStatusValues,
} from '../../services/category';
import { isAuthenticated } from '../../services/auth';
import Dropdown from 'react-bootstrap/Dropdown';

import './datatables.scss';
import { date } from 'date-fns/locale/af';

const Categories = () => {
  const [statusList, setStatusList] = useState([]);
  const [additionalServiceList, setAdditionalServiceList] = useState([]);
  const initCategory = {
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
    category: initCategory,
  });

  const { breadcrumbItems, cupomList, modal_static, category, loading } = values;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const loadStatusValues = () => {
  };

  const loadadditional_services = () => {};

  const init = () => {
    setValues({ ...values, loading: true });
    setShowConfirmDelete(false);
    setDeleteCategoryId(null);
    getCategoryList().then((res) => {
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

  const saveCategory = (event, cupomFormData) => {
    cupomFormData.active = true;
    if (!category.id) {
      createCategory( cupomFormData).then((result) => {
        if (result.error) {
          toastr.error(result.error);
        } else {
          toastr.success('Category criado com sucesso!');
          init();
        }
      });
    } else {
      cupomFormData.id = category.id;
      updateCategory(cupomFormData).then((data) => {
        if (data.error) {
          toastr.error(data.error);
        } else {
          toastr.success('Category salvo com sucesso!');
          init();
        }
      });
    }
  };

  const editCategory = (cupomId) => {
    const editCategories = cupomList.filter((item) => item.id === cupomId);
    editCategories.map((cupomItem) => {
      cupomItem.valid_thru = moment(cupomItem.valid_thru).format('YYYY-MM-DD');
      setValues({ ...values, category: cupomItem, modal_static: !modal_static });
    });
  };

  const deleteCategory = () => {
    removeCategory(deleteCategoryId).then((result) => {
      if (result.error) {
        toastr.error(result.error);
      } else {
        toastr.success('Category excluído com sucesso!');
        init();
      }
    });
  };

  const confirmDeleteCategory = () => (
    <SweetAlert
      title="Tem certeza?"
      warning
      showCancel
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      onConfirm={() => {
        deleteCategory();
      }}
      onCancel={() => {
        setShowConfirmDelete(false);
        setDeleteCategoryId(null);
      }}
    >
      Esta ação não poderá ser desfeita.
    </SweetAlert>
  );

  const addNewCategory = () => {
    setValues({ ...values, category: initCategory, modal_static: !modal_static });
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
              editCategory(cupomId);
            }}
          >
            Ver/Alterar
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setShowConfirmDelete(true);
              setDeleteCategoryId(cupomId);
            }}
          >
            Excluir
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

  const formattedCategoryList = (categories) => {
    if (!categories) return [];
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      action: actionColumn(category.id),
    }));
  };

  const tableCategoryContent = {
    columns: [
      { label: 'Nome do Category', field: 'name', sort: 'asc', width: 100 },
      {
        label: 'Descrição',
        field: 'description',
        sort: 'asc',
        width: 100,
      },
      { label: 'Ações', field: 'action', width: 150 },
    ],
    rows: formattedCategoryList(cupomList),
  };

  const showModalCategory = () => {
    setValues({ ...values, modal_static: !modal_static });
  };

  const modalCategory = () => (
    <Modal
      isOpen={modal_static}
      toggle={showModalCategory}
      backdrop="static"
      centered
      size="lg"
    >
      <ModalHeader toggle={showModalCategory}>
        {category.id ? 'Editar Category' : 'Adicionar Category'}
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={saveCategory}>
          <Row>
            <Col lg={6}>
              <FormGroup>
                <Label htmlFor="name">Nome do category</Label>
                <AvField
                  name="name"
                  value={category.name}
                  type="text"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Número do category"
                  errorMessage=" Informe o Número do category."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
            <FormGroup>
                <Label htmlFor="description">Descrição</Label>
                <AvField
                  name="description"
                  value={category.description}
                  type="text"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Número de cadeiras"
                  errorMessage=" Informe o Número do category."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
          </Row>
          <ModalFooter>
            <Button type="button" color="light" onClick={showModalCategory}>
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
          <Breadcrumbs title="Categories" breadcrumbItems={breadcrumbItems} />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <div>
                    <Link
                      to="#"
                      onClick={addNewCategory}
                      className="btn btn-success mb-2"
                    >
                      <i className="mdi mdi-plus mr-2"></i> Novo Category
                    </Link>
                  </div>
                  {showLoading()}
                  <MDBDataTable
                    responsive
                    data={tableCategoryContent}
                    noBottomColumns
                    disableRetreatAfterSorting
                    infoLabel={['Mostrando', 'a', 'de', 'categories']}
                    searchLabel="Buscar"
                    paginationLabel={['Anterior', 'Próximo']}
                    entriesLabel="Mostrando categories"
                    noRecordsFoundLabel="Nenhum category encontrado"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {modalCategory()}
          {showConfirmDelete && confirmDeleteCategory()}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Categories;
