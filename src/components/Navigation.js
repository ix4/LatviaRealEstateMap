import React from 'react';
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

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar light expand="md">
        <NavbarBrand href="/">
          <img src="/favicon.png" width="25" height="25" alt="Brokalys" className="mr-2" />
          Brokalys
        </NavbarBrand>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <span className="flag-icon flag-icon-lv"></span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <span className="flag-icon flag-icon-lv"></span> Latviski
                </DropdownItem>
                <DropdownItem>
                  <span className="flag-icon flag-icon-gb"></span> English
                </DropdownItem>
                <DropdownItem>
                  <span className="flag-icon flag-icon-ru"></span> Ruski
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
