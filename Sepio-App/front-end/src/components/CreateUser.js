// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import SepioMainLogo from './../image/QueryTool.png';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// export default function Layout({ icon_username }) {
// 	const navigate = useNavigate();
// 	const [logoHeight, setLogoHeight] = useState('60px');
// 	const [isScrollDisabled, setIsScrollDisabled] = useState(true);

// 	const handleLogout = () => {
// 		navigate('/');
// 	};

// 	const handleResize = () => {
// 		if (window.innerWidth <= 480) {
// 			setLogoHeight('20px');
// 		} else if (window.innerWidth <= 868) {
// 			setLogoHeight('20px');
// 		} else {
// 			setLogoHeight('40px');
// 		}
// 	};

// 	// useEffect(() => {
// 	// 	if (isScrollDisabled) {
// 	// 		document.body.style.overflow = 'hidden';
// 	// 	} else {
// 	// 		document.body.style.overflow = 'auto';
// 	// 	}

// 	// 	return () => {
// 	// 		document.body.style.overflow = 'auto';
// 	// 	}
// 	// }, [isScrollDisabled]);


// 	useEffect(() => {
// 		window.addEventListener('resize', handleResize);
// 		handleResize(); // Call it initially to set the correct size

// 		return () => {
// 			window.removeEventListener('resize', handleResize);
// 		};
// 	}, []);

// 	const [dropDown, setDropDown] = useState(null);
// 	const open = Boolean(dropDown);
// 	const handleClick = (event) => {
// 		setDropDown(event.currentTarget);
// 	};
// 	const handleClose = () => {
// 		setDropDown(null);
// 	};

// 	const start = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
// 	const end = (
// 		<div className='flex align-items-center gap-2'>
// 			<NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
// 				<span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
// 				Logout
// 			</NavLink>
// 			<Menu
// 				anchorEl={dropDown}
// 				id='account-menu'
// 				open={open}
// 				onClose={handleClose}
// 				onClick={handleClose}
// 				PaperProps={{
// 					elevation: 5,
// 					sx: {
// 						width: '120px',
// 						borderRadius: '10px',
// 						overflow: 'visible',
// 						mt: 1,
// 						'&::before': {
// 							content: '""',
// 							display: 'inline-block',
// 							position: 'absolute',
// 							top: 0,
// 							right: 10,
// 							width: 10,
// 							height: 10,
// 							bgcolor: 'background.paper',
// 							transform: 'translateY(-50%) rotate(45deg)',
// 							zIndex: 0,
// 						},
// 					},
// 				}}
// 				transformOrigin={{
// 					vertical: 'top',
// 					horizontal: 'center',
// 				}}
// 				anchorOrigin={{
// 					vertical: 'bottom',
// 					horizontal: 'center',
// 				}}
// 			>
// 				<MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
// 					<p style={{ marginBottom: '0px' }}>
// 						User: {icon_username}
// 					</p>
// 				</MenuItem>
// 			</Menu>

// 			<Button
// 				style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
// 				icon="pi pi-user"
// 				rounded
// 				text
// 				severity="secondary"
// 				aria-label="User"
// 				className="mr-2"
// 				onClick={handleClick}
// 				aria-controls={open ? 'account-menu' : undefined}
// 				aria-haspopup="true"
// 				aria-expanded={open ? 'true' : undefined}
// 			/>
// 		</div>
// 	);

// 	const data = [
// 		{ id: 1, username: 'user1', password: 'password1' },
// 		{ id: 2, username: 'user2', password: 'password2' },
// 		{ id: 3, username: 'user3', password: 'password3' },
// 	];

// 	return (
// 		<div>
// 			<Menubar start={start} end={end} />
// 			<div>
// 				<CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
// 					<CSidebarNav>
// 						<CContainer fluid>
// 							<CForm className='d-flex'>
// 							</CForm>
// 						</CContainer>
// 						<CNavItem>
// 							<NavLink to='/querytool/mac' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' />MAC
// 							</NavLink>
// 						</CNavItem>
// 						<CNavItem>
// 							<NavLink to='/querytool/settings' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Settings
// 							</NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Users
// 							</NavLink>
// 						</CNavItem>
// 					</CSidebarNav>
// 				</CSidebar>
// 				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '-700px' }}>
// 					<TableContainer component={Paper} style={{ maxWidth: '600px'}}>
// 						<Table aria-label="simple table">
// 							<TableHead>
// 								<TableRow>
// 									<TableCell>ID</TableCell>
// 									<TableCell>Username</TableCell>
// 									<TableCell>Password</TableCell>
// 								</TableRow>
// 							</TableHead>
// 							<TableBody>
// 								{data.map((row) => (
// 									<TableRow key={row.id}>
// 										<TableCell>{row.id}</TableCell>
// 										<TableCell>{row.username}</TableCell>
// 										<TableCell>{row.password}</TableCell>
// 									</TableRow>
// 								))}
// 							</TableBody>
// 						</Table>
// 					</TableContainer>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }










// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import SepioMainLogo from './../image/QueryTool.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

// export default function Layout({ icon_username }) {
// 	const navigate = useNavigate();
// 	const [logoHeight, setLogoHeight] = useState('60px');
// 	const [isScrollDisabled, setIsScrollDisabled] = useState(true);

// 	const handleLogout = () => {
// 		navigate('/');
// 	};

// 	const handleResize = () => {
// 		if (window.innerWidth <= 480) {
// 			setLogoHeight('20px');
// 		} else if (window.innerWidth <= 868) {
// 			setLogoHeight('20px');
// 		} else {
// 			setLogoHeight('40px');
// 		}
// 	};




// 	useEffect(() => {
// 		window.addEventListener('resize', handleResize);
// 		handleResize(); // Call it initially to set the correct size

// 		return () => {
// 			window.removeEventListener('resize', handleResize);
// 		};
// 	}, []);

// 	const [dropDown, setDropDown] = useState(null);
// 	const open = Boolean(dropDown);
// 	const handleClick = (event) => {
// 		setDropDown(event.currentTarget);
// 	};
// 	const handleClose = () => {
// 		setDropDown(null);
// 	};

// 	const start = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
// 	const end = (
// 		<div className='flex align-items-center gap-2'>
// 			<NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
// 				<span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
// 				Logout
// 			</NavLink>
// 			<Menu
// 				anchorEl={dropDown}
// 				id='account-menu'
// 				open={open}
// 				onClose={handleClose}
// 				onClick={handleClose}
// 				PaperProps={{
// 					elevation: 5,
// 					sx: {
// 						width: '120px',
// 						borderRadius: '10px',
// 						overflow: 'visible',
// 						mt: 1,
// 						'&::before': {
// 							content: '""',
// 							display: 'inline-block',
// 							position: 'absolute',
// 							top: 0,
// 							right: 10,
// 							width: 10,
// 							height: 10,
// 							bgcolor: 'background.paper',
// 							transform: 'translateY(-50%) rotate(45deg)',
// 							zIndex: 0,
// 						},
// 					},
// 				}}
// 				transformOrigin={{
// 					vertical: 'top',
// 					horizontal: 'center',
// 				}}
// 				anchorOrigin={{
// 					vertical: 'bottom',
// 					horizontal: 'center',
// 				}}
// 			>
// 				<MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
// 					<p style={{ marginBottom: '0px' }}>
// 						User: {icon_username}
// 					</p>
// 				</MenuItem>
// 			</Menu>

// 			<Button
// 				style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
// 				icon="pi pi-user"
// 				rounded
// 				text
// 				severity="secondary"
// 				aria-label="User"
// 				className="mr-2"
// 				onClick={handleClick}
// 				aria-controls={open ? 'account-menu' : undefined}
// 				aria-haspopup="true"
// 				aria-expanded={open ? 'true' : undefined}
// 			/>
// 		</div>
// 	);

// 	const data = [
// 		{ id: 1, username: 'user1', password: 'password1' },
// 		{ id: 2, username: 'user2', password: 'password2' },
// 		{ id: 3, username: 'user3', password: 'password3' },
// 		{ id: 4, username: 'user4', password: 'password4' },
// 		{ id: 5, username: 'user5', password: 'password5' },
// 		{ id: 6, username: 'user6', password: 'password6' },
// 		{ id: 7, username: 'user7', password: 'password7' },
// 		{ id: 8, username: 'user8', password: 'password8' },
// 		{ id: 9, username: 'user9', password: 'password9' },
// 		{ id: 10, username: 'user10', password: 'password10' },
// 		{ id: 11, username: 'user11', password: 'password11' },
// 		{ id: 12, username: 'user12', password: 'password12' }
// 	];

// 	const [first, setFirst] = useState(0);
// 	const [rows, setRows] = useState(10);

// 	const onPage = (event) => {
// 		setFirst(event.first);
// 		setRows(event.rows);
// 	};

// 	return (
// 		<div>
// 			<Menubar start={start} end={end} />
// 			<div>
// 				<CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
// 					<CSidebarNav>
// 						<CContainer fluid>
// 							<CForm className='d-flex'>
// 							</CForm>
// 						</CContainer>
// 						<CNavItem>
// 							<NavLink to='/querytool/mac' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' />MAC
// 							</NavLink>
// 						</CNavItem>
// 						<CNavItem>
// 							<NavLink to='/querytool/settings' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Settings
// 							</NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Create User
// 							</NavLink>
// 						</CNavItem>
// 					</CSidebarNav>
// 				</CSidebar>
// 				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', width: '150%'}}>
// 					<DataTable 
// 						value={data} 
// 						paginator 
// 						rows={rows} 
// 						rowsPerPageOptions={[5, 10, 20]} 
// 						responsiveLayout="scroll"
// 						first={first} 
// 						onPage={onPage}>
// 						<Column field="id" header="ID"></Column>
// 						<Column field="username" header="Username"></Column>
// 						<Column field="password" header="Password"></Column>
// 					</DataTable>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }


















// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import SepioMainLogo from './../image/QueryTool.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

// export default function Layout({ icon_username }) {
// 	const navigate = useNavigate();
// 	const [logoHeight, setLogoHeight] = useState('60px');
// 	const [isScrollDisabled, setIsScrollDisabled] = useState(true);

// 	const handleLogout = () => {
// 		navigate('/');
// 	};

// 	const handleResize = () => {
// 		if (window.innerWidth <= 480) {
// 			setLogoHeight('20px');
// 		} else if (window.innerWidth <= 868) {
// 			setLogoHeight('20px');
// 		} else {
// 			setLogoHeight('40px');
// 		}
// 	};

// 	useEffect(() => {
// 		window.addEventListener('resize', handleResize);
// 		handleResize(); // Call it initially to set the correct size

// 		return () => {
// 			window.removeEventListener('resize', handleResize);
// 		};
// 	}, []);

// 	const [dropDown, setDropDown] = useState(null);
// 	const open = Boolean(dropDown);
// 	const handleClick = (event) => {
// 		setDropDown(event.currentTarget);
// 	};
// 	const handleClose = () => {
// 		setDropDown(null);
// 	};

// 	const start = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
// 	const end = (
// 		<div className='flex align-items-center gap-2'>
// 			<NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
// 				<span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
// 				Logout
// 			</NavLink>
// 			<Menu
// 				anchorEl={dropDown}
// 				id='account-menu'
// 				open={open}
// 				onClose={handleClose}
// 				onClick={handleClose}
// 				PaperProps={{
// 					elevation: 5,
// 					sx: {
// 						width: '120px',
// 						borderRadius: '10px',
// 						overflow: 'visible',
// 						mt: 1,
// 						'&::before': {
// 							content: '""',
// 							display: 'inline-block',
// 							position: 'absolute',
// 							top: 0,
// 							right: 10,
// 							width: 10,
// 							height: 10,
// 							bgcolor: 'background.paper',
// 							transform: 'translateY(-50%) rotate(45deg)',
// 							zIndex: 0,
// 						},
// 					},
// 				}}
// 				transformOrigin={{
// 					vertical: 'top',
// 					horizontal: 'center',
// 				}}
// 				anchorOrigin={{
// 					vertical: 'bottom',
// 					horizontal: 'center',
// 				}}
// 			>
// 				<MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
// 					<p style={{ marginBottom: '0px' }}>
// 						User: {icon_username}
// 					</p>
// 				</MenuItem>
// 			</Menu>

// 			<Button
// 				style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
// 				icon="pi pi-user"
// 				rounded
// 				text
// 				severity="secondary"
// 				aria-label="User"
// 				className="mr-2"
// 				onClick={handleClick}
// 				aria-controls={open ? 'account-menu' : undefined}
// 				aria-haspopup="true"
// 				aria-expanded={open ? 'true' : undefined}
// 			/>
// 		</div>
// 	);

// 	const data = [
// 		{ id: 1, username: 'user1', password: 'passwordffffffffffffffffffffffffffffffffffffffffffffffffffffffff1' },
// 		{ id: 2, username: 'user2', password: 'password2' },
// 		{ id: 3, username: 'user3', password: 'password3' },
// 		{ id: 4, username: 'user4', password: 'password4' },
// 		{ id: 5, username: 'user5', password: 'password5' },
// 		{ id: 6, username: 'user6', password: 'password6' },
// 		{ id: 7, username: 'user7', password: 'password7' },
// 		{ id: 8, username: 'user8', password: 'password8' },
// 		{ id: 9, username: 'user9', password: 'password9' },
// 		{ id: 10, username: 'user10', password: 'password10' },
// 		{ id: 11, username: 'user11', password: 'password11' },
// 		{ id: 12, username: 'user12', password: 'password12' }
// 	];

// 	const [first, setFirst] = useState(0);
// 	const [rows, setRows] = useState(10);

// 	const onPage = (event) => {
// 		setFirst(event.first);
// 		setRows(event.rows);
// 	};

// 	const handleNew = () => {
// 		// Implement the action for the "New" button here
// 		console.log("New button clicked");
// 	};

// 	return (
// 		<div>
// 			<Menubar start={start} end={end} />
// 			<div>
// 				<CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
// 					<CSidebarNav>
// 						<CContainer fluid>
// 							<CForm className='d-flex'>
// 							</CForm>
// 						</CContainer>
// 						<CNavItem>
// 							<NavLink to='/querytool/mac' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' />MAC
// 							</NavLink>
// 						</CNavItem>
// 						<CNavItem>
// 							<NavLink to='/querytool/settings' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Settings
// 							</NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Create User
// 							</NavLink>
// 						</CNavItem>
// 					</CSidebarNav>
// 				</CSidebar>
// 				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '-800px', width: '100%', marginLeft: '250px' }}>
// 					<div style={{ flex: 1, position: 'relative' }}>
// 						<DataTable 
// 							value={data} 
// 							paginator 
// 							rows={rows} 
// 							rowsPerPageOptions={[5, 10, 20]} 
// 							responsiveLayout="scroll"
// 							first={first} 
// 							onPage={onPage}
// 							style={{ border: '1px solid #dee2e6', borderCollapse: 'collapse' }}
// 							className="p-datatable-gridlines">
// 							<Column field="id" header="ID" style={{ borderRight: '1px solid #dee2e6' }}></Column>
// 							<Column field="username" header="Username" style={{ borderRight: '1px solid #dee2e6' }}></Column>
// 							<Column field="password" header="Password" style={{ borderRight: '1px solid #dee2e6' }}></Column>
// 							<Column field = 'privileges'header = "Privilages" style = {{borderRight: '1px solid #dee2e6'}}></Column>
// 						</DataTable>
// 					</div>
// 					<div style={{ marginLeft: '10px', alignSelf: 'flex-start' }}>
// 						<Button label="New" icon="pi pi-plus" onClick={handleNew} />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }














// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import SepioMainLogo from './../image/QueryTool.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';

// export default function Layout({ icon_username }) {
// 	const navigate = useNavigate();
// 	const [logoHeight, setLogoHeight] = useState('60px');
// 	const [isScrollDisabled, setIsScrollDisabled] = useState(true);

// 	const handleLogout = () => {
// 		navigate('/');
// 	};

// 	const handleResize = () => {
// 		if (window.innerWidth <= 480) {
// 			setLogoHeight('20px');
// 		} else if (window.innerWidth <= 868) {
// 			setLogoHeight('20px');
// 		} else {
// 			setLogoHeight('40px');
// 		}
// 	};

// 	useEffect(() => {
// 		window.addEventListener('resize', handleResize);
// 		handleResize(); // Call it initially to set the correct size

// 		return () => {
// 			window.removeEventListener('resize', handleResize);
// 		};
// 	}, []);

// 	const [dropDown, setDropDown] = useState(null);
// 	const open = Boolean(dropDown);
// 	const handleClick = (event) => {
// 		setDropDown(event.currentTarget);
// 	};
// 	const handleClose = () => {
// 		setDropDown(null);
// 	};

// 	const start = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
// 	const end = (
// 		<div className='flex align-items-center gap-2'>
// 			<NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
// 				<span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
// 				Logout
// 			</NavLink>
// 			<Menu
// 				anchorEl={dropDown}
// 				id='account-menu'
// 				open={open}
// 				onClose={handleClose}
// 				onClick={handleClose}
// 				PaperProps={{
// 					elevation: 5,
// 					sx: {
// 						width: '120px',
// 						borderRadius: '10px',
// 						overflow: 'visible',
// 						mt: 1,
// 						'&::before': {
// 							content: '""',
// 							display: 'inline-block',
// 							position: 'absolute',
// 							top: 0,
// 							right: 10,
// 							width: 10,
// 							height: 10,
// 							bgcolor: 'background.paper',
// 							transform: 'translateY(-50%) rotate(45deg)',
// 							zIndex: 0,
// 						},
// 					},
// 				}}
// 				transformOrigin={{
// 					vertical: 'top',
// 					horizontal: 'center',
// 				}}
// 				anchorOrigin={{
// 					vertical: 'bottom',
// 					horizontal: 'center',
// 				}}
// 			>
// 				<MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
// 					<p style={{ marginBottom: '0px' }}>
// 						User: {icon_username}
// 					</p>
// 				</MenuItem>
// 			</Menu>

// 			<Button
// 				style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
// 				icon="pi pi-user"
// 				rounded
// 				text
// 				severity="secondary"
// 				aria-label="User"
// 				className="mr-2"
// 				onClick={handleClick}
// 				aria-controls={open ? 'account-menu' : undefined}
// 				aria-haspopup="true"
// 				aria-expanded={open ? 'true' : undefined}
// 			/>
// 		</div>
// 	);

// 	const data = [
// 		{ id: 1, username: 'user1', password: 'passwordffffffffffffffffffffffffffffffffffffffffffffffffffffffff1', privileges: 'admin' },
// 		{ id: 2, username: 'user2', password: 'password2', privileges: 'user' },
// 		{ id: 3, username: 'user3', password: 'password3', privileges: 'user' },
// 		{ id: 4, username: 'user4', password: 'password4', privileges: 'admin' },
// 		{ id: 5, username: 'user5', password: 'password5', privileges: 'user' },
// 		{ id: 6, username: 'user6', password: 'password6', privileges: 'user' },
// 		{ id: 7, username: 'user7', password: 'password7', privileges: 'admin' },
// 		{ id: 8, username: 'user8', password: 'password8', privileges: 'user' },
// 		{ id: 9, username: 'user9', password: 'password9', privileges: 'user' },
// 		{ id: 10, username: 'user10', password: 'password10', privileges: 'admin' },
// 		{ id: 11, username: 'user11', password: 'password11', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' }
// 	];

// 	const [first, setFirst] = useState(0);
// 	const [rows, setRows] = useState(10);

// 	const onPage = (event) => {
// 		setFirst(event.first);
// 		setRows(event.rows);
// 	};

// 	const handleNew = () => {
// 		// Implement the action for the "New" button here
// 		console.log("New button clicked");
// 	};

// 	const bodyTemplate = (rowData, column) => {
// 		return (
// 			<Tooltip title={rowData[column.field]} arrow>
// 				<span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '200px' }}>
// 					{rowData[column.field]}
// 				</span>
// 			</Tooltip>
// 		);
// 	};

// 	return (
// 		<div>
// 			<Menubar start={start} end={end} />
// 			<div>
// 				<CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
// 					<CSidebarNav>
// 						<CContainer fluid>
// 							<CForm className='d-flex'>
// 							</CForm>
// 						</CContainer>
// 						<CNavItem>
// 							<NavLink to='/querytool/mac' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' />MAC
// 							</NavLink>
// 						</CNavItem>
// 						<CNavItem>
// 							<NavLink to='/querytool/settings' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Settings
// 							</NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Create User
// 							</NavLink>
// 						</CNavItem>
// 					</CSidebarNav>
// 				</CSidebar>
// 				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '-800px', width: '100%', marginLeft: '250px' }}>
// 					<div style={{ flex: 1, position: 'relative', overflowX: 'auto' }}>
// 						<DataTable 
// 							value={data} 
// 							paginator 
// 							rows={rows} 
// 							rowsPerPageOptions={[5, 10, 20]} 
// 							responsiveLayout="scroll"
// 							first={first} 
// 							onPage={onPage}
// 							style={{ border: '1px solid #dee2e6', borderCollapse: 'collapse' }}
// 							className="p-datatable-gridlines">
// 							<Column field="id" header="ID" style={{ borderRight: '1px solid #dee2e6', width: '100px' }} body={bodyTemplate}></Column>
// 							<Column field="username" header="Username" style={{ borderRight: '1px solid #dee2e6', width: '200px' }} body={bodyTemplate}></Column>
// 							<Column field="password" header="Password" style={{ borderRight: '1px solid #dee2e6', width: '300px' }} body={bodyTemplate}></Column>
// 							<Column field="privileges" header="Privileges" style={{ borderRight: '1px solid #dee2e6', width: '150px' }} body={bodyTemplate}></Column>
// 						</DataTable>
// 					</div>
// 					<div style={{ marginLeft: '10px', alignSelf: 'flex-start' }}>
// 						<Button label="New" icon="pi pi-plus" onClick={handleNew} />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
















// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import './Layout.css'; // Import the CSS file

// export default function Layout({ icon_username }) {
//     const [logoHeight, setLogoHeight] = useState('60px');
//     const [dropDown, setDropDown] = useState(null);
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleResize = () => {
//         if (window.innerWidth <= 480) {
//             setLogoHeight('20px');
//         } else if (window.innerWidth <= 868) {
//             setLogoHeight('20px');
//         } else {
//             setLogoHeight('40px');
//         }
//     };

//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         handleResize(); // Call it initially to set the correct size

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const open = Boolean(dropDown);
//     const handleClick = (event) => {
//         setDropDown(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDropDown(null);
//     };

//     const start = (
//         <img
//             alt='logo'
//             style={{ cursor: 'pointer' }}
//             src={SepioLogo}
//             height={logoHeight}
//             className='mr-2'
//         />
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink
//                 to='/'
//                 className='p-button p-component p-button-text'
//                 style={{
//                     borderRadius: '10px',
//                     padding: '10px',
//                     textDecoration: 'none',
//                 }}
//             >
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu
//                 anchorEl={dropDown}
//                 id='account-menu'
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                     elevation: 5,
//                     sx: {
//                         width: '120px',
//                         borderRadius: '10px',
//                         overflow: 'visible',
//                         mt: 1,
//                         '&::before': {
//                             content: '""',
//                             display: 'inline-block',
//                             position: 'absolute',
//                             top: 0,
//                             right: 10,
//                             width: 10,
//                             height: 10,
//                             bgcolor: 'background.paper',
//                             transform: 'translateY(-50%) rotate(45deg)',
//                             zIndex: 0,
//                         },
//                     },
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//             >
//                 <MenuItem
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                     }}
//                     title='Profile'
//                 >
//                     <p style={{ marginBottom: '0px' }}>User: {icon_username}</p>
//                 </MenuItem>
//             </Menu>

//             <Button
//                 style={{
//                     width: '46px',
//                     height: '46px',
//                     borderRadius: '50%',
//                     color: '#183462',
//                 }}
//                 icon='pi pi-user'
//                 rounded
//                 text
//                 severity='secondary'
//                 aria-label='User'
//                 className='mr-2'
//                 onClick={handleClick}
//                 aria-controls={open ? 'account-menu' : undefined}
//                 aria-haspopup='true'
//                 aria-expanded={open ? 'true' : undefined}
//             />
//         </div>
//     );

//     const initialData = [
//         { id: 1, username: 'user1', password: 'password1', privileges: 'admin' },
//         { id: 2, username: 'user2', password: 'password2', privileges: 'user' },
//         { id: 3, username: 'user3', password: 'password3', privileges: 'user' },
//         { id: 4, username: 'user4', password: 'password4', privileges: 'admin' },
//         { id: 5, username: 'user5', password: 'password5', privileges: 'user' },
//         { id: 6, username: 'user6', password: 'password6', privileges: 'user' },
//         { id: 7, username: 'user7', password: 'password7', privileges: 'admin' },
//         { id: 8, username: 'user8', password: 'password8', privileges: 'user' },
//         { id: 9, username: 'user9', password: 'password9', privileges: 'user' },
//         { id: 10, username: 'user10', password: 'password10', privileges: 'admin' },
//         { id: 11, username: 'user11', password: 'password11', privileges: 'user' },
//         { id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{id: 12, username: 'user123', password: 'password12', privileges: 'user'},
//     ];

//     // Function to pad the data with empty rows
//     const padData = (data, rowsPerPage) => {
//         const paddedData = [...data];
//         const totalPages = Math.ceil(data.length / rowsPerPage);
//         const currentPage = Math.ceil(first / rowsPerPage) + 1;

//         if (currentPage === totalPages) {
//             while (paddedData.length < rowsPerPage * totalPages) {
//                 paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//             }
//         } else {
//             while (paddedData.length < rowsPerPage * currentPage) {
//                 paddedData.push({ id: '', username: '', password: '', privileges: '' });
//             }
//         }

//         return paddedData;
//     };

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const handleNew = () => {
//         // Implement the action for the "New" button here
//         console.log('New button clicked');
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };

//     return (
//         <div>
//             <Menubar start={start} end={end} />
//             <div>
//                 <CSidebar
//                     className='border-end custom-sidebar'
//                     visible={true}
//                     style={{ height: '100vh', position: 'sticky', top: '0' }}
//                 >
//                     <CSidebarNav>
//                         <CContainer fluid>
//                             <CForm className='d-flex'></CForm>
//                         </CContainer>
//                         <CNavItem>
//                             <NavLink to='/querytool/mac' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> MAC
//                             </NavLink>
//                         </CNavItem>
//                         <CNavItem>
//                             <NavLink to='/querytool/settings' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Settings
//                             </NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Create User
//                             </NavLink>
//                         </CNavItem>
//                     </CSidebarNav>
//                 </CSidebar>
//                 <div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         width: '100%',
//                         marginTop: '20px', // Adjust spacing as needed
//                         marginLeft: '150px', // Adjust sidebar width as needed
//                     }}
//                 >
//                     <div
//                         style={{
//                             width: '100%',
//                             maxWidth: '1200px', // Adjust as per your design
//                             position: 'relative',
//                             overflowX: 'auto',
//                             marginBottom: '50px', // Ensure space for the paginator
// 							marginTop: '-700px',

//                         }}
//                     >
//                         <DataTable
//                             value={padData(initialData, rows)}
//                             paginator
//                             rows={rows}
//                             rowsPerPageOptions={[10]}
//                             responsiveLayout='scroll'
//                             first={first}
//                             onPage={onPage}
//                             style={{
//                                 border: '1px solid #dee2e6',
//                                 borderCollapse: 'collapse',
//                             }}
//                             className='p-datatable-gridlines hoverable-rows'
//                         >
//                             <Column
//                                 field='id'
//                                 header='ID'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '100px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='username'
//                                 header='Username'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '200px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='password'
//                                 header='Password'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '300px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='privileges'
//                                 header='Privileges'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '150px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                         </DataTable>
//                     </div>
//                 </div>
//                 {/* <div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         position: 'fixed',
//                         bottom: '20px',
//                         width: '100%',
//                         marginLeft: '250px', // Adjust sidebar width as needed
//                     }}
//                 >
//                     <Button label='New' icon='pi pi-plus' onClick={handleNew} />
//                 </div> */}
//             </div>
//         </div>
//     );
// }


























// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import './Layout.css';

// export default function Layout({ icon_username }) {
// 	const navigate = useNavigate();

// 	const [isScrollDisabled, setIsScrollDisabled] = useState(true);
// 	const [first, setFirst] = useState(0);
// 	const [rows, setRows] = useState(10);
// 	// const [dropDown, setDropDown] = useState(null)

// 	const handleLogout = () => {
// 		navigate('/');
// 	};



// 	useEffect(() => {
// 		if (isScrollDisabled) {
// 			document.body.style.overflow = 'hidden';
// 		} else {
// 			document.body.style.overflow = 'auto';
// 		}

// 		return () => {
// 			document.body.style.overflow = 'auto';
// 		}
// 	}, [isScrollDisabled]);




// 	const [dropDown, setDropDown] = useState(null)
// 	const open = Boolean(dropDown);
// 	const handleClick = (event) => {
// 		setDropDown(event.currentTarget)
// 	};
// 	const handleClose = () => {
// 		setDropDown(null);
// 	};



// 	const start = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
// 	const end = (
// 		<div className='flex align-items-center gap-2'>
// 			<NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
// 				<span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
// 				Logout
// 			</NavLink>
// 			<Menu
// 				anchorEl={dropDown}
// 				id='account-menu'
// 				open={open}
// 				onClose={handleClose}
// 				onClick={handleClose}
// 				PaperProps={{
// 					elevation: 5,
// 					sx: {
// 						width: '120px',
// 						borderRadius: '10px',
// 						overflow: 'visible',
// 						mt: 1,
// 						'&::before': {
// 							content: '""',
// 							display: 'inline-block',
// 							position: 'absolute',
// 							top: 0,
// 							right: 10,
// 							width: 10,
// 							height: 10,
// 							bgcolor: 'background.paper',
// 							transform: 'translateY(-50%) rotate(45deg)',
// 							zIndex: 0,
// 						},
// 					},
// 				}}
// 				transformOrigin={{
// 					vertical: 'top',
// 					horizontal: 'center',
// 				}}
// 				anchorOrigin={{
// 					vertical: 'bottom',
// 					horizontal: 'center',
// 				}}
// 			>
// 				<MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
// 					<p style={{ marginBottom: '0px' }}>
// 						User: {icon_username}
// 					</p>
// 				</MenuItem>
// 			</Menu>

// 			<Button
// 				style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
// 				icon="pi pi-user"
// 				rounded
// 				text
// 				severity="secondary"
// 				aria-label="User"
// 				className="mr-2"
// 				onClick={handleClick}
// 				aria-controls={open ? 'account-menu' : undefined}
// 				aria-haspopup="true"
// 				aria-expanded={open ? 'true' : undefined}
// 			/>
// 		</div>
// 	);

// 	const initialData = [
//         { id: 1, username: 'user1', password: 'password1', privileges: 'admin' },
//         { id: 2, username: 'user2', password: 'password2', privileges: 'user' },
//         { id: 3, username: 'user3', password: 'password3', privileges: 'user' },
//         { id: 4, username: 'user4', password: 'password4', privileges: 'admin' },
//         { id: 5, username: 'user5', password: 'password5', privileges: 'user' },
//         { id: 6, username: 'user6', password: 'password6', privileges: 'user' },
//         { id: 7, username: 'user7', password: 'password7', privileges: 'admin' },
//         { id: 8, username: 'user8', password: 'password8', privileges: 'user' },
//         { id: 9, username: 'user9', password: 'password9', privileges: 'user' },
//         { id: 10, username: 'user10', password: 'password10', privileges: 'admin' },
//         { id: 11, username: 'user11', password: 'password11', privileges: 'user' },
//         { id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },
// 		{ id: 12, username: 'user12', password: 'password12', privileges: 'user' },

//     ];

//     // Function to pad the data with empty rows
//     const padData = (data, rowsPerPage) => {
//         const paddedData = [...data];
//         const totalPages = Math.ceil(data.length / rowsPerPage);
//         const currentPage = Math.ceil(first / rowsPerPage) + 1;

//         if (currentPage === totalPages) {
//             while (paddedData.length < rowsPerPage * totalPages) {
//                 paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//             }
//         } else {
//             while (paddedData.length < rowsPerPage * currentPage) {
//                 paddedData.push({ id: '', username: '', password: '', privileges: '' });
//             }
//         }

//         return paddedData;
//     };

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const handleNew = () => {
//         // Implement the action for the "New" button here
//         navigate('/querytool/usersubmit')
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };


// 	return (
// 		<div>
// 			<Menubar start={start} end={end} />
// 			<div>
// 				<CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
// 					<CSidebarNav>
// 						<CContainer fluid>
// 							<CForm className='d-flex'>
// 							</CForm>
// 						</CContainer>
// 						<CNavItem>
// 							<NavLink to='/querytool/mac' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' />MAC
// 							</NavLink>
// 						</CNavItem>
// 						<CNavItem>
// 							<NavLink to='/querytool/settings' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Settings
// 							</NavLink>
// 							<NavLink to='/querytool/createuser' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> Users
// 							</NavLink>
// 						</CNavItem>
// 					</CSidebarNav>
// 				</CSidebar>

// 				<div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         width: '100%',
//                         marginTop: '55px', // Adjust spacing as needed
//                         marginLeft: '130px', // Adjust sidebar width as needed
//                     }}
//                 >
//                     <div
//                         style={{
//                             width: '100%',
//                             maxWidth: '1350px', // Adjust as per your design
//                             position: 'relative',
//                             overflowX: 'auto',
//                             marginBottom: '50px', // Ensure space for the paginator
// 							marginTop: '-852px',

//                         }}
//                     >
//                         <DataTable
//                             value={padData(initialData, rows)}
//                             paginator
//                             rows={rows}
//                             rowsPerPageOptions={[10]}
//                             responsiveLayout='scroll'
//                             first={first}
//                             onPage={onPage}
//                             style={{
//                                 border: '1px solid #dee2e6',
//                                 borderCollapse: 'collapse',
//                             }}
//                             className='p-datatable-gridlines hoverable-rows'
//                         >
//                             <Column
//                                 field='id'
//                                 header='ID'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '100px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='username'
//                                 header='Username'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '200px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='password'
//                                 header='Password'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '300px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='privileges'
//                                 header='Privileges'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '150px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                         </DataTable>
//                     </div>
//                 </div>

// 				<div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         position: 'fixed',

//                         bottom: '735px',
//                         width: '163%',

//                         marginLeft: '250px', // Adjust sidebar width as needed
//                     }}
//                 >
//                     <Button label='New' icon='pi pi-plus' onClick={handleNew} />
//                 </div>

// 			</div>
// 		</div>
// 	);
// }











// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import axios from 'axios';
// import './Layout.css';

// export default function Layout({ icon_username }) {
//     const navigate = useNavigate();
//     const [isScrollDisabled, setIsScrollDisabled] = useState(true);
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const [users, setUsers] = useState([]);
//     const [dropDown, setDropDown] = useState(null);
//     const open = Boolean(dropDown);

//     useEffect(() => {
//         if (isScrollDisabled) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'auto';
//         }

//         return () => {
//             document.body.style.overflow = 'auto';
//         }
//     }, [isScrollDisabled]);

//     useEffect(() => {
//         // Fetch users from the server
//         axios.get('/user/all')
//             .then(response => {
//                 console.log('Fetched users:', response.data); // Log the response data
//                 setUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//             });
//     }, []);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleClick = (event) => {
//         setDropDown(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDropDown(null);
//     };

//     const start = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu
//                 anchorEl={dropDown}
//                 id='account-menu'
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                     elevation: 5,
//                     sx: {
//                         width: '120px',
//                         borderRadius: '10px',
//                         overflow: 'visible',
//                         mt: 1,
//                         '&::before': {
//                             content: '""',
//                             display: 'inline-block',
//                             position: 'absolute',
//                             top: 0,
//                             right: 10,
//                             width: 10,
//                             height: 10,
//                             bgcolor: 'background.paper',
//                             transform: 'translateY(-50%) rotate(45deg)',
//                             zIndex: 0,
//                         },
//                     },
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//             >
//                 <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
//                     <p style={{ marginBottom: '0px' }}>
//                         User: {icon_username}
//                     </p>
//                 </MenuItem>
//             </Menu>

//             <Button
//                 style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
//                 icon="pi pi-user"
//                 rounded
//                 text
//                 severity="secondary"
//                 aria-label="User"
//                 className="mr-2"
//                 onClick={handleClick}
//                 aria-controls={open ? 'account-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//             />
//         </div>
//     );



//     const handleNew = () => {
//         navigate('/querytool/usersubmit');
//     };

//     const padData = (data, rowsPerPage) => {
//         const paddedData = [...data];
//         console.log('data:', paddedData);
//         const totalPages = Math.ceil(data.length / rowsPerPage);
//         const currentPage = Math.ceil(first / rowsPerPage) + 1;
//         // const totalRows = Math.max(rowsPerPage, paddedData.length);

//         if(currentPage === totalPages){
//         while (paddedData.length < rowsPerPage * totalPages) {
//             paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//         }
//     }

//         return paddedData;
//     }

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };

//     const secondMenubarEnd = (
//         <div style={{ color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
//             Users
//         </div>
//     );
//     return (
//         <div>
//             <Menubar start={start} end={end} />
//             <div>
//                 <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                     <CSidebarNav>
//                         <CContainer fluid>
//                             <CForm className='d-flex'>
//                             </CForm>
//                         </CContainer>
//                         <CNavItem>
//                             <NavLink to='/querytool/mac' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' />MAC
//                             </NavLink>
//                         </CNavItem>
//                         <CNavItem>
//                             <NavLink to='/querytool/settings' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Settings
//                             </NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Users
//                             </NavLink>
//                         </CNavItem>
//                     </CSidebarNav>
//                 </CSidebar>
//                 <Menubar start={secondMenubarEnd} style={{ backgroundColor: '#183462', maxWidth: '1500px', marginLeft: '250px', marginTop: '-839px' }} />

//                 <div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         width: '100%',
//                         marginTop: '70px',
//                         marginLeft: '131px',
//                     }}
//                 >
//                     <div
//                         style={{
//                             width: '100%',
//                             maxWidth: '1350px',
//                             position: 'relative',
//                             overflowX: 'auto',
//                             marginBottom: '50px',
//                             marginTop: '-78px',
//                         }}
//                     >
//                         <DataTable
//                             value={padData(users, rows)}
//                             paginator
//                             rows={rows}
//                             rowsPerPageOptions={[10]}
//                             responsiveLayout='scroll'
//                             first={first}
//                             onPage={onPage}
//                             style={{
//                                 border: '1px solid #dee2e6',
//                                 borderCollapse: 'collapse',
//                             }}
//                             className='p-datatable-gridlines hoverable-rows'
//                         >
//                             <Column
//                                 field='id'
//                                 header='ID'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '100px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='name'
//                                 header='Username'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '100px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='password'
//                                 header='Password'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '300px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='privileges'
//                                 header='Privileges'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '150px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                         </DataTable>
//                     </div>
//                 </div>

//                 <div
//                     style= {{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         position: 'fixed',
//                         bottom: '730px',
//                         width: '163%',
//                         marginLeft: '250px',
//                     }}
//                 >
//                     <Button label='New' icon='pi pi-plus' onClick={handleNew} style = {{backgroundColor: '#183462'}} />
//                 </div>
//             </div>
//         </div>
//     );
// }

















// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import axios from 'axios';
// import './Layout.css';

// export default function Layout({ icon_username }) {
//     const navigate = useNavigate();
//     const [isScrollDisabled, setIsScrollDisabled] = useState(true);
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchField, setSearchField] = useState('id');
//     const [dropDown, setDropDown] = useState(null);
//     const open = Boolean(dropDown);

//     useEffect(() => {
//         if (isScrollDisabled) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'auto';
//         }

//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, [isScrollDisabled]);

//     useEffect(() => {
//         // Fetch users from the server
//         axios.get('/user/all')
//             .then(response => {
//                 console.log('Fetched users:', response.data); // Log the response data
//                 setUsers(response.data);
//                 setFilteredUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//             });
//     }, []);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleClick = (event) => {
//         setDropDown(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDropDown(null);
//     };

//     const start = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu
//                 anchorEl={dropDown}
//                 id='account-menu'
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                     elevation: 5,
//                     sx: {
//                         width: '120px',
//                         borderRadius: '10px',
//                         overflow: 'visible',
//                         mt: 1,
//                         '&::before': {
//                             content: '""',
//                             display: 'inline-block',
//                             position: 'absolute',
//                             top: 0,
//                             right: 10,
//                             width: 10,
//                             height: 10,
//                             bgcolor: 'background.paper',
//                             transform: 'translateY(-50%) rotate(45deg)',
//                             zIndex: 0,
//                         },
//                     },
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//             >
//                 <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
//                     <p style={{ marginBottom: '0px' }}>
//                         User: {icon_username}
//                     </p>
//                 </MenuItem>
//             </Menu>

//             <Button
//                 style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
//                 icon="pi pi-user"
//                 rounded
//                 text
//                 severity="secondary"
//                 aria-label="User"
//                 className="mr-2"
//                 onClick={handleClick}
//                 aria-controls={open ? 'account-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//             />
//         </div>
//     );

//     const handleNew = () => {
//         navigate('/querytool/usersubmit');
//     };

//     const padData = (data, rowsPerPage) => {
//         const paddedData = [...data];
//         console.log('data:', paddedData);
//         const totalPages = Math.ceil(data.length / rowsPerPage);
//         const currentPage = Math.ceil(first / rowsPerPage) + 1;

//         if (currentPage === totalPages) {
//             while (paddedData.length < rowsPerPage * totalPages) {
//                 paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//             }
//         }

//         return paddedData;
//     };

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };

//     const secondMenubarEnd = (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div style={{ color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
//                 Users
//             </div>

//         </div>
//     );

//     useEffect(() => {
//         const filtered = users.filter(user =>
//             user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//     }, [searchTerm, searchField, users]);

//     return (
//         <div>
//             <Menubar start={start} end={end} />
//             <div>

//                 <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                     <CSidebarNav>
//                         <CContainer fluid>
//                             <CForm className='d-flex'>
//                             </CForm>
//                         </CContainer>
//                         <CNavItem>
//                             <NavLink to='/querytool/mac' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' />MAC
//                             </NavLink>
//                         </CNavItem>
//                         <CNavItem>
//                             <NavLink to='/querytool/settings' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Settings
//                             </NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Users
//                             </NavLink>
//                         </CNavItem>
//                     </CSidebarNav>
//                 </CSidebar>

//                 <Menubar start={secondMenubarEnd} style={{ backgroundColor: '#183462', maxWidth: '1500px', marginLeft: '250px', marginTop: '-839px' }} />

//                 <div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         width: '100%',
//                         marginTop: '70px',
//                         marginLeft: '131px',
//                     }}
//                 >
//                     <div
//                         style={{
//                             width: '100%',
//                             maxWidth: '1350px',
//                             position: 'relative',
//                             overflowX: 'auto',
//                             marginBottom: '50px',
//                             marginTop: '-78px',
//                         }}
//                     >
//                         <DataTable
//                             value={padData(filteredUsers, rows)}
//                             paginator
//                             rows={rows}
//                             rowsPerPageOptions={[10]}
//                             responsiveLayout='scroll'
//                             first={first}
//                             onPage={onPage}
//                             style={{
//                                 border: '1px solid #dee2e6',

//                                 borderCollapse: 'collapse',
//                             }}
//                             className='p-datatable-gridlines hoverable-rows'
//                         >
//                             <Column
//                                 field='id'
//                                 header='ID'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '100px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='name'
//                                 header='Username'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '100px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='password'
//                                 header='Password'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '300px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='privileges'
//                                 header='Privileges'
//                                 style={{
//                                     borderRight: '1px solid #dee2e6',
//                                     width: '150px',
//                                 }}
//                                 body={bodyTemplate}
//                             ></Column>
//                         </DataTable>
//                     </div>
//                 </div>


//                 <div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         position: 'fixed',
//                         bottom: '728px',
//                         width: '163%',
//                         marginLeft: '-200px',
//                     }}
//                 >
//                     <div style = {{marginRight: '-1200px'}}>
//                     <Button label='New' icon='pi pi-plus' onClick={handleNew} style={{ backgroundColor: '#183462' }} />
//                 </div>

//                 <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 style={{ padding: '5px' }}
//             />
//             <select
//                 value={searchField}
//                 onChange={(e) => setSearchField(e.target.value)}
//                 style={{ padding: '5px'}}
//             >
//                 <option value="id">ID</option>
//                 <option value="name">Username</option>
//                 <option value="password">Password</option>
//                 <option value="privileges">Privileges</option>
//             </select>
//             </div>
//                 {/* </div> */}
//             </div>

//         </div>
//     );
// }

















// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import axios from 'axios';
// import './Layout.css';

// export default function Layout({ icon_username }) {
//     const navigate = useNavigate();
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchField, setSearchField] = useState('id');
//     const [dropDown, setDropDown] = useState(null);
//     const open = Boolean(dropDown);

//     useEffect(() => {
//         // Fetch users from the server
//         axios.get('/user/all')
//             .then(response => {
//                 console.log('Fetched users:', response.data); // Log the response data
//                 setUsers(response.data);
//                 setFilteredUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//             });
//     }, []);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleClick = (event) => {
//         setDropDown(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDropDown(null);
//     };

//     const start = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu
//                 anchorEl={dropDown}
//                 id='account-menu'
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                     elevation: 5,
//                     sx: {
//                         width: '120px',
//                         borderRadius: '10px',
//                         overflow: 'visible',
//                         mt: 1,
//                         '&::before': {
//                             content: '""',
//                             display: 'inline-block',
//                             position: 'absolute',
//                             top: 0,
//                             right: 10,
//                             width: 10,
//                             height: 10,
//                             bgcolor: 'background.paper',
//                             transform: 'translateY(-50%) rotate(45deg)',
//                             zIndex: 0,
//                         },
//                     },
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//             >
//                 <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
//                     <p style={{ marginBottom: '0px' }}>
//                         User: {icon_username}
//                     </p>
//                 </MenuItem>
//             </Menu>

//             <Button
//                 style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
//                 icon="pi pi-user"
//                 rounded
//                 text
//                 severity="secondary"
//                 aria-label="User"
//                 className="mr-2"
//                 onClick={handleClick}
//                 aria-controls={open ? 'account-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//             />
//         </div>
//     );

//     const starting = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
//     const ending = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu
//                 anchorEl={dropDown}
//                 id='account-menu'
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                     elevation: 5,
//                     sx: {
//                         width: '120px',
//                         borderRadius: '10px',
//                         overflow: 'visible',
//                         mt: 1,
//                         '&::before': {
//                             content: '""',
//                             display: 'inline-block',
//                             position: 'absolute',
//                             top: 0,
//                             right: 10,
//                             width: 10,
//                             height: 10,
//                             bgcolor: 'background.paper',
//                             transform: 'translateY(-50%) rotate(45deg)',
//                             zIndex: 0,
//                         },
//                     },
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//             >
//                 <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
//                     <p style={{ marginBottom: '0px' }}>
//                         User: {icon_username}
//                     </p>
//                 </MenuItem>
//             </Menu>

//             <Button
//                 style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
//                 icon="pi pi-user"
//                 rounded
//                 text
//                 severity="secondary"
//                 aria-label="User"
//                 className="mr-2"
//                 onClick={handleClick}
//                 aria-controls={open ? 'account-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//             />
//         </div>
//     );

//     const handleNew = () => {
//         navigate('/querytool/usersubmit');
//     };

//     const padData = (data, rowsPerPage) => {
//         const paddedData = [...data];
//         console.log('data:', paddedData);
//         const totalPages = Math.ceil(data.length / rowsPerPage);
//         const currentPage = Math.ceil(first / rowsPerPage) + 1;

//         if (currentPage === totalPages) {
//             while (paddedData.length < rowsPerPage * totalPages) {
//                 paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//             }
//         }

//         return paddedData;
//     };

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };

//     const secondMenubarEnd = (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div style={{ color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
//                 Users
//             </div>
//             <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             />
//             <select
//                 value={searchField}
//                 onChange={(e) => setSearchField(e.target.value)}
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             >
//                 <option value="id">ID</option>
//                 <option value="name">Username</option>
//                 <option value="password">Password</option>
//                 <option value="privileges">Privileges</option>
//             </select>

//             <Button label='New' icon='pi pi-plus' onClick={handleNew} style={{ backgroundColor: '#183462', marginLeft: '768px'}} />
//         </div>
//     );

//     useEffect(() => {
//         const filtered = users.filter(user =>
//             user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//     }, [searchTerm, searchField, users]);

//     return (
//         <div style = {{position: 'sticky', overflow: 'auto'  }}>            
//             <Menubar start={starting} end={ending} style={{ position: 'sticky', top: '0', zIndex: 1000 }} />

//             <div style={{ display: 'flex'}}>
//                 <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                     <CSidebarNav>
//                         <CContainer fluid>
//                             <CForm className='d-flex'>
//                             </CForm>
//                         </CContainer>
//                         <CNavItem>
//                             <NavLink to='/querytool/mac' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' />MAC
//                             </NavLink>
//                         </CNavItem>
//                         <CNavItem>
//                             <NavLink to='/querytool/settings' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Settings
//                             </NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Users
//                             </NavLink>
//                         </CNavItem>
//                     </CSidebarNav>
//                 </CSidebar>

//                 <div style={{ flex: 1, paddingLeft: '0px', marginTop: '-12px' }}>
//                     <Menubar start={secondMenubarEnd} style={{ backgroundColor: '#183462', width: '100%', position: 'sticky', top: '0', zIndex: 1000, marginTop: '10px' }} />
//                     <div style={{ marginTop: '70px' }}>
//                         <DataTable
//                             value={padData(filteredUsers, rows)}
//                             overflow = 'auto'
//                             paginator
//                             rows={rows}
//                             rowsPerPageOptions={[10]}
//                             responsiveLayout='scroll'
//                             first={first}
//                             onPage={onPage}
//                             style={{ border: '1px solid #dee2e6', borderCollapse: 'collapse', marginTop: '-70px'}}
//                             className='p-datatable-gridlines hoverable-rows'
//                         >
//                             <Column
//                                 field='id'
//                                 header='ID'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='name'
//                                 header='Username'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='password'
//                                 header='Password'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '300px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='privileges'
//                                 header='Privileges'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '150px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                         </DataTable>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', bottom: '940px', width: '100%' }}>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }










// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import axios from 'axios';
// import './Layout.css';

// export default function Layout({ icon_username }) {
//     const navigate = useNavigate();
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchField, setSearchField] = useState('id');
//     const [dropDown, setDropDown] = useState(null);
//     const open = Boolean(dropDown);



//     useEffect(() => {
//         // Fetch users from the server
//         axios.get('/user/all')
//             .then(response => {
//                 console.log('Fetched users:', response.data); // Log the response data
//                 setUsers(response.data);
//                 setFilteredUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//             });
//     }, []);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleClick = (event) => {
//         setDropDown(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDropDown(null);
//     };

//     const start = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu
//                 anchorEl={dropDown}
//                 id='account-menu'
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                     elevation: 5,
//                     sx: {
//                         width: '120px',
//                         borderRadius: '10px',
//                         overflow: 'visible',
//                         mt: 1,
//                         '&::before': {
//                             content: '""',
//                             display: 'inline-block',
//                             position: 'absolute',
//                             top: 0,
//                             right: 10,
//                             width: 10,
//                             height: 10,
//                             bgcolor: 'background.paper',
//                             transform: 'translateY(-50%) rotate(45deg)',
//                             zIndex: 0,
//                         },
//                     },
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//             >
//                 <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
//                     <p style={{ marginBottom: '0px' }}>
//                         User: {icon_username}
//                     </p>
//                 </MenuItem>
//             </Menu>

//             <Button
//                 style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
//                 icon="pi pi-user"
//                 rounded
//                 text
//                 severity="secondary"
//                 aria-label="User"
//                 className="mr-2"
//                 onClick={handleClick}
//                 aria-controls={open ? 'account-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//             />
//         </div>
//     );


//     const starting = <img alt='logo' style={{ cursor: 'pointer' }} src={SepioLogo} height='40' className='mr-2' />;
//     const ending = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px', textDecoration: 'none' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu
//                 anchorEl={dropDown}
//                 id='account-menu'
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                     elevation: 5,
//                     sx: {
//                         width: '120px',
//                         borderRadius: '10px',
//                         overflow: 'visible',
//                         mt: 1,
//                         '&::before': {
//                             content: '""',
//                             display: 'inline-block',
//                             position: 'absolute',
//                             top: 0,
//                             right: 10,
//                             width: 10,
//                             height: 10,
//                             bgcolor: 'background.paper',
//                             transform: 'translateY(-50%) rotate(45deg)',
//                             zIndex: 0,
//                         },
//                     },
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//             >
//                 <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
//                     <p style={{ marginBottom: '0px' }}>
//                         User: {icon_username}
//                     </p>
//                 </MenuItem>
//             </Menu>

//             <Button
//                 style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
//                 icon="pi pi-user"
//                 rounded
//                 text
//                 severity="secondary"
//                 aria-label="User"
//                 className="mr-2"
//                 onClick={handleClick}
//                 aria-controls={open ? 'account-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//             />
//         </div>
//     );


//     const handleNew = () => {
//         navigate('/querytool/usersubmit');
//     };

//     const padData = (data, rowsPerPage) => {
//         const paddedData = [...data];
//         console.log('data:', paddedData);
//         const totalPages = Math.ceil(data.length / rowsPerPage);
//         const currentPage = Math.ceil(first / rowsPerPage) + 1;

//         if (currentPage === totalPages) {
//             while (paddedData.length < rowsPerPage * totalPages) {
//                 paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//             }
//         }

//         return paddedData;
//     };

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };

//     const secondMenubarEnd = (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div style={{ color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
//                 Users
//             </div>
//             <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             />
//             <select
//                 value={searchField}
//                 onChange={(e) => setSearchField(e.target.value)}
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             >
//                 <option value="id">ID</option>
//                 <option value="name">Username</option>
//                 <option value="password">Password</option>
//                 <option value="privileges">Privileges</option>
//             </select>


//         </div>
//     );







//     const starts = (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div>
//                 Users
//             </div>
//             <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             />
//             <select
//                 value={searchField}
//                 onChange={(e) => setSearchField(e.target.value)}
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             >
//                 <option value="id">ID</option>
//                 <option value="name">Username</option>
//                 <option value="password">Password</option>
//                 <option value="privileges">Privileges</option>
//             </select>


//         </div>
//     )



//     const ends = (
//         <div className='flex align-items-center gap-2'>
//             <Button label='New' icon='pi pi-plus' onClick={handleNew} style={{ backgroundColor: '#183462'}} />
//         </div>
//     );


//     useEffect(() => {
//         const filtered = users.filter(user =>
//             user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//     }, [searchTerm, searchField, users]);

//     return (
//         <div style = {{overflow: 'auto' }}>            
//             <Menubar start = {starting} end = {ending}/>

//         <div style={{ display: 'flex'}}>
//             <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'>
//                             <RiDashboardLine className='nav-icon' />MAC
//                         </NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/settings' className='nav-link'>
//                             <RiDashboardLine className='nav-icon' /> Settings
//                         </NavLink>
//                         <NavLink to='/querytool/createuser' className='nav-link'>
//                             <RiDashboardLine className='nav-icon' /> Users
//                         </NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ flex: 1, paddingLeft: '0px', marginTop: '-12px'}}>
//                 <Menubar start={starts} end = {ends} style={{ backgroundColor: '#183462', width: '100%', position: '', top: '0', zIndex: 1000, marginTop: '10px' }} />


//             </div>
//         </div>
//         </div>
//     );
// }






// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { Menu, MenuItem } from '@mui/material';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import axios from 'axios';
// import { Paginator } from 'primereact/paginator';
// import './Layout.css';

// export default function Layout({ icon_username }) {
//     const navigate = useNavigate();
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchField, setSearchField] = useState('id');
//     const [dropDown, setDropDown] = useState(null);
//     const open = Boolean(dropDown);

//     useEffect(() => {
//         const handleKeydown = (event) => {
//             if ((event.ctrlKey || event.metaKey) && (event.key === '=' || event.key === '-' || event.key === '0')) {
//                 event.preventDefault();
//             }
//         };

//         window.addEventListener('keydown', handleKeydown);

//         return () => {
//             window.removeEventListener('keydown', handleKeydown);
//         };
//     }, []);

//     useEffect(() => {
//         // Fetch users from the server
//         axios.get('/user/all')
//             .then(response => {
//                 console.log('Fetched users:', response.data); // Log the response data
//                 setUsers(response.data);
//                 setFilteredUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//             });
//     }, []);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleClick = (event) => {
//         setDropDown(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDropDown(null);
//     };

//     const handleNew = () => {
//         navigate('/querytool/usersubmit');
//     };

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };

//     const secondMenubarEnd = (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div style={{ color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
//                 Users
//             </div>
//             <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             />
//             <select
//                 value={searchField}
//                 onChange={(e) => setSearchField(e.target.value)}
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             >
//                 <option value="id">ID</option>
//                 <option value="name">Username</option>
//                 <option value="password">Password</option>
//                 <option value="privileges">Privileges</option>
//             </select>
//         </div>
//     );

//     const second = (
//         <div>
//             <Button label='New' icon='pi pi-plus' onClick={handleNew} style={{ backgroundColor: '#183462'}} />
//         </div>
//     );

//     useEffect(() => {
//         const filtered = users.filter(user =>
//             user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//     }, [searchTerm, searchField, users]);

//     // Pad data to ensure consistent rows per page
// // Pad data to ensure consistent rows per page, including padding
// const padData = (data, rowsPerPage) => {
//     const currentPage = Math.ceil(first / rowsPerPage) + 1;
//     const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

//     // Calculate how many padding rows are needed to fill the page
//     let paddingRowsNeeded = rowsPerPage - data.length;
//     if (currentPage === totalPages) {
//         paddingRowsNeeded = Math.max(0, paddingRowsNeeded); // Ensure no padding rows on last page
//     }

//     const paddedData = [...data];

//     // Add padding rows if needed
//     for (let i = 0; i < paddingRowsNeeded; i++) {
//         paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//     }

//     return paddedData;
// };


//     // Calculate the records to display based on pagination
//     const paginatedUsers = padData(filteredUsers.slice(first, first + rows), rows);

//     return (
//         <div>
//             {/* implement here new menubar */}

//             <div style={{ display: 'flex', overflow: 'auto' }}>
//                 <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                     <CSidebarNav>
//                         <CContainer fluid>
//                             <CForm className='d-flex'>
//                             </CForm>
//                         </CContainer>
//                         <CNavItem>
//                             <NavLink to='/querytool/mac' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' />MAC
//                             </NavLink>
//                         </CNavItem>
//                         <CNavItem>
//                             <NavLink to='/querytool/settings' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Settings
//                             </NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Users
//                             </NavLink>
//                         </CNavItem>
//                     </CSidebarNav>
//                 </CSidebar>

//                 <div style={{ flex: 1, paddingLeft: '0px', marginTop: '-12px'}}>
//                     <Menubar start={secondMenubarEnd} end={second} style={{ backgroundColor: '#183462', width: '100%', position: '', top: '0', zIndex: 1000, marginTop: '10px' }} />
//                     <div style={{ marginTop: '-20px'}}>
//                         <DataTable
//                             value={paginatedUsers}
//                             responsiveLayout='scroll'
//                             style={{ border: '1px solid #dee2e6', borderRadius: '10px', marginTop: '20px' }}
//                             className='p-datatable-gridlines hoverable-rows'
//                         >
//                             <Column
//                                 field='id'
//                                 header='ID'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='name'
//                                 header='Username'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='password'
//                                 header='Password'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '300px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='privileges'
//                                 header='Privileges'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '150px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                         </DataTable>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                         <Paginator first={first} rows={rows} totalRecords={filteredUsers.length} onPageChange={onPage} rowsPerPageOptions={[10]} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }






// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import SepioLogo from './../image/Sepio_Logo.png';

// const MenuBar = () => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
//             <Toolbar>
//                 <IconButton edge="start" color="inherit" aria-label="logo">
//                     <img alt='logo' style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} />
//                 </IconButton>

//                 <div style={{ flexGrow: 1 }} />

//                 <NavLink to='/' style={{ textDecoration: 'none' }}>
//                     <Button color="inherit">
//                         <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                         Logout
//                     </Button>
//                 </NavLink>

//                 <IconButton
//                     color="inherit"
//                     aria-label="user account"
//                     aria-controls="menu-appbar"
//                     aria-haspopup="true"
//                     onClick={handleClick}
//                 >
//                     <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
//                 </IconButton>

//                 <Menu
//                     id="menu-appbar"
//                     anchorEl={anchorEl}
//                     anchorOrigin={{
//                         vertical: 'top',
//                         horizontal: 'right',
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                         vertical: 'top',
//                         horizontal: 'right',
//                     }}
//                     open={open}
//                     onClose={handleClose}
//                 >
//                     <MenuItem onClick={handleClose}>Profile</MenuItem>
//                     <MenuItem onClick={handleClose}>My account</MenuItem>
//                     <MenuItem onClick={handleClose}>Logout</MenuItem>
//                 </Menu>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default MenuBar;















// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import Toolbar from '@mui/material/Toolbar';
// import AppBar from '@mui/material/AppBar';
// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// // import { Button } from 'primereact/button';

// import { NavLink, useNavigate } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import axios from 'axios';
// import { Paginator } from 'primereact/paginator';
// import './Layout.css';

// export default function Layout({ icon_username }) {
//     const navigate = useNavigate();
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchField, setSearchField] = useState('id');
//     const [dropDown, setDropDown] = useState(null);
//     const open = Boolean(dropDown);

//     useEffect(() => {
//         const handleKeydown = (event) => {
//             if ((event.ctrlKey || event.metaKey) && (event.key === '=' || event.key === '-' || event.key === '0')) {
//                 event.preventDefault();
//             }
//         };

//         window.addEventListener('keydown', handleKeydown);

//         return () => {
//             window.removeEventListener('keydown', handleKeydown);
//         };
//     }, []);

//     useEffect(() => {
//         // Fetch users from the server
//         axios.get('/user/all')
//             .then(response => {
//                 console.log('Fetched users:', response.data); // Log the response data
//                 setUsers(response.data);
//                 setFilteredUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//             });
//     }, []);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleClick = (event) => {
//         setDropDown(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDropDown(null);
//     };

//     const handleNew = () => {
//         navigate('/querytool/usersubmit');
//     };

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };

//     const secondMenubarEnd = (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div style={{ color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
//                 Users
//             </div>
//             <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             />
//             <select
//                 value={searchField}
//                 onChange={(e) => setSearchField(e.target.value)}
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             >
//                 <option value="id">ID</option>
//                 <option value="name">Username</option>
//                 <option value="password">Password</option>
//                 <option value="privileges">Privileges</option>
//             </select>
//         </div>
//     );

//     const second = (
//         <div>
//             <Button label='New' icon='pi pi-plus' onClick={handleNew} style={{ backgroundColor: '#183462'}} />
//         </div>
//     );

//     useEffect(() => {
//         const filtered = users.filter(user =>
//             user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//     }, [searchTerm, searchField, users]);

//     // Pad data to ensure consistent rows per page, including padding
//     const padData = (data, rowsPerPage) => {
//         const currentPage = Math.ceil(first / rowsPerPage) + 1;
//         const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

//         // Calculate how many padding rows are needed to fill the page
//         let paddingRowsNeeded = rowsPerPage - data.length;
//         if (currentPage === totalPages) {
//             paddingRowsNeeded = Math.max(0, paddingRowsNeeded); // Ensure no padding rows on last page
//         }

//         const paddedData = [...data];

//         // Add padding rows if needed
//         for (let i = 0; i < paddingRowsNeeded; i++) {
//             paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//         }

//         return paddedData;
//     };

//     // Calculate the records to display based on pagination
//     const paginatedUsers = padData(filteredUsers.slice(first, first + rows), rows);

//     return (
//         <div>
//             {/* Implement here new menubar */}
//             <AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '20px' }}>
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="logo">
//                         <img alt='logo' style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} />
//                     </IconButton>

//                     <div style={{ flexGrow: 1 }} />

//                     <NavLink to='/' style={{ textDecoration: 'none' }}>
//                         <Button color="inherit">
//                             <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                             Logout
//                         </Button>
//                     </NavLink>

//                     <IconButton
//                         color="inherit"
//                         aria-label="user account"
//                         aria-controls="menu-appbar"
//                         aria-haspopup="true"
//                         onClick={handleClick}
//                     >
//                         <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
//                     </IconButton>

//                     <Menu
//                         id="menu-appbar"
//                         anchorEl={dropDown}
//                         anchorOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         keepMounted
//                         transformOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         open={open}
//                         onClose={handleClose}
//                     >
//                         <MenuItem onClick={handleClose}>Profile</MenuItem>
//                         <MenuItem onClick={handleClose}>My account</MenuItem>
//                         <MenuItem onClick={handleClose}>Logout</MenuItem>
//                     </Menu>
//                 </Toolbar>
//             </AppBar>

//             <div style={{ display: 'flex', overflow: 'auto' }}>
//                 <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                     <CSidebarNav>
//                         <CContainer fluid>
//                             <CForm className='d-flex'>
//                             </CForm>
//                         </CContainer>
//                         <CNavItem>
//                             <NavLink to='/querytool/mac' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' />MAC
//                             </NavLink>
//                         </CNavItem>
//                         <CNavItem>
//                             <NavLink to='/querytool/settings' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Settings
//                             </NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Users
//                             </NavLink>
//                         </CNavItem>
//                     </CSidebarNav>
//                 </CSidebar>

//                 <div style={{ flex: 1, paddingLeft: '0px', marginTop: '-12px'}}>
//                     <Menubar start={secondMenubarEnd} end={second} style={{ backgroundColor: '#183462', width: '100%', position: '', top: '0', zIndex: 1000, marginTop: '10px' }} />
//                     <div style={{ marginTop: '-20px'}}>
//                         <DataTable
//                             value={paginatedUsers}
//                             responsiveLayout='scroll'
//                             style={{ border: '1px solid #dee2e6', borderRadius: '10px', marginTop: '20px' }}
//                             className='p-datatable-gridlines hoverable-rows'
//                         >
//                             <Column
//                                 field='id'
//                                 header='ID'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='name'
//                                 header='Username'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='password'
//                                 header='Password'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '300px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='privileges'
//                                 header='Privileges'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '150px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                         </DataTable>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                         <Paginator first={first} rows={rows} totalRecords={filteredUsers.length} onPageChange={onPage} rowsPerPageOptions={[10]} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }







// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import Toolbar from '@mui/material/Toolbar';
// import AppBar from '@mui/material/AppBar';
// import { Menubar } from 'primereact/menubar';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import axios from 'axios';
// import { Paginator } from 'primereact/paginator';
// import './Layout.css';

// export default function Layout({ icon_username }) {
//     const navigate = useNavigate();
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchField, setSearchField] = useState('id');
//     const [dropDown, setDropDown] = useState(null);
//     const [sidebarVisible, setSidebarVisible] = useState(true); // State for sidebar visibility

//     useEffect(() => {
//         // Fetch users from the server
//         axios.get('/user/all')
//             .then(response => {
//                 console.log('Fetched users:', response.data); // Log the response data
//                 setUsers(response.data);
//                 setFilteredUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//             });
//     }, []);

//     useEffect(() => {
//         const handleKeydown = (event) => {
//             if ((event.ctrlKey || event.metaKey) && (event.key === '=' || event.key === '-' || event.key === '0')) {
//                 event.preventDefault();
//             }
//         };

//         window.addEventListener('keydown', handleKeydown);

//         return () => {
//             window.removeEventListener('keydown', handleKeydown);
//         };
//     }, []);

//     useEffect(() => {
//         const filtered = users.filter(user =>
//             user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//     }, [searchTerm, searchField, users]);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleClick = (event) => {
//         setDropDown(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDropDown(null);
//     };

//     const handleNew = () => {
//         navigate('/querytool/usersubmit');
//     };

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };

//     const toggleSidebar = () => {
//         setSidebarVisible(!sidebarVisible);
//     };

//     const secondMenubarEnd = (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div style={{ color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
//                 Users
//             </div>
//             <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             />
//             <select
//                 value={searchField}
//                 onChange={(e) => setSearchField(e.target.value)}
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             >
//                 <option value="id">ID</option>
//                 <option value="name">Username</option>
//                 <option value="password">Password</option>
//                 <option value="privileges">Privileges</option>
//             </select>
//         </div>
//     );

//     const second = (
//         <div>
//             <Button label='New' icon='pi pi-plus' onClick={handleNew} style={{ backgroundColor: '#183462'}} />
//         </div>
//     );

//     // Pad data to ensure consistent rows per page, including padding
//     const padData = (data, rowsPerPage) => {
//         const currentPage = Math.ceil(first / rowsPerPage) + 1;
//         const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

//         // Calculate how many padding rows are needed to fill the page
//         let paddingRowsNeeded = rowsPerPage - data.length;
//         if (currentPage === totalPages) {
//             paddingRowsNeeded = Math.max(0, paddingRowsNeeded); // Ensure no padding rows on last page
//         }

//         const paddedData = [...data];

//         // Add padding rows if needed
//         for (let i = 0; i < paddingRowsNeeded; i++) {
//             paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//         }

//         return paddedData;
//     };

//     // Calculate the records to display based on pagination
//     const paginatedUsers = padData(filteredUsers.slice(first, first + rows), rows);

//     return (
//         <div>
//             <AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '20px' }}>
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="logo">
//                         <img alt='logo' style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} />
//                     </IconButton>

//                     <div style={{ flexGrow: 1 }} />

//                     <NavLink to='/' style={{ textDecoration: 'none' }}>
//                         <Button color="inherit">
//                             <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                             Logout
//                         </Button>
//                     </NavLink>

//                     <IconButton
//                         color="inherit"
//                         aria-label="user account"
//                         aria-controls="menu-appbar"
//                         aria-haspopup="true"
//                         onClick={handleClick}
//                     >
//                         <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
//                     </IconButton>

//                     <Menu
//                         id="menu-appbar"
//                         anchorEl={dropDown}
//                         anchorOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         keepMounted
//                         transformOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         open={Boolean(dropDown)}
//                         onClose={handleClose}
//                     >
//                         <MenuItem onClick={handleClose}>Profile</MenuItem>
//                         <MenuItem onClick={handleClose}>My account</MenuItem>
//                         <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                     </Menu>
//                 </Toolbar>
//             </AppBar>

//             <div style={{ display: 'flex', overflow: 'auto' }}>
//                 <CSidebar className='border-end custom-sidebar' visible={sidebarVisible} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                     <CSidebarNav>
//                         <CContainer fluid>
//                             <CForm className='d-flex'>
//                             </CForm>
//                         </CContainer>
//                         <CNavItem>
//                             <NavLink to='/querytool/mac' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' />MAC
//                             </NavLink>
//                         </CNavItem>
//                         <CNavItem>
//                             <NavLink to='/querytool/settings' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Settings
//                             </NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Users
//                             </NavLink>
//                         </CNavItem>
//                     </CSidebarNav>
//                 </CSidebar>

//                 <div style={{ flex: 1, paddingLeft: '0px', marginTop: '-12px' }}>

// <Menubar start={secondMenubarEnd} end={second} style={{ backgroundColor: '#183462', width: '100%', position: '', top: '0', zIndex: 1000, marginTop: '10px' }} />
// <div style={{ marginTop: '-20px' }}>
//     <DataTable
//         value={paginatedUsers}
//         responsiveLayout='scroll'
//         style={{ border: '1px solid #dee2e6', borderRadius: '10px', marginTop: '20px' }}
//         className='p-datatable-gridlines hoverable-rows'
//     >
//         <Column
//             field='id'
//             header='ID'
//             style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//             body={bodyTemplate}
//         ></Column>
//         <Column
//             field='name'
//             header='Username'
//             style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//             body={bodyTemplate}
//         ></Column>
//         <Column
//             field='password'
//             header='Password'
//             style={{ borderRight: '1px solid #dee2e6', width: '300px' }}
//             body={bodyTemplate}
//         ></Column>
//         <Column
//             field='privileges'
//             header='Privileges'
//             style={{ borderRight: '1px solid #dee2e6', width: '150px' }}
//             body={bodyTemplate}
//         ></Column>
//     </DataTable>
// </div>
// <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//     <Paginator first={first} rows={rows} totalRecords={filteredUsers.length} onPageChange={onPage} rowsPerPageOptions={[10]} />
// </div>
// </div>
// </div>
// </div>
// );
// }









// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// // import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import Toolbar from '@mui/material/Toolbar';
// import AppBar from '@mui/material/AppBar';
// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Button } from 'primereact/button';
// import { Column } from 'primereact/column';
// import Tooltip from '@mui/material/Tooltip';
// import axios from 'axios';
// import { Paginator } from 'primereact/paginator';
// import './Layout.css';

// export default function Layout({ icon_username }) {
//     const navigate = useNavigate();
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchField, setSearchField] = useState('id');
//     const [dropDown, setDropDown] = useState(null);
//     const [sidebarOpen, setSidebarOpen] = useState(true);
//     const open = Boolean(dropDown);

//     useEffect(() => {
//         const handleKeydown = (event) => {
//             if ((event.ctrlKey || event.metaKey) && (event.key === '=' || event.key === '-' || event.key === '0')) {
//                 event.preventDefault();
//             }
//         };

//         window.addEventListener('keydown', handleKeydown);

//         return () => {
//             window.removeEventListener('keydown', handleKeydown);
//         };
//     }, []);

//     useEffect(() => {
//         axios.get('/user/all')
//             .then(response => {
//                 console.log('Fetched users:', response.data);
//                 setUsers(response.data);
//                 setFilteredUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//             });
//     }, []);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleClick = (event) => {
//         setDropDown(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDropDown(null);
//     };

//     const handleNew = () => {
//         navigate('/querytool/usersubmit');
//     };

//     const onPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const bodyTemplate = (rowData, column) => {
//         return (
//             <Tooltip title={rowData[column.field]} arrow>
//                 <span
//                     style={{
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: 'inline-block',
//                         maxWidth: '200px',
//                     }}
//                 >
//                     {rowData[column.field]}
//                 </span>
//             </Tooltip>
//         );
//     };

//     const secondMenubarEnd = (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div style={{ color: 'white', padding: '20px', borderRadius: '5px', marginLeft: '10px' }}>
//                 Users
//             </div>
//             <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             />
//             <select
//                 value={searchField}
//                 onChange={(e) => setSearchField(e.target.value)}
//                 style={{ padding: '5px', marginLeft: '10px' }}
//             >
//                 <option value="id">ID</option>
//                 <option value="name">Username</option>
//                 <option value="password">Password</option>
//                 <option value="privileges">Privileges</option>
//             </select>
//         </div>
//     );

//     const second = (
//         <div>
//             <Button label='New' icon='pi pi-plus' onClick={handleNew} style={{ backgroundColor: '#183462' }} />
//         </div>
//     );

//     useEffect(() => {
//         const filtered = users.filter(user =>
//             user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//     }, [searchTerm, searchField, users]);

//     const padData = (data, rowsPerPage) => {
//         const currentPage = Math.ceil(first / rowsPerPage) + 1;
//         const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

//         let paddingRowsNeeded = rowsPerPage - data.length;
//         if (currentPage === totalPages) {
//             paddingRowsNeeded = Math.max(0, paddingRowsNeeded);
//         }

//         const paddedData = [...data];

//         for (let i = 0; i < paddingRowsNeeded; i++) {
//             paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
//         }

//         return paddedData;
//     };

//     const paginatedUsers = padData(filteredUsers.slice(first, first + rows), rows);

//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen);
//     };

//     return (
//         <div>
//             <AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '20px' }}>
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
//                         <MenuIcon />
//                     </IconButton>
//                     <IconButton edge="start" color="inherit" aria-label="logo">
//                         <img alt='logo' style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} />
//                     </IconButton>

//                     <div style={{ flexGrow: 1 }} />

//                     <NavLink to='/' style={{ textDecoration: 'none' }}>
//                         <Button color="inherit">
//                             <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                             Logout
//                         </Button>
//                     </NavLink>

//                     <IconButton
//                         color="inherit"
//                         aria-label="user account"
//                         aria-controls="menu-appbar"
//                         aria-haspopup="true"
//                         onClick={handleClick}
//                     >
//                         <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
//                     </IconButton>



//                 </Toolbar>
//             </AppBar>

//             <div style={{ display: 'flex', overflow: 'auto' }}>
//                 <CSidebar visible={sidebarOpen} onVisibleChange={setSidebarOpen}>
//                     <CSidebarNav>
//                         <CContainer fluid>
//                             <CForm className='d-flex' />
//                         </CContainer>
//                         <CNavItem>
//                             <NavLink to='/querytool/mac' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' />MAC
//                             </NavLink>
//                         </CNavItem>
//                         <CNavItem>
//                             <NavLink to='/querytool/settings' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Settings
//                             </NavLink>
//                             <NavLink to='/querytool/createuser' className='nav-link'>
//                                 <RiDashboardLine className='nav-icon' /> Users
//                             </NavLink>
//                         </CNavItem>
//                     </CSidebarNav>
//                 </CSidebar>

//                 <div style={{ flex: 1, paddingLeft: '0px', marginTop: '-12px' }}>
//                     <Menubar start={secondMenubarEnd} end={second} style={{ backgroundColor: '#183462', width: '100%', position: '', top: '0', zIndex: 1000, marginTop: '10px' }} />
//                     <div style={{ marginTop: '-20px' }}>
//                         <DataTable
//                             value={paginatedUsers}
//                             responsiveLayout='scroll'
//                             style={{ border: '1px solid #dee2e6', borderRadius: '10px', marginTop: '20px' }}
//                             className='p-datatable-gridlines hoverable-rows'
//                         >
//                             <Column
//                                 field='id'
//                                 header='ID'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='name'
//                                 header='Username'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='password'
//                                 header='Password'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '300px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                             <Column
//                                 field='privileges'
//                                 header='Privileges'
//                                 style={{ borderRight: '1px solid #dee2e6', width: '150px' }}
//                                 body={bodyTemplate}
//                             ></Column>
//                         </DataTable>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '90px' }}>
//                         <Paginator first={first} rows={rows} totalRecords={filteredUsers.length} onPageChange={onPage} rowsPerPageOptions={[10]} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }




// //new sidebar
// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { AppBar, Toolbar, IconButton,  Avatar, Tooltip, Divider } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Button } from 'primereact/button';
// import { Menubar } from 'primereact/menubar';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import axios from 'axios';
// import { Paginator } from 'primereact/paginator';
// import RootView from './RootView'
// import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
// import './Layout.css';

// export default function Layout({ icon_username }) {
// 	const navigate = useNavigate();
// 	const [first, setFirst] = useState(0);
// 	const [rows, setRows] = useState(10);
// 	const [users, setUsers] = useState([]);
// 	const [filteredUsers, setFilteredUsers] = useState([]);
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const [searchField, setSearchField] = useState('all');
// 	const [dropDown, setDropDown] = useState(null);
// 	const [sidebarOpen, setSidebarOpen] = useState(true);
// 	const open = Boolean(dropDown);

// 	//

// 	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// 	const [userPrivileges, setUserPrivileges] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [isMiddleSize, setIsMiddleSize] = useState(false);
// 	const [isLow, setIsLow] = useState(false);
// 	const [menuAnchorEl, setMenuAnchorEl] = useState(null);
// 	const [prevWidth, setPrevWidth] = useState(window.innerWidth);
// 	const [logoHeight, setLogoHeight] = useState('60px');


// 	const sidebarRef = useRef(null);
// 	const appBarRef = useRef(null);



// 	const toggleSidebar = () => {
// 		setSidebarOpen(!sidebarOpen);
// 	  };
	


//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 960) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

// 	window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);


// 	useEffect(() => {
// 		if (icon_username) {
// 			fetch(`/api/user/${icon_username}`)
// 				.then(response => response.json())
// 				.then(data => {
// 					setUserPrivileges(data.privileges);
// 					setTimeout(() => {
// 						setIsLoading(false);
// 					}, 100)
// 				})
// 				.catch(error => {
// 					console.log('Error feching the privileges from server', error);
// 					setIsLoading(false);
// 				})
// 		}
// 	}, [icon_username]);









// 	const handleClicks = (event) => {
// 		setDropDown(event.currentTarget);
// 	};

// 	const handleClose = () => {
// 		setDropDown(null);
// 	};




// 	//

// 	useEffect(() => {
// 		const handleKeydown = (event) => {
// 			if ((event.ctrlKey || event.metaKey) && (event.key === '=' || event.key === '-' || event.key === '0')) {
// 				event.preventDefault();
// 			}
// 		};

// 		window.addEventListener('keydown', handleKeydown);

// 		return () => {
// 			window.removeEventListener('keydown', handleKeydown);
// 		};
// 	}, []);

// 	useEffect(() => {
// 		axios.get('/user/all')
// 			.then(response => {
// 				console.log('Fetched users:', response.data);
// 				setUsers(response.data);
// 				setFilteredUsers(response.data);
// 			})
// 			.catch(error => {
// 				console.error('Error fetching users:', error);
// 			});
// 	}, []);

// 	const handleLogout = () => {
// 		navigate('/');
// 	};

// 	const handleClick = (event) => {
// 		setDropDown(event.currentTarget);
// 	};



// 	const handleNew = () => {
// 		navigate('/querytool/usersubmit');
// 	};

// 	const onPage = (event) => {
// 		setFirst(event.first);
// 		setRows(event.rows);
// 	};

// 	const bodyTemplate = (rowData, column) => (
// 		<Tooltip title={rowData[column.field]} arrow>
// 			<span
// 				style={{
// 					whiteSpace: 'nowrap',
// 					overflow: 'hidden',
// 					textOverflow: 'ellipsis',
// 					display: 'inline-block',
// 					maxWidth: '200px',
// 				}}
// 			>
// 				{rowData[column.field]}
// 			</span>
// 		</Tooltip>
// 	);

// 	const passwordTemplate = (rowData) => {
// 		const value = rowData.password || '';
// 		return (
// 			<Tooltip title={value} arrow>
// 				<span
// 					style={{
// 						whiteSpace: 'normal',
// 						overflow: 'visible',
// 						textOverflow: 'clip',
// 						display: 'inline-block',
// 						maxWidth: '200px',
// 					}}
// 				>
// 					{value ? '*'.repeat(8) : ''}
// 				</span>
// 			</Tooltip>
// 		);
// 	};

// 	const secondMenubarEnd = (
// 		<div style={{ display: 'flex', alignItems: 'center' }}>
// 			<div style={{ color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
// 				Users
// 			</div>
// 			<input
// 				type="text"
// 				value={searchTerm}
// 				onChange={(e) => setSearchTerm(e.target.value)}
// 				placeholder="Search..."
// 				style={{ padding: '5px', marginLeft: '10px' }}
// 			/>
// 			<select
// 				value={searchField}
// 				onChange={(e) => setSearchField(e.target.value)}
// 				style={{ padding: '5px', marginLeft: '10px' }}
// 			> 
// 			    <option value = "all">All</option>
// 				<option value="id">ID</option>
// 				<option value="name">Username</option>
// 				<option value="password">Password</option>
// 				<option value="privileges">Privileges</option>
// 			</select>
// 		</div>
// 	);

// 	const second = (
// 		<div>
// 			<Button label='New' icon='pi pi-plus' onClick={handleNew} style={{ backgroundColor: '#183462' }} />
// 		</div>
// 	);

// 	// useEffect(() => {
// 	// 	const filtered = users.filter(user =>
// 	// 		user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
// 	// 	);
// 	// 	setFilteredUsers(filtered);
// 	// }, [searchTerm, searchField, users]);

// 	useEffect(() => {
//         const filtered = users.filter(user => {
//             if (searchField === 'all') {
//                 return Object.values(user).some(value =>
//                     String(value).toLowerCase().includes(searchTerm.toLowerCase())
//                 );
//             }
//             return String(user[searchField]).toLowerCase().includes(searchTerm.toLowerCase());
//         });
//         setFilteredUsers(filtered);
//     }, [searchTerm, searchField, users]);

// 	const padData = (data, rowsPerPage) => {
// 		const currentPage = Math.ceil(first / rowsPerPage) + 1;
// 		const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

// 		let paddingRowsNeeded = rowsPerPage - data.length;
// 		if (currentPage === totalPages) {
// 			paddingRowsNeeded = Math.max(0, paddingRowsNeeded);
// 		}

// 		const paddedData = [...data];

// 		for (let i = 0; i < paddingRowsNeeded; i++) {
// 			paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
// 		}

// 		return paddedData;
// 	};

// 	const paginatedUsers = padData(filteredUsers.slice(first, first + rows), rows);



// 	const handelquerytool = () => {
// 		navigate('/querytool');
// 	}

// 	return (
// 		<div>
// 			<AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '1px', zIndex: 1201 }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
//             <MenuIcon />
//           </IconButton>
//           <IconButton edge="start" color="inherit" aria-label="logo">
//             <img alt="logo" style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} />
//           </IconButton>
//           <div style={{ flexGrow: 1 }} />
//           <div style={{ marginRight: '10px' }}>
//             <NavLink to='/' style={{ textDecoration: 'none' }}>
//               <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//               Logout
//             </NavLink>
//           </div>
//           <IconButton
//             style={{ marginRight: '-25px' }}
//             color="inherit"
//             aria-label="user account"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//           >
//             <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <div style={{ display: "flex", height: "100vh",  overflow: 'auto' }}>
//         <Sidebar className='border-end' collapsed={!sidebarOpen} style={{ backgroundColor: '#FAFAFA' }}>
//           <Menu style={{ marginTop: '10px' }}>
//             <NavLink to='/querytool/mac' className='nav-link'>
//               <MenuItem style={{ marginLeft: '-160px' }} icon={<GridViewRoundedIcon style={{ marginLeft: '300px' }} />}>
//                 {sidebarOpen && 'MAC'}
//               </MenuItem>
//             </NavLink>
//             <NavLink to='/querytool/settings' className='nav-link'>
//               <MenuItem style={{ marginLeft: '-140px' }} icon={<GridViewRoundedIcon style={{ marginLeft: '258px' }} />}>
//                 {sidebarOpen && 'Settings'}
//               </MenuItem>
//             </NavLink>
//             {!isLoading && userPrivileges !== 'UI_USER' && (
//             <NavLink to='/querytool/createuser' className='nav-link'>
//               <MenuItem style={{ marginLeft: '-160px' }} icon={<GridViewRoundedIcon style={{ marginLeft: '300px' }} />}>
//                 {sidebarOpen && 'Users'}
//               </MenuItem>
//             </NavLink>
//             )}
//             {/* {!isLoading && userPrivileges !== 'UI_USER' && (
//               <MenuItem style={{ marginLeft: '-160px' }}  icon={<LogoutRoundedIcon />}>Logout</MenuItem>
//             )} */}
//           </Menu>
//         </Sidebar>
                
// 				<div style={{ flex: 1, paddingLeft: '0px', marginTop: '-12px'}}>
// 					<Menubar start={secondMenubarEnd} end={second} style={{ backgroundColor: '#183462', width: '100%', top: '0', zIndex: 1000, marginTop: '10px' }} />
// 					<div style={{ marginTop: '-20px' }}>
// 						<DataTable
						
// 							value={paginatedUsers}
// 							responsiveLayout='scroll'
// 							style={{ border: '1px solid #dee2e6', borderRadius: '10px', marginTop: '20px'}}
// 							className='p-datatable-gridlines hoverable-rows'
// 						>
// 							<Column
// 								field='id'
// 								header='ID'
// 								style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
// 								body={bodyTemplate}
// 							></Column>
// 							<Column
// 								field='name'
// 								header='Username'
// 								style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
// 								body={bodyTemplate}
// 							></Column>
// 							<Column
// 								field='password'
// 								header='Password'
// 								style={{ borderRight: '1px solid #dee2e6', width: '200px' }}
// 								body={passwordTemplate}
// 							></Column>
// 							<Column
// 								field='privileges'
// 								header='Privileges'
// 								style={{ borderRight: '1px solid #dee2e6', width: '150px' }}
// 								body={bodyTemplate}
// 							></Column>
// 						</DataTable>
// 						<div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px', marginLeft: '-60px' }}>
// 							<Paginator first={first} rows={rows} totalRecords={filteredUsers.length} onPageChange={onPage} rowsPerPageOptions={[10]} />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			{/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px', marginLeft: '150px'}}>
//                 <Paginator first={first} rows={rows} totalRecords={filteredUsers.length} onPageChange={onPage} rowsPerPageOptions={[10]} />
//             </div> */}
// 			{/* {isLoading && (
// 				<div style={{
// 					display: 'flex',
// 					justifyContent: 'center',
// 					alignItems: 'center',
// 					height: '100vh',
// 					position: 'fixed',
// 					top: 0,
// 					left: 0,
// 					width: '100%',
// 					backgroundColor: 'rgba(255, 255, 255, 0.8)',
// 					zIndex: 2000
// 				}}>

// 				</div>
// 			)} */}
			
// 		</div>
// 	);
// }



















import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AppBar, Toolbar, IconButton,  Avatar, Tooltip, Divider } from '@mui/material';
import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Sidebar} from "react-pro-sidebar";
import {Menu, MenuItem} from '@mui/material';
import { RiDashboardLine } from 'react-icons/ri';
import SepioLogo from './../image/Sepio_Logo.png';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Paginator } from 'primereact/paginator';
import RootView from './RootView'
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import './Layout.css';

export default function Layout({ icon_username }) {
	const navigate = useNavigate();
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchField, setSearchField] = useState('all');
	const [dropDown, setDropDown] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const open = Boolean(dropDown);

	//

	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [userPrivileges, setUserPrivileges] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isMiddleSize, setIsMiddleSize] = useState(false);
	const [isLow, setIsLow] = useState(false);
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);
	const [prevWidth, setPrevWidth] = useState(window.innerWidth);
	const [logoHeight, setLogoHeight] = useState('60px');


	const sidebarRef = useRef(null);
	const appBarRef = useRef(null);



	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	  };
	


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 960) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

	window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);


	useEffect(() => {
		if (icon_username) {
			fetch(`/api/user/${icon_username}`)
				.then(response => response.json())
				.then(data => {
					setUserPrivileges(data.privileges);
					setTimeout(() => {
						setIsLoading(false);
					}, 100)
				})
				.catch(error => {
					console.log('Error feching the privileges from server', error);
					setIsLoading(false);
				})
		}
	}, [icon_username]);









	const handleClicks = (event) => {
		setDropDown(event.currentTarget);
	};

	const handleClose = () => {
		setDropDown(null);
	};




	//

	// useEffect(() => {
	// 	const handleKeydown = (event) => {
	// 		if ((event.ctrlKey || event.metaKey) && (event.key === '=' || event.key === '-' || event.key === '0')) {
	// 			event.preventDefault();
	// 		}
	// 	};

	// 	window.addEventListener('keydown', handleKeydown);

	// 	return () => {
	// 		window.removeEventListener('keydown', handleKeydown);
	// 	};
	// }, []);

	useEffect(() => {
		axios.get('/user/all')
			.then(response => {
				console.log('Fetched users:', response.data);
				setUsers(response.data);
				setFilteredUsers(response.data);
			})
			.catch(error => {
				console.error('Error fetching users:', error);
			});
	}, []);

	

	const handleClick = (event) => {
		setDropDown(event.currentTarget);
	};


	const handelquery = () => {
		navigate('/querytool');
	}



	const handleNew = () => {
		navigate('/querytool/usersubmit');
	};

	const onPage = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

	const bodyTemplate = (rowData, column) => (
		<Tooltip title={rowData[column.field]} arrow>
			<span
				style={{
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: 'inline-block',
					maxWidth: '200px',
				}}
			>
				{rowData[column.field]}
			</span>
		</Tooltip>
	);

	const passwordTemplate = (rowData) => {
		const value = rowData.password || '';
		return (
			<Tooltip title={value} arrow>
				<span
					style={{
						whiteSpace: 'normal',
						overflow: 'visible',
						textOverflow: 'clip',
						display: 'inline-block',
						maxWidth: '200px',
					}}
				>
					{value ? '*'.repeat(8) : ''}
				</span>
			</Tooltip>
		);
	};

	const secondMenubarEnd = (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
				Users
			</div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search..."
				style={{ padding: '5px', marginLeft: '10px' }}
			/>
			<select
				value={searchField}
				onChange={(e) => setSearchField(e.target.value)}
				style={{ padding: '5px', marginLeft: '10px' }}
			> 
			    <option value = "all">All</option>
				<option value="id">ID</option>
				<option value="name">Username</option>
				<option value="password">Password</option>
				<option value="privileges">Privileges</option>
			</select>
		</div>
	);

	const second = (
		<div>
			<Button label='New' icon='pi pi-plus' onClick={handleNew} style={{ backgroundColor: '#183462' }} />
		</div>
	);

	// useEffect(() => {
	// 	const filtered = users.filter(user =>
	// 		user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
	// 	);
	// 	setFilteredUsers(filtered);
	// }, [searchTerm, searchField, users]);

	useEffect(() => {
        const filtered = users.filter(user => {
            if (searchField === 'all') {
                return Object.values(user).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            return String(user[searchField]).toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredUsers(filtered);
    }, [searchTerm, searchField, users]);

	const padData = (data, rowsPerPage) => {
		const currentPage = Math.ceil(first / rowsPerPage) + 1;
		const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

		let paddingRowsNeeded = rowsPerPage - data.length;
		if (currentPage === totalPages) {
			paddingRowsNeeded = Math.max(0, paddingRowsNeeded);
		}

		const paddedData = [...data];

		for (let i = 0; i < paddingRowsNeeded; i++) {
			paddedData.push({ id: ' - ', username: '', password: '', privileges: '' });
		}

		return paddedData;
	};

	const paginatedUsers = padData(filteredUsers.slice(first, first + rows), rows);



	const handelquerytool = () => {
		navigate('/querytool');
	}

	return (
		<div>
			<AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '1px', zIndex: 1201 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <img alt="logo" style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} onClick = {handelquery} />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <div style={{ marginRight: '10px' }}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
              Logout
            </NavLink>
          </div>
		  <IconButton
						style={{ marginRight: '-25px' }}
						color="inherit"
						aria-label="user account"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleClicks}
					>
						<Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
					</IconButton>

					<Menu
						anchorEl={dropDown}
						id='account-menu'
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 5,
							sx: {
								width: '140px',
								borderRadius: '10px',
								overflow: 'visible',
								mt: 1,
								'&::before': {
									content: '""',
									display: 'inline-block',
									position: 'absolute',
									top: 0,
									right: 19,
									width: 10,
									height: 10,
									bgcolor: 'background.paper',
									transform: 'translateY(-50%) rotate(45deg)',
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
					>
						<MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
							<p style={{ marginBottom: '0px' }}>
								User: {icon_username}
							</p>
						</MenuItem>
						<Divider spacing={1}></Divider>
						<MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
							<p style={{ marginBottom: '0px' }}>
								{userPrivileges}
							</p>
						</MenuItem>
					</Menu>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", height: "100vh",  overflow: 'auto' }}>
	  <Sidebar className='border-end' collapsed={!sidebarOpen} style={{ backgroundColor: '#FAFAFA' }}>
				<CSidebarNav>
					<CContainer fluid>
						<CForm className='d-flex'></CForm>
					</CContainer>
					<CNavItem>
						<NavLink to='/querytool/mac' className='nav-link'>
							<RiDashboardLine className='nav-icon' /> {sidebarOpen && 'MAC'}
						</NavLink>
					</CNavItem>
					<CNavItem>
						<NavLink to='/querytool/settings' className='nav-link'>
							<RiDashboardLine className='nav-icon' /> { sidebarOpen && 'Settings'}
						</NavLink>
						{!isLoading && userPrivileges === 'ADMIN' && (
							<NavLink to='/querytool/createuser' className='nav-link'>
								<RiDashboardLine className='nav-icon' /> {sidebarOpen && 'Users'}
							</NavLink>
						)}
						
					</CNavItem>
				</CSidebarNav>
				</Sidebar>
                
				<div style={{ flex: 1, paddingLeft: '0px', marginTop: '-12px', overflow: 'auto'}}>
					<Menubar start={secondMenubarEnd} end={second} style={{ backgroundColor: '#183462', width: '100%', top: '0', zIndex: 1000, marginTop: '10px', overflow: 'auto' }} />
					<div style={{ marginTop: '-20px' }}>
						<DataTable						
							value={paginatedUsers}
							responsiveLayout='scroll'
							style={{ border: '1px solid #dee2e6', borderRadius: '10px', marginTop: '20px'}}
							className='p-datatable-gridlines hoverable-rows'
						>
							<Column
								field='id'
								header='ID'
								style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
								body={bodyTemplate}
							></Column>
							<Column
								field='name'
								header='Username'
								style={{ borderRight: '1px solid #dee2e6', width: '100px' }}
								body={bodyTemplate}
							></Column>
							<Column
								field='password'
								header='Password'
								style={{ borderRight: '1px solid #dee2e6', width: '200px' }}
								body={passwordTemplate}
							></Column>
							<Column
								field='privileges'
								header='Privileges'
								style={{ borderRight: '1px solid #dee2e6', width: '150px' }}
								body={bodyTemplate}
							></Column>
						</DataTable>
						<div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px', marginLeft: '-60px' }}>
							<Paginator first={first} rows={rows} totalRecords={filteredUsers.length} onPageChange={onPage} rowsPerPageOptions={[10, 20]} />
						</div>
					</div>
				</div>
			</div>
			{/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px', marginLeft: '150px'}}>
                <Paginator first={first} rows={rows} totalRecords={filteredUsers.length} onPageChange={onPage} rowsPerPageOptions={[10]} />
            </div> */}
			{isLoading && (
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					backgroundColor: 'rgba(255, 255, 255, 0.8)',
					zIndex: 2000
				}}>

				</div>
			)}
			
		</div>
	);
}
