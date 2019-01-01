import React from 'react';
import { withNamespaces } from 'react-i18next';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';

import i18n from '../i18n';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      language: i18n.language,
      flag: i18n.language === 'en' ? 'gb' : i18n.language,
    };
  }

  changeLanguage(language) {
    i18n.changeLanguage(language);
    this.setState({
      language,
      flag: language === 'en' ? 'gb' : language,
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img
            src="/favicon.png"
            width="25"
            height="25"
            alt="Brokalys"
            className="mr-2"
          />
          Brokalys
        </NavbarBrand>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <span className={'flag-icon flag-icon-' + this.state.flag} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.changeLanguage('lv')}>
                  <span className="flag-icon flag-icon-lv" /> Latviski
                </DropdownItem>
                <DropdownItem onClick={() => this.changeLanguage('en')}>
                  <span className="flag-icon flag-icon-gb" /> English
                </DropdownItem>
                <DropdownItem onClick={() => this.changeLanguage('ru')}>
                  <span className="flag-icon flag-icon-ru" /> Ruski
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default withNamespaces()(Navigation);
