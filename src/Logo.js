import logo from './Ne Yapsam .com.png';
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap';
function Logo() {
    return (
        <div className="navigation">
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/"><img
                    src={logo}
                    width="150"
                    height="150"
                    className="d-inline-block align-top"
                    alt="Logo"
                />
                </NavbarBrand>
            </Navbar>
        </div>
        )
}
export { Logo }