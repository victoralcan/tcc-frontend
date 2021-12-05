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
  createRole,
  getRoleList,
  removeRole,
  updateRole,
  getStatusValues,
} from '../../services/role';
import { isAuthenticated } from '../../services/auth';
import Dropdown from 'react-bootstrap/Dropdown';

import './datatables.scss';
import { date } from 'date-fns/locale/af';

const Roles = () => {
  const [statusList, setStatusList] = useState([]);
  const [additionalServiceList, setAdditionalServiceList] = useState([]);
  const initRole = {
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
    role: initRole,
  });

  const { breadcrumbItems, cupomList, modal_static, role, loading } = values;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState(null);

  const loadStatusValues = () => {
  };

  const loadadditional_services = () => {};

  const init = () => {
    setValues({ ...values, loading: true });
    setShowConfirmDelete(false);
    setDeleteRoleId(null);
    getRoleList().then((res) => {
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

  const saveRole = (event, cupomFormData) => {
    cupomFormData.active = true;
    if (!role.id) {
      createRole( cupomFormData).then((result) => {
        if (result.error) {
          toastr.error(result.error);
        } else {
          toastr.success('Role criado com sucesso!');
          init();
        }
      });
    } else {
      cupomFormData.id = role.id;
      updateRole(cupomFormData).then((data) => {
        if (data.error) {
          toastr.error(data.error);
        } else {
          toastr.success('Role salvo com sucesso!');
          init();
        }
      });
    }
  };

  const editRole = (cupomId) => {
    const editRoles = cupomList.filter((item) => item.id === cupomId);
    editRoles.map((cupomItem) => {
      cupomItem.valid_thru = moment(cupomItem.valid_thru).format('YYYY-MM-DD');
      setValues({ ...values, role: cupomItem, modal_static: !modal_static });
    });
  };

  const deleteRole = () => {
    removeRole(deleteRoleId).then((result) => {
      if (result.error) {
        toastr.error(result.error);
      } else {
        toastr.success('Role excluído com sucesso!');
        init();
      }
    });
  };

  const confirmDeleteRole = () => (
    <SweetAlert
      title="Tem certeza?"
      warning
      showCancel
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      onConfirm={() => {
        deleteRole();
      }}
      onCancel={() => {
        setShowConfirmDelete(false);
        setDeleteRoleId(null);
      }}
    >
      Esta ação não poderá ser desfeita.
    </SweetAlert>
  );

  const addNewRole = () => {
    setValues({ ...values, role: initRole, modal_static: !modal_static });
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
              editRole(cupomId);
            }}
          >
            Ver/Alterar
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setShowConfirmDelete(true);
              setDeleteRoleId(cupomId);
            }}
          >
            Excluir
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

  const formattedRoleList = (roles) => {
    if (!roles) return [];
    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      action: actionColumn(role.id),
    }));
  };

  const tableRoleContent = {
    columns: [
      { label: 'Nome do Cargo', field: 'name', sort: 'asc', width: 100 },
      { label: 'Ações', field: 'action', width: 150 },
    ],
    rows: formattedRoleList(cupomList),
  };

  const showModalRole = () => {
    setValues({ ...values, modal_static: !modal_static });
  };

  const modalRole = () => (
    <Modal
      isOpen={modal_static}
      toggle={showModalRole}
      backdrop="static"
      centered
      size="lg"
    >
      <ModalHeader toggle={showModalRole}>
        {role.id ? 'Editar Role' : 'Adicionar Role'}
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={saveRole}>
          <Row>
            <Col lg={12}>
              <FormGroup>
                <Label htmlFor="name">Nome do cargo</Label>
                <AvField
                  name="name"
                  value={role.name}
                  type="text"
                  className="form-control"
                  id="cupomCode"
                  placeholder="Número do cargo"
                  errorMessage=" Informe o Número do cargo."
                  validate={{ required: { value: true } }}
                />
              </FormGroup>
            </Col>
          </Row>
          <ModalFooter>
            <Button type="button" color="light" onClick={showModalRole}>
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
          <Breadcrumbs title="Cargos" breadcrumbItems={breadcrumbItems} />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <div>
                    <Link
                      to="#"
                      onClick={addNewRole}
                      className="btn btn-success mb-2"
                    >
                      <i className="mdi mdi-plus mr-2"></i> Novo Cargo
                    </Link>
                  </div>
                  {showLoading()}
                  <MDBDataTable
                    responsive
                    data={tableRoleContent}
                    noBottomColumns
                    disableRetreatAfterSorting
                    infoLabel={['Mostrando', 'a', 'de', 'cargos']}
                    searchLabel="Buscar"
                    paginationLabel={['Anterior', 'Próximo']}
                    entriesLabel="Mostrando cargos"
                    noRecordsFoundLabel="Nenhum cargo encontrado"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {modalRole()}
          {showConfirmDelete && confirmDeleteRole()}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Roles;
