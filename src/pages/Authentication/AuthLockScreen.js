import React, { Component } from 'react';
import { Container, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import avatar2 from "../../assets/images/users/avatar-2.jpg";

class AuthLockScreen extends Component {

    componentDidMount(){
        document.body.classList.add("auth-body-bg");
    }

    componentWillUnmount(){
        document.body.classList.remove("auth-body-bg");
    }

    render() {
        return (
            <React.Fragment>
        <div className="home-btn d-none d-sm-block">
            <Link to="/"><i className="mdi mdi-home-variant h2 text-white"></i></Link>
        </div>
        <div>
            <Container fluid className="p-0">
                <Row className="no-gutters">
                    <Col lg={4}>
                        <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                            <div className="w-100">
                                <Row className="justify-content-center">
                                    <Col lg={9}>
                                        <div>
                                            <div className="text-center">
                                                <div>
                                                    <Link to="/" className="logo"><img src={logodark} height="50" alt="logo"/></Link>
                                                </div>
    
                                                <h4 className="font-size-18 mt-4">Tela Bloqueada</h4>
                                                <p className="text-muted">Digite sua senha para desbloquear a tela!</p>
                                            </div>

                                            <div className="p-2 mt-5">
                                                <AvForm className="form-horizontal">

                                                    <div className="user-thumb text-center mb-5">
                                                        <img src={avatar2} className="rounded-circle img-thumbnail avatar-md" alt="thumbnail"/>
                                                        <h5 className="font-size-15 mt-3">Jacob Lopez</h5>
                                                    </div>
                            
                                                    <FormGroup className="auth-form-group-custom mb-4">
                                                        <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                        <Label for="userpassword">Senha</Label>
                                                        <AvField name="password" validate={{required: true}} type="password" className="form-control" id="userpassword" placeholder="Digite sua senha"/>
                                                    </FormGroup>

                                                    <div className="mt-4 text-center">
                                                        <Button color="primary" className="w-md waves-effect waves-light" type="submit">Desbloquear</Button>
                                                    </div>
                                                </AvForm>
                                            </div>

                                            <div className="mt-5 text-center">
                                                <p>Não é você? Volte e <Link to="auth-login" className="font-weight-medium text-primary"> Entre </Link> </p>
                                                <p>© 2021 Plataforma AD. Feito com <i className="mdi mdi-heart text-danger"></i> no Distrito Federal</p>
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <div className="authentication-bg">
                            <div className="bg-overlay"></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
            </React.Fragment>
        );
    }
}

export default AuthLockScreen;