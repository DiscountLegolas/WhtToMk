import React, { useState } from 'react';
import logo from './14a516824da54b95b059d3ce8626c103.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
function Navigation() {
    const [isOpen, setisOpen] = useState(true);
    return (
        <div className="navigation-n">
            <Navbar style={{ backgroundColor: '#5B98B7' }} light expand="md">
                <NavbarToggler onClick={() => setisOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Tarif Bul
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    İsim ile
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Malzeme İle
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        )
}
export { Navigation }