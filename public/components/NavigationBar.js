import React, { useState } from "react"
import {Link , withRouter} from "react-router-dom"
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
    DropdownItem,
    NavbarText
} from 'reactstrap';






//class NavigationBar extends React.Component {
/* const NavigationBar = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
 */

class NavigationBar extends React.Component {
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render(){

        // we need it for ACTIVE
    let currentLocation = this.props.location.pathname

        const {toggle} = this
        const {isOpen} = this.state
    return (
        <header>
            <div className="main-menu">
                <div className="container">

                    <Navbar className="navbar navbar-expand-lg navbar-light">
                        <NavbarBrand href="/">
                            <img src="/imgs/logo.png" alt="logo" />
                        </NavbarBrand>

                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>

                                <NavItem className="navbar-item" active={currentLocation=== '/' ? true : false}>
                                    <NavLink tag={Link} to="/">home</NavLink>
                                </NavItem>

                                <NavItem className="navbar-item" active={currentLocation=== '/shop' ? true : false}>
                                    <NavLink tag={Link} to="/shop">shop</NavLink>
                                </NavItem>

                                <NavItem className="navbar-item" active={currentLocation=== '/about' ? true : false}>
                                    <NavLink tag={Link} to="/about">about</NavLink>
                                </NavItem>

                                <NavItem className="navbar-item" active={currentLocation=== '/faq' ? true : false}>
                                    <NavLink tag={Link} to="/faq">faq</NavLink>
                                </NavItem>

                                <NavItem className="navbar-item" active={currentLocation=== '/login' ? true : false}>
                                    <NavLink tag={Link} to="/login">login</NavLink>
                                </NavItem>

                                <NavItem className="navbar-item" active={currentLocation=== '/register' ? true : false}>
                                    <NavLink tag={Link} to="/register">Register</NavLink>
                                </NavItem>
                            </Nav>

                            <div className="cart my-2 my-lg-0">
                                <span>
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                                <span className="quntity">3</span>
                            </div>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search here..." aria-label="Search" />
                                <span className="fa fa-search"></span>
                            </form>
                        </Collapse>



                    </Navbar>




                </div>
            </div>
        </header>
    )
}

}


export default  withRouter(NavigationBar) 