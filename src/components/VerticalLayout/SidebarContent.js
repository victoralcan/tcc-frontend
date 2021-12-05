import React, { Component } from 'react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

//i18n
import { withNamespaces } from 'react-i18next';

import { connect } from 'react-redux';
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from '../../store/actions';

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
  }

  initMenu() {
    new MetisMenu('#side-menu');

    var matchingMenuItem = null;
    var ul = document.getElementById('side-menu');
    var items = ul.getElementsByTagName('a');
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add('active');
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show');

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add('mm-active');
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t('Menu')}</li>
            <li>
              <Link to="/tables">
                <i className="ri-coupon-line"></i>
                <span className="ml-1">{this.props.t('Mesas')}</span>
              </Link>
            </li>
            <li>
              <Link to="/categories">
                <i className="ri-coupon-line"></i>
                <span className="ml-1">{this.props.t('Categorias')}</span>
              </Link>
            </li>
            <li>
              <Link to="/subcategories">
                <i className="ri-coupon-line"></i>
                <span className="ml-1">{this.props.t('Subcategorias')}</span>
              </Link>
            </li>
            <li>
              <Link to="/itens">
                <i className="ri-coupon-line"></i>
                <span className="ml-1">{this.props.t('Itens')}</span>
              </Link>
            </li>
            <li>
              <Link to="/roles">
                <i className="ri-coupon-line"></i>
                <span className="ml-1">{this.props.t('Cargos')}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/logout">
                <i className="ri-shut-down-line align-middle text-danger"></i>
                <span className="ml-1 text-danger">
                  {this.props.t('Logout')}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withNamespaces()(SidebarContent))
);
