//import all dependencys
import React from 'react';
import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/badge';
import {Avatar} from 'primereact/avatar';
import {useNavigate} from 'react-router-dom';
import {Button} from 'primereact/button';
import {CSidebar, CSidebarNav, CNavTitle, CNavItem, CNGroup, CBadge, CSidebarToggler, CContainer, CForm, CFormInput, CButton} from '@coreui/react';
import {RiDashboardLine, RiMenu2Line, RiDowloadCloud2Line, RiArrowDownSLine} from 'react-icons/ri';
import {NavLink} from 'react-router-dom';


export default function Layout(){

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }

    //image of menubar and stylind
    const start = <img alt = 'logo' src = 'https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&' height = '40' className = 'mr-2'/>
    const end = (
        <div className = 'flex align-items-center gap-2'>
             <NavLink to='/' className='p-button p-component p-button-text' style={{  borderRadius: '10px', padding: '10px' }}>
                <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
                Logout
            </NavLink>
            {/* styling for all components: style{} */}
            {/* <Button icon = 'pi pi-sign-out' label = 'Logout' style = {{backgroundColor: '#183462', borderColor: '#183462', marginRight: '10px', borderRadius: '10px'}} onClick = {handleLogout}/> */}
            <Avatar icon = 'pi pi-user' size = 'large' shape = 'circle'/>
        </div>
    );

return (
    <div>
        <Menubar start = {start} end = {end}/>
        <CSidebar className = 'border-end custom-sidebar'>
            <CSidebarNav>
                <CContainer fluid>
                    <CForm className = 'd-flex'>
                        {/* <CFormInput type = 'search' className = 'search-item me-2' placeholder = 'Search'/>
                        <CButton type = 'submit' variant = 'outline' style = {{backgroundColor: '#183462', color: '#fff'}}>
                            Search
                        </CButton> */}
                    </CForm>
                </CContainer>
                <CNavItem>
                <NavLink to = '/querytool/mac' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/> MAC</NavLink>
                </CNavItem>

                <CNavItem>
                <NavLink to = '/querytool/logs' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>Logs</NavLink>
                </CNavItem>
                <CNavItem>
                    <NavLink to = '/querytool/searchhistory' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>SearchHistory</NavLink>
                </CNavItem>
            </CSidebarNav>
        </CSidebar>

        
        
    </div>
    
);
}


