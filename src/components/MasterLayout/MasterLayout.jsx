import React, { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineMenu, AiOutlineUser, AiOutlineLogout, AiOutlineBank, AiOutlineUnorderedList } from "react-icons/ai";
import { GetUserDetail, RemoveSession } from '../../helpers/SessionHelper'
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { RiDashboardLine } from "react-icons/ri";
import { BsPeople, BsCircle, BsBox, BsBagPlus, BsCartPlus, BsBagX, BsGraphUp } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { IoCreateOutline } from "react-icons/io5";
import { Accordion } from 'react-bootstrap';
import { LogoutAlert } from '../../helpers/LogoutAlert';

const MasterLayout = (props) => {
    const user = GetUserDetail();
    let sideNavRef = useRef();
    let contentRef = useRef();
    let topNavRef = useRef();

    const OnMenuClickHandler = () => {
        const sideNav = sideNavRef;
        const content = contentRef;
        const topNav = topNavRef;

        if (sideNav.classList.contains('side-nav-open')) {
            sideNav.classList.add('side-nav-close')
            sideNav.classList.remove('side-nav-open')
            content.classList.add('content-expand');
            content.classList.remove('content')
            topNav.classList.add('top-nav-close')
            topNav.classList.remove('top-nav-open')
        }
        else {
            sideNav.classList.add('side-nav-open')
            sideNav.classList.remove('side-nav-close')
            content.classList.add('content')
            content.classList.remove('content-expand')
            topNav.classList.add('top-nav-open')
            topNav.classList.remove('top-nav-close')
        }
    }

    const OnLogOut = async () => {
        const res = await LogoutAlert();
        if (res.isConfirmed) {
            RemoveSession();
        }
    }

    const sidebarItems = [
        {
            title: 'Dashboard',
            icon: <RiDashboardLine className='side-bar-item-icon'></RiDashboardLine>,
            url: '/Dashboard',
            submenu: []
        },
        {
            title: 'Customer',
            icon: <BsPeople className='side-bar-item-icon'></BsPeople>,
            url: '/customer',
            submenu: [
                {
                    title: 'New Customer',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/CustomerCreateUpdatePage'
                },
                {
                    title: 'Customer List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/CustomerListPage'
                }
            ]
        },
        {
            title: 'Supplier',
            icon: <TbTruckDelivery className='side-bar-item-icon'></TbTruckDelivery>,
            url: '/supplier',
            submenu: [
                {
                    title: 'New Supplier',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/SupplierCreateUpdatePage'
                },
                {
                    title: 'Supplier List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/SupplierListPage'
                }
            ]
        },
        {
            title: 'Expense',
            icon: <AiOutlineBank className='side-bar-item-icon'></AiOutlineBank>,
            url: '/expense',
            submenu: [
                {
                    title: 'New Expense Type',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/ExpenseTypeCreateUpdatePage'
                },
                {
                    title: 'Expense Type List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/ExpenseTypeListPage'
                },
                {
                    title: 'New Expense',
                    icon: <IoCreateOutline size={16} className='side-bar-subitem-icon'></IoCreateOutline>,
                    url: '/ExpenseCreateUpdatePage'
                },
                {
                    title: 'Expense List',
                    icon: <AiOutlineUnorderedList size={16} className='side-bar-subitem-icon'></AiOutlineUnorderedList>,
                    url: '/ExpenseListPage'
                }
            ]
        },
        {
            title: 'Product',
            icon: <BsBox className='side-bar-item-icon'></BsBox>,
            url: '/product',
            submenu: [
                {
                    title: 'New Brand',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/BrandCreateUpdatePage'
                },
                {
                    title: 'Brand List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/BrandListPage'
                },
                {
                    title: 'New Category',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/CategoryCreateUpdatePage'
                },
                {
                    title: 'Category List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/CategoryListPage'
                },
                {
                    title: 'New Product',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/ProductCreateUpdatePage'
                },
                {
                    title: 'Product List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/ProductListPage'
                }
            ]
        },
        {
            title: 'Purchase',
            icon: <BsBagPlus className='side-bar-item-icon'></BsBagPlus>,
            url: '/purchase',
            submenu: [
                {
                    title: 'New Purchase',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/PurchaseCreateUpdatePage'
                },
                {
                    title: 'Purchase List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/PurchaseListPage'
                }
            ]
        },
        {
            title: 'Sales',
            icon: <BsCartPlus className='side-bar-item-icon'></BsCartPlus>,
            url: '/sales',
            submenu: [
                {
                    title: 'New Sales',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/SalesCreateUpdatePage'
                },
                {
                    title: 'Sales List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/SalesListPage'
                }
            ]
        },
        {
            title: 'Return',
            icon: <BsBagX className='side-bar-item-icon'></BsBagX>,
            url: '/return',
            submenu: [
                {
                    title: 'New Return',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/ReturnCreateUpdatePage'
                },
                {
                    title: 'Return List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/ReturnListPage'
                }
            ]
        },
        {
            title: 'Report',
            icon: <BsGraphUp className='side-bar-item-icon'></BsGraphUp>,
            url: '/report',
            submenu: [
                {
                    title: 'Sales Report',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/SalesReportPage'
                },
                {
                    title: 'Return Report',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/ReturnReportPage'
                },
                {
                    title: 'Purchase Report',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/PurchaseReportPage'
                },
                {
                    title: 'Expense Report',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/ExpenseReportPage'
                }
            ]
        }
    ]

    const IsSidebarAccordionActive = () => {
        let urlList = [];
        sidebarItems.map((item) => {
            urlList.push(
                item.submenu.map((subitem) => {
                    return subitem?.url
                })
            )
        })

        return urlList.findIndex((item) =>
            item.includes(window.location.pathname)
        )
    }

    return (
        <div>
            <Navbar className='fixed-top px-0'>
                <Container fluid={true}>
                    <Navbar.Brand>
                        <div ref={(div) => topNavRef = div} className='top-nav-open'>
                            <h4 className='text-white p-0 m-0'><a onClick={OnMenuClickHandler}><AiOutlineMenu></AiOutlineMenu></a></h4>
                        </div>
                    </Navbar.Brand>

                    <div className='float-right h-auto d-flex align-items-center'>
                        <div className='user-dropdown'>
                            <img className='icon-nav-img icon-nav' src={user.photo} alt=''></img>
                            <div className='user-dropdown-content'>
                                <div className='text-center mt-4'>
                                    <img className='icon-nav-img' src={user.photo} alt=''></img>
                                    <h6>{user.firstName}</h6>
                                    <hr className='user-dropdown-divider p-0'></hr>
                                    <NavLink to='/Profile' className='side-bar-item'>
                                        <AiOutlineUser className='side-bar-item-icon'></AiOutlineUser>
                                        <span className='side-bar-item-caption'>Profile</span>
                                    </NavLink>
                                    <a className='side-bar-item'>
                                        <AiOutlineLogout className='side-bar-item-icon'></AiOutlineLogout>
                                        <span onClick={OnLogOut} className='side-bar-item-caption'>Logout</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <div ref={(div) => sideNavRef = div} className='side-nav-open border-radious-0 card'>
                <NavLink to='/' className='d-flex justify-content-center sticky-top bg-white'>
                    <img src={logo} className='icon-nav-img-lg mt-3'></img>
                </NavLink>

                <Accordion defaultActiveKey={`${IsSidebarAccordionActive()}`}>
                    {
                        sidebarItems.map((item, index) => {
                            return item.submenu.length !== 0 ? (
                                <Accordion.Item key={index.toString()} eventKey={`${index}`} className='mt-2'>
                                    <Accordion.Header>
                                        <div className='side-bar-item'>
                                            {item.icon}
                                            <span className='side-bar-item-caption'>{item.title}</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            item.submenu.map((subitem, index) => (
                                                <NavLink key={index.toString()}
                                                    to={subitem.url}
                                                    className={(navData) =>
                                                        navData.isActive ? 'side-bar-subitem-active side-bar-subitem'
                                                            : 'side-bar-subitem'}>
                                                    {subitem.icon}
                                                    <span className='side-bar-subitem-caption'>{subitem.title}</span>
                                                </NavLink>
                                            ))
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>

                            ) : (
                                <NavLink
                                    to='/Dashboard'
                                    className={(navData) =>
                                        navData.isActive ? 'side-bar-item-active side-bar-item mt-2' : 'side-bar-item mt-2'
                                    }>
                                    {item.icon}
                                    <span className='side-bar-item-caption'>{item.title}</span>
                                </NavLink>
                            )

                        })
                    }
                </Accordion>
            </div>

            <div ref={(div) => contentRef = div} className='content'>
                {props.children}
            </div>
        </div>
    );
};

export default MasterLayout;