import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Alert,
  Container,
  Label,
  FormGroup,
} from 'reactstrap';

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { checkLogin, apiError } from '../../store/actions';

// import images
import logodark from '../../assets/images/logo-dark.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, values) {
    this.props.checkLogin(values, this.props.history);
  }

  componentDidMount() {
    this.props.apiError('');
    document.body.classList.add('auth-body-bg');
  }

  componentWillUnmount() {
    document.body.classList.remove('auth-body-bg');
  }

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/">
            <i className="mdi mdi-home-variant h2 text-white"></i>
          </Link>
        </div>

        <div>
          <Container fluid className="p-0">
            <Row className="no-gutters">
              <Col lg={12}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <Row className="justify-content-center">
                      <Col lg={5}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/" className="logo">
                                <img src={logodark} height="90" alt="logo" />
                              </Link>
                            </div>

                            <h4 className="font-size-18 mt-4">Bem vindos!</h4>
                            <p className="text-muted">
                              Faça o login para acessar.
                            </p>
                          </div>

                          {this.props.loginError && this.props.loginError ? (
                            <Alert color="danger">
                              {this.props.loginError}
                            </Alert>
                          ) : null}

                          <div className="p-5 mt-5">
                            <AvForm
                              className="form-horizontal"
                              onValidSubmit={this.handleSubmit}
                            >
                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="username">
                                  Usuário ou Email
                                </Label>
                                <AvField
                                  name="username"
                                  value={this.state.username}
                                  type="text"
                                  className="form-control"
                                  id="username"
                                  validate={{ required: true }}
                                  placeholder="Informe o email ou nome de usuário"
                                  errorMessage="Campo obrigatório."
                                />
                              </FormGroup>

                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Senha</Label>
                                <AvField
                                  name="password"
                                  value={this.state.password}
                                  type="password"
                                  className="form-control"
                                  id="userpassword"
                                  placeholder="Informe a senha"
                                />
                              </FormGroup>

                              <div className="custom-control custom-checkbox">
                                <Input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customControlInline"
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customControlInline"
                                >
                                  Lembrar de mim
                                </Label>
                              </div>

                              <div className="mt-4 text-center">
                                <Button
                                  color="primary"
                                  className="w-md waves-effect waves-light px-5 py-3 btn-lg btn-block"
                                  type="submit"
                                >
                                  Entrar
                                </Button>
                              </div>

                              <div className="mt-4 text-center">
                                <Link
                                  to="/forgot-password"
                                  className="text-muted"
                                >
                                  <i className="mdi mdi-lock mr-1"></i> Esqueceu
                                  a sua senha?
                                </Link>
                              </div>
                            </AvForm>
                          </div>

                          <div className="mt-5 text-center">
                            {/* <p>Não tem uma conta? <Link to="/register" className="font-weight-medium text-primary"> Cadastre-se </Link> </p> */}
                            <p>
                              {new Date().getFullYear()} © Efeito Borboleta.
                              Feito com{' '}
                              <i className="mdi mdi-heart text-danger"></i> pela
                              AD.
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(
  connect(mapStatetoProps, { checkLogin, apiError })(Login)
);
