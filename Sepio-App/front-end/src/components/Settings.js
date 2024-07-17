
// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { InputText } from 'primereact/inputtext';
// import { Avatar } from 'primereact/avatar';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import {
//   CSidebar, CSidebarNav, CNavItem, CContainer
// } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { NavLink } from 'react-router-dom';
// import SepioLogo from './../image/Sepio_Logo.png';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import axios from 'axios';
// import { Message } from 'primereact/message';

// export default function Layout() {

//   const [serviceNowInstance, setServiceNowInstance] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const navigate = useNavigate();

//   const handleStartClick = () => {
//     navigate('/querytool');
//   };

//   const handleLogout = () => {
//     navigate('/');
//   };

//   const testConnection = async () => {
//     try {
//       const response = await axios.post('/check-connection', {
//         serviceNowInstance,
//         username,
//         password
//       });

//       if (response.data.success) {
//         setMessage(response.data.message);
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       setMessage('Connection failed. Please check your credentials and try again.');
//     }
//   };

//   const start = (
//     <img
//       alt='logo'
//       src={SepioLogo}
//       height='40'
//       className='mr-2'
//       onClick={handleStartClick}
//     />
//   );

//   const end = (
//     <div className='flex align-items-center gap-2'>
//       <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//         <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//         Logout
//       </NavLink>
//       <Avatar icon='pi pi-user' size='large' shape='circle' />
//     </div>
//   );

//   return (
//     <div>
//       <Menubar start={start} end={end} />
//       <div style={{ display: 'flex' }}>
//         <CSidebar className='border-end custom-sidebar'>
//           <CSidebarNav>
//             <CContainer fluid>
//             </CContainer>
//             <CNavItem>
//               <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> Search History</NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//             </CNavItem>
//           </CSidebarNav>
//         </CSidebar>
//         <div style={{ marginTop: '100px', marginLeft: '400px' }}>
//           <div>
//             <h3>ServiceNow Credentials</h3>
//             <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
//               <InputText
//                         type="text"
//                         placeholder="ServiceNow Instance"
//                         value={serviceNowInstance}
//                         onChange={(e) => setServiceNowInstance(e.target.value)}
//               />
//               <InputText
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//               />
//               <InputText
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462' }} />

//           <div>
//           {message && (
//             <Message text={message} style={{ marginTop: '20px' }} />
//           )}
//           </div>

//         </div>
//       </div>


//     </div>
//   );
// }





// //new sidebar
// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { AppBar, Toolbar, IconButton,  Avatar, Divider } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate, NavLink, useLocation } from 'react-router-dom';
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import SepioMainLogo from './../image/QueryTool.png';
// import { Toast } from 'primereact/toast';
// //
// import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Message } from 'primereact/message';
// import axios from 'axios';


// export default function Layout({ icon_username }) {
// 	const [marginLeft, setMarginLeft] = useState('auto');
// 	const [username, setUsername] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [message, setMessage] = useState('');
// 	const [sepioEndpoint, setSepioEndpoint] = useState('');
// 	const [sepioUsername, setSepioUsername] = useState('');
// 	const [sepioPassword, setSepioPassword] = useState('');
// 	const [sepioMessage, setSepioMessage] = useState('');
// 	const [serviceNowInstance, setServiceNowInstance] = useState('');
// 	const [inputWidth, setInputWidth] = useState('100%');
// 	const toast = React.useRef(null);

// 	//
// 	const navigate = useNavigate();
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// 	const [userPrivileges, setUserPrivileges] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);
	
// 	const [isMiddleSize, setIsMiddleSize] = useState(false);
// 	const [isLow, setIsLow] = useState(false);
// 	const [menuAnchorEl, setMenuAnchorEl] = useState(null);
// 	const [prevWidth, setPrevWidth] = useState(window.innerWidth);
// 	const [logoHeight, setLogoHeight] = useState('60px');
// 	const [dropDown, setDropDown] = useState(null);
// 	const open = Boolean(dropDown);
// 	const [sidebarOpen, setSidebarOpen] = useState(true);

// 	const sidebarRef = useRef(null);
// 	const appBarRef = useRef(null);




// 	const toggleSidebar = () => {
// 		setSidebarOpen(!sidebarOpen);
// 	  };
	
// 	  useEffect(() => {
// 		const handleResize = () => {
// 		  if (window.innerWidth <= 960) {
// 			setSidebarOpen(false);
// 		  } else {
// 			setSidebarOpen(true);
// 		  }
// 		};
	
// 		window.addEventListener("resize", handleResize);
// 		handleResize();
	
// 		return () => window.removeEventListener("resize", handleResize);
// 	  }, []);
	




// 	const handleClicks = (event) => {
// 		setDropDown(event.currentTarget);
// 	};

// 	const handleClose = () => {
// 		setDropDown(null);
// 	};








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
// 					console.error('Error fetching the privilege', error);
// 					setIsLoading(false); // Set loading to false even if there is an error
// 				});
// 		}
// 	}, [icon_username]);


// 	const location = useLocation();

// 	// Функція для отримання даних з сервера
// 	const fetchData = async () => {
// 		try {
// 			const snResponse = await axios.get('/get-source');
// 			setServiceNowInstance(snResponse.data.serviceNowInstance);
// 			setUsername(snResponse.data.username);
// 			setPassword(snResponse.data.password);

// 			const sepioResponse = await axios.get('/get-sepio-source');
// 			setSepioEndpoint(sepioResponse.data.sepioEndpoint);
// 			setSepioUsername(sepioResponse.data.sepioUsername);
// 			setSepioPassword(sepioResponse.data.sepioPassword)

// 		} catch (error) {
// 			console.error("Error fetching data:", error);
// 		}
// 	};

// 	const showError = (message) => {
// 		toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
// 	};

// 	const showSuccess = (message) => {
// 		toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
// 	};

// 	// Виконання fetchData при зміні маршруту
// 	useEffect(() => {
// 		fetchData();
// 	}, [location]);

// 	// useEffect(() => {
// 	// 	if (isScrollDisabled) {
// 	// 		document.body.style.overflow = 'hidden';
// 	// 	} else {
// 	// 		document.body.style.overflow = 'auto';
// 	// 	}
// 	// 	return () => {
// 	// 		document.body.style.overflow = 'auto';
// 	// 	};

// 	// }, [isScrollDisabled]);

// 	const handleStartClick = () => {
// 		navigate('/querytool');
// 	};

// 	const handleLogout = () => {
// 		navigate('/');
// 	};

// 	const testConnection = async () => {
// 		try {

// 			if (serviceNowInstance.indexOf("http") >= 0) {
// 				showError('Please, provide endpoint without «http(s)://»');
// 				return;
// 			}

// 			const response = await axios.post('/check-connection', {
// 				serviceNowInstance,
// 				username,
// 				password
// 			});

// 			if (response.data.success) {
// 				showSuccess(response.data.message);
// 			} else {
// 				showSuccess(response.data.message);
// 			}
// 		} catch (error) {
// 			showError('Connection failed. Please check your credentials and try again.');
// 		}
// 	};

// 	const testSepioConnection = async () => {
// 		try {

// 			if (sepioEndpoint.indexOf("http") >= 0) {
// 				showError('Please, provide endpoint without «http(s)://»');
// 				return;
// 			}

// 			const response = await axios.post('/check-sepio-connection', {
// 				sepioEndpoint,
// 				sepioUsername,
// 				sepioPassword
// 			});

// 			if (response.data.success) {
// 				showSuccess(response.data.message);
// 			} else {
// 				showSuccess(response.data.message);
// 			}
// 		} catch (error) {
// 			showError('Connection failed. Please check your credentials and try again.');
// 		}
// 	};


// 	// const handleResize = () => {
// 	// 	const windowWidth = window.innerWidth;
// 	// 	if (windowWidth <= 280) {
// 	// 		setInputWidth('calc(100% - 10px)'); // Adjust width for smaller screens
// 	// 		setMarginLeft('10px'); // Move to the right on smaller screens
// 	// 	} else if (windowWidth <= 968) {
// 	// 		setInputWidth('calc(100% - 50px)'); // Adjust width for medium screens
// 	// 		setMarginLeft('140px'); // Move to the right on medium screens
// 	// 	} else {
// 	// 		setInputWidth('100%'); // Default width for larger screens
// 	// 		setMarginLeft('auto'); // Center align on larger screens
// 	// 	}
// 	// };

// 	// // Effect hook to add and remove resize event listener
// 	// useEffect(() => {
// 	// 	window.addEventListener('resize', handleResize);
// 	// 	handleResize(); // Initial call to set input width based on window size

// 	// 	return () => {
// 	// 		window.removeEventListener('resize', handleResize);
// 	// 	};
// 	// }, []);





// 	const handelquerytool = () => {
// 		navigate('/querytool');
// 	}


// 	return (
// 		<div>
// 			<Toast ref={toast} />
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
//       <div style={{ display: "flex", height: "100vh" }}>
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



// 				<div style={{ marginLeft: marginLeft, flex: '1', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
// 					<div style={{ width: '70%', maxWidth: '600px', minWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
// 						<div style={{ marginBottom: '20px' }}>
// 							{message && (
// 								<div style={{ marginBottom: '20px' }}>
// 									<Message text={message} />
// 								</div>
// 							)}
// 							{sepioMessage && (
// 								<div style={{ marginBottom: '20px' }}>
// 									<Message text={sepioMessage} />
// 								</div>
// 							)}
// 						</div>
// 						<h3>ServiceNow Credentials</h3>
// 						<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
// 							<InputText
// 								type="text"
// 								placeholder="ServiceNow Instance"
// 								value={serviceNowInstance}
// 								onChange={(e) => setServiceNowInstance(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth, }}
// 							/>
// 							<InputText
// 								type="text"
// 								placeholder="Username"
// 								value={username}
// 								onChange={(e) => setUsername(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 							<InputText
// 								type="password"
// 								placeholder="Password"
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 						</div>
// 						<Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', marginBottom: '20px', width: '35%', borderRadius: '5px' }} />

// 						<div style={{ marginTop: '20px' }}></div>
// 						<h3>Sepio Credentials</h3>
// 						<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
// 							<InputText
// 								type="text"
// 								placeholder="Sepio Endpoint"
// 								value={sepioEndpoint}
// 								onChange={(e) => setSepioEndpoint(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 							<InputText
// 								type="text"
// 								placeholder="Username"
// 								value={sepioUsername}
// 								onChange={(e) => setSepioUsername(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 							<InputText
// 								type="password"
// 								placeholder="Password"
// 								value={sepioPassword}
// 								onChange={(e) => setSepioPassword(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 						</div>
// 						<Button label="Test Connection" icon="pi pi-check" onClick={testSepioConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', width: '35%', borderRadius: '5px' }} />
// 					</div>
// 				</div>
// 			</div>
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
// 					backgroundColor: 'rgba(255 ,255, 255, 0.8)',
// 					zIndex: 2000
// 				}}>


// 				</div>
// 			)} */}
// 		</div>
// 	);
// }

























// import React, { useEffect, useState, useRef } from 'react';
// import { AppBar, Toolbar, IconButton, Avatar, Divider, Menu, MenuItem } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate, NavLink, useLocation } from 'react-router-dom';
// import { Sidebar } from "react-pro-sidebar";
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { Toast } from 'primereact/toast';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Message } from 'primereact/message';
// import axios from 'axios';

// export default function Layout({ icon_username }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [sepioEndpoint, setSepioEndpoint] = useState('');
//   const [sepioUsername, setSepioUsername] = useState('');
//   const [sepioPassword, setSepioPassword] = useState('');
//   const [sepioMessage, setSepioMessage] = useState('');
//   const [serviceNowInstance, setServiceNowInstance] = useState('');
//   const toast = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [dropDown, setDropDown] = useState(null);
//   const open = Boolean(dropDown);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleClicks = (event) => {
//     setDropDown(event.currentTarget);
//   };

//   const handleClose = () => {
//     setDropDown(null);
//   };

//   const fetchData = async () => {
//     try {
//       const snResponse = await axios.get('/get-source');
//       setServiceNowInstance(snResponse.data.serviceNowInstance);
//       setUsername(snResponse.data.username);
//       setPassword(snResponse.data.password);

//       const sepioResponse = await axios.get('/get-sepio-source');
//       setSepioEndpoint(sepioResponse.data.sepioEndpoint);
//       setSepioUsername(sepioResponse.data.sepioUsername);
//       setSepioPassword(sepioResponse.data.sepioPassword);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const showError = (message) => {
//     toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
//   };

//   const showSuccess = (message) => {
//     toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [location]);

//   const handleStartClick = () => {
//     navigate('/querytool');
//   };

//   const handleLogout = () => {
//     navigate('/');
//   };

//   const testConnection = async () => {
//     try {
//       if (serviceNowInstance.indexOf("http") >= 0) {
//         showError('Please, provide endpoint without «http(s)://»');
//         return;
//       }

//       const response = await axios.post('/check-connection', {
//         serviceNowInstance,
//         username,
//         password
//       });

//       if (response.data.success) {
//         showSuccess(response.data.message);
//       } else {
//         showError(response.data.message);
//       }
//     } catch (error) {
//       showError('Connection failed. Please check your credentials and try again.');
//     }
//   };

//   const testSepioConnection = async () => {
//     try {
//       if (sepioEndpoint.indexOf("http") >= 0) {
//         showError('Please, provide endpoint without «http(s)://»');
//         return;
//       }

//       const response = await axios.post('/check-sepio-connection', {
//         sepioEndpoint,
//         sepioUsername,
//         sepioPassword
//       });

//       if (response.data.success) {
//         showSuccess(response.data.message);
//       } else {
//         showError(response.data.message);
//       }
//     } catch (error) {
//       showError('Connection failed. Please check your credentials and try again.');
//     }
//   };

//   const handleQueryTool = () => {
//     navigate('/querytool');
//   };

//   return (
//     <div>
//       <Toast ref={toast} />
//       <AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '1px', zIndex: 1201 }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
//             <MenuIcon />
//           </IconButton>
//           <IconButton edge="start" color="inherit" aria-label="logo">
//             <img alt="logo" style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} onClick={handleQueryTool} />
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
//             onClick={handleClicks}
//           >
//             <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
//           </IconButton>
//           <Menu
//             anchorEl={dropDown}
//             id='account-menu'
//             open={open}
//             onClose={handleClose}
//             onClick={handleClose}
//             PaperProps={{
//               elevation: 5,
//               sx: {
//                 width: '140px',
//                 borderRadius: '10px',
//                 overflow: 'visible',
//                 mt: 1,
//                 '&::before': {
//                   content: '""',
//                   display: 'inline-block',
//                   position: 'absolute',
//                   top: 0,
//                   right: 19,
//                   width: 10,
//                   height: 10,
//                   bgcolor: 'background.paper',
//                   transform: 'translateY(-50%) rotate(45deg)',
//                   zIndex: 0,
//                 },
//               },
//             }}
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'center',
//             }}
//             anchorOrigin={{
//               vertical: 'bottom',
//               horizontal: 'center',
//             }}
//           >
//             <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
//               <p style={{ marginBottom: '0px' }}>
//                 User: {icon_username}
//               </p>
//             </MenuItem>
//             <Divider spacing={1}></Divider>
//             {/* Additional menu items as needed */}
//           </Menu>
//         </Toolbar>
//       </AppBar>
//       <div style={{ display: "flex", height: "100vh" }}>
//         <Sidebar className='border-end' collapsed={!sidebarOpen} style={{ backgroundColor: '#FAFAFA' }}>
//           {/* Sidebar content */}
//         </Sidebar>
//         <div style={{ marginLeft: 'auto', flex: '1', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//           <div style={{ width: '70%', maxWidth: '600px', minWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
//             <div style={{ marginBottom: '20px' }}>
//               {message && (
//                 <div style={{ marginBottom: '20px' }}>
//                   <Message text={message} />
//                 </div>
//               )}
//               {sepioMessage && (
//                 <div style={{ marginBottom: '20px' }}>
//                   <Message text={sepioMessage} />
//                 </div>
//               )}
//             </div>
//             <h3>ServiceNow Credentials</h3>
//             <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
//               <InputText
//                 type="text"
//                 placeholder="ServiceNow Instance"
//                 value={serviceNowInstance}
//                 onChange={(e) => setServiceNowInstance(e.target.value)}
//                 style={{ marginBottom: '10px', width: '100%' }}
//               />
//               <InputText
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 style={{ marginBottom: '10px', width: '100%' }}
//               />
//               <InputText
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{ marginBottom: '10px', width: '100%' }}
//               />
//             </div>
//             <Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', marginBottom: '20px', width: '35%', borderRadius: '5px' }} />

//             <div style={{ marginTop: '20px' }}></div>
//             <h3>Sepio Credentials</h3>
//             <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
//               <InputText
//                 type="text"
//                 placeholder="Sepio Endpoint"
//                 value={sepioEndpoint}
//                 onChange={(e) => setSepioEndpoint(e.target.value)}
//                 style={{ marginBottom: '10px', width: '100%' }}
//               />
//               <InputText
//                 type="text"
//                 placeholder="Username"
//                 value={sepioUsername}
//                 onChange={(e) => setSepioUsername(e.target.value)}
//                 style={{ marginBottom: '10px', width: '100%' }}
//               />
//               <InputText
//                 type="password"
//                 placeholder="Password"
//                 value={sepioPassword}
//                 onChange={(e) => setSepioPassword(e.target.value)}
//                 style={{ marginBottom: '10px', width: '100%' }}
//               />
//             </div>
//             <Button label="Test Sepio Connection" icon="pi pi-check" onClick={testSepioConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', marginBottom: '20px', width: '35%', borderRadius: '5px' }} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { AppBar, Toolbar, IconButton,  Avatar, Divider } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate, NavLink, useLocation } from 'react-router-dom';
// import { Sidebar} from "react-pro-sidebar";
// import {Menu, MenuItem} from '@mui/material';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import SepioMainLogo from './../image/QueryTool.png';
// import { Toast } from 'primereact/toast';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// //
// import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Message } from 'primereact/message';
// import axios from 'axios';


// export default function Layout({ icon_username }) {
// 	const [username, setUsername] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [message, setMessage] = useState('');
// 	const [sepioEndpoint, setSepioEndpoint] = useState('');
// 	const [sepioUsername, setSepioUsername] = useState('');
// 	const [sepioPassword, setSepioPassword] = useState('');
// 	const [sepioMessage, setSepioMessage] = useState('');
// 	const [serviceNowInstance, setServiceNowInstance] = useState('');
// 	const [inputWidth, setInputWidth] = useState('100%');
// 	const toast = React.useRef(null);

// 	//
// 	const navigate = useNavigate();
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// 	const [userPrivileges, setUserPrivileges] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);
	
// 	const [isMiddleSize, setIsMiddleSize] = useState(false);
// 	const [isLow, setIsLow] = useState(false);
// 	const [menuAnchorEl, setMenuAnchorEl] = useState(null);
// 	const [prevWidth, setPrevWidth] = useState(window.innerWidth);
// 	const [logoHeight, setLogoHeight] = useState('60px');
// 	const [dropDown, setDropDown] = useState(null);
// 	const open = Boolean(dropDown);
// 	const [sidebarOpen, setSidebarOpen] = useState(true);

// 	const sidebarRef = useRef(null);
// 	const appBarRef = useRef(null);
// //
// const [marginLeft, setMarginLeft] = useState('auto');

// const handleResizes = () => {
// 	const windowWidth = window.innerWidth;
// 	if (windowWidth <= 280) {
// 		setMarginLeft('0px'); // Move to the right on smaller screens
// 	} else if (windowWidth <= 968) {

// 		setMarginLeft('-250px'); // Move to the right on medium screens
// 	} else {
// 		setInputWidth('100%'); // Default width for larger screens
// 		setMarginLeft('auto'); // Center align on larger screens
// 	}
// };


// useEffect(() => {
// 	window.addEventListener('resize', handleResizes);
// 	handleResizes();

// 	return () => {
// 		window.removeEventListener('resize', handleResizes);
// 	};
// }, []);




// 	const toggleSidebar = () => {
// 		setSidebarOpen(!sidebarOpen);
// 	  };
	
// 	  useEffect(() => {
// 		const handleResize = () => {
// 		  if (window.innerWidth <= 960) {
// 			setSidebarOpen(false);
// 		  } else {
// 			setSidebarOpen(true);
// 		  }
// 		};
	
// 		window.addEventListener("resize", handleResize);
// 		handleResize();
	
// 		return () => window.removeEventListener("resize", handleResize);
// 	  }, []);
	




// 	const handleClicks = (event) => {
// 		setDropDown(event.currentTarget);
// 	};

// 	const handleClose = () => {
// 		setDropDown(null);
// 	};








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
// 					console.error('Error fetching the privilege', error);
// 					setIsLoading(false); // Set loading to false even if there is an error
// 				});
// 		}
// 	}, [icon_username]);


// 	const location = useLocation();

// 	// Функція для отримання даних з сервера
// 	const fetchData = async () => {
// 		try {
// 			const snResponse = await axios.get('/get-source');
// 			setServiceNowInstance(snResponse.data.serviceNowInstance);
// 			setUsername(snResponse.data.username);
// 			setPassword(snResponse.data.password);

// 			const sepioResponse = await axios.get('/get-sepio-source');
// 			setSepioEndpoint(sepioResponse.data.sepioEndpoint);
// 			setSepioUsername(sepioResponse.data.sepioUsername);
// 			setSepioPassword(sepioResponse.data.sepioPassword)

// 		} catch (error) {
// 			console.error("Error fetching data:", error);
// 		}
// 	};

// 	const showError = (message) => {
// 		toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
// 	};

// 	const showSuccess = (message) => {
// 		toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
// 	};

// 	// Виконання fetchData при зміні маршруту
// 	useEffect(() => {
// 		fetchData();
// 	}, [location]);

// 	// useEffect(() => {
// 	// 	if (isScrollDisabled) {
// 	// 		document.body.style.overflow = 'hidden';
// 	// 	} else {
// 	// 		document.body.style.overflow = 'auto';
// 	// 	}
// 	// 	return () => {
// 	// 		document.body.style.overflow = 'auto';
// 	// 	};

// 	// }, [isScrollDisabled]);

// 	const handleStartClick = () => {
// 		navigate('/querytool');
// 	};

// 	const handleLogout = () => {
// 		navigate('/');
// 	};

// 	const testConnection = async () => {
// 		try {

// 			if (serviceNowInstance.indexOf("http") >= 0) {
// 				showError('Please, provide endpoint without «http(s)://»');
// 				return;
// 			}

// 			const response = await axios.post('/check-connection', {
// 				serviceNowInstance,
// 				username,
// 				password
// 			});

// 			if (response.data.success) {
// 				showSuccess(response.data.message);
// 			} else {
// 				showSuccess(response.data.message);
// 			}
// 		} catch (error) {
// 			showError('Connection failed. Please check your credentials and try again.');
// 		}
// 	};

// 	const testSepioConnection = async () => {
// 		try {

// 			if (sepioEndpoint.indexOf("http") >= 0) {
// 				showError('Please, provide endpoint without «http(s)://»');
// 				return;
// 			}

// 			const response = await axios.post('/check-sepio-connection', {
// 				sepioEndpoint,
// 				sepioUsername,
// 				sepioPassword
// 			});

// 			if (response.data.success) {
// 				showSuccess(response.data.message);
// 			} else {
// 				showSuccess(response.data.message);
// 			}
// 		} catch (error) {
// 			showError('Connection failed. Please check your credentials and try again.');
// 		}
// 	};


// 	// const handleResize = () => {
// 	// 	const windowWidth = window.innerWidth;
// 	// 	if (windowWidth <= 280) {
// 	// 		setInputWidth('calc(100% - 10px)'); // Adjust width for smaller screens
// 	// 		setMarginLeft('10px'); // Move to the right on smaller screens
// 	// 	} else if (windowWidth <= 968) {
// 	// 		setInputWidth('calc(100% - 50px)'); // Adjust width for medium screens
// 	// 		setMarginLeft('140px'); // Move to the right on medium screens
// 	// 	} else {
// 	// 		setInputWidth('100%'); // Default width for larger screens
// 	// 		setMarginLeft('auto'); // Center align on larger screens
// 	// 	}
// 	// };

// 	// // Effect hook to add and remove resize event listener
// 	// useEffect(() => {
// 	// 	window.addEventListener('resize', handleResize);
// 	// 	handleResize(); // Initial call to set input width based on window size

// 	// 	return () => {
// 	// 		window.removeEventListener('resize', handleResize);
// 	// 	};
// 	// }, []);





// 	const handelquerytool = () => {
// 		navigate('/querytool');
// 	}





// 	return (
// 		<div>
// 			<Toast ref={toast} />
// 			<AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '1px', zIndex: 1201 }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
//             <MenuIcon />
//           </IconButton>
//           <IconButton edge="start" color="inherit" aria-label="logo">
//             <img alt="logo" style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} onClick = {handelquerytool} />
//           </IconButton>
//           <div style={{ flexGrow: 1 }} />
//           <div style={{ marginRight: '10px' }}>
//             <NavLink to='/' style={{ textDecoration: 'none' }}>
//               <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//               Logout
//             </NavLink>
//           </div>
//           <IconButton
// 						style={{ marginRight: '-25px' }}
// 						color="inherit"
// 						aria-label="user account"
// 						aria-controls="menu-appbar"
// 						aria-haspopup="true"
// 						onClick={handleClicks}
// 					>
// 						<Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
// 					</IconButton>

// 					<Menu
// 						anchorEl={dropDown}
// 						id='account-menu'
// 						open={open}
// 						onClose={handleClose}
// 						onClick={handleClose}
// 						PaperProps={{
// 							elevation: 5,
// 							sx: {
// 								width: '140px',
// 								borderRadius: '10px',
// 								overflow: 'visible',
// 								mt: 1,
// 								'&::before': {
// 									content: '""',
// 									display: 'inline-block',
// 									position: 'absolute',
// 									top: 0,
// 									right: 19,
// 									width: 10,
// 									height: 10,
// 									bgcolor: 'background.paper',
// 									transform: 'translateY(-50%) rotate(45deg)',
// 									zIndex: 0,
// 								},
// 							},
// 						}}
// 						transformOrigin={{
// 							vertical: 'top',
// 							horizontal: 'center',
// 						}}
// 						anchorOrigin={{
// 							vertical: 'bottom',
// 							horizontal: 'center',
// 						}}
// 					>
// 						<MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
// 							<p style={{ marginBottom: '0px' }}>
// 								User: {icon_username}
// 							</p>
// 						</MenuItem>
// 						<Divider spacing={1}></Divider>
// 						<MenuItem sx={{ display: 'flex', justifyContent: 'center' }} title='Profile'>
// 							<p style={{ marginBottom: '0px' }}>
// 								{userPrivileges}
// 							</p>
// 						</MenuItem>
// 					</Menu>
//         </Toolbar>
//       </AppBar>
//       <div style={{display: "flex", height: "100vh"}}>
// 	  <Sidebar className='border-end' collapsed={!sidebarOpen} style={{ backgroundColor: '#FAFAFA' }}>
// 				<CSidebarNav>
// 					<CContainer fluid>
// 						<CForm className='d-flex'></CForm>
// 					</CContainer>
// 					<CNavItem>
// 						<NavLink to='/querytool/mac' className='nav-link'>
// 							<RiDashboardLine className='nav-icon' /> {sidebarOpen && 'MAC'}
// 						</NavLink>
// 					</CNavItem>
// 					<CNavItem>
// 						<NavLink to='/querytool/settings' className='nav-link'>
// 							<RiDashboardLine className='nav-icon' /> { sidebarOpen && 'Settings'}
// 						</NavLink>
// 						{!isLoading && userPrivileges === 'ADMIN' && (
// 							<NavLink to='/querytool/createuser' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> {sidebarOpen && 'Users'}
// 							</NavLink>
// 							)}
						
// 					</CNavItem>
// 				</CSidebarNav>
// 				</Sidebar>



// 				<div style={{ marginLeft: marginLeft, flex: 1, paddingLeft: '0px', marginTop: '80px', overflow: 'auto' }}>
// 					<div style = {{marginLeft: '400px' }}>
// 					<div style={{ width: '70%', maxWidth: '600px', minWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
// 						<div style={{ marginBottom: '20px' }}>
// 							{message && (
// 								<div style={{ marginBottom: '20px' }}>
// 									<Message text={message} />
// 								</div>
// 							)}
// 							{sepioMessage && (
// 								<div style={{ marginBottom: '20px' }}>
// 									<Message text={sepioMessage} />
// 								</div>
// 							)}
// 						</div>

// 						<h3>ServiceNow Credentials</h3>
// 						<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
// 							<InputText
// 								type="text"
// 								placeholder="ServiceNow Instance"
// 								value={serviceNowInstance}
// 								onChange={(e) => setServiceNowInstance(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth, }}
// 							/>
// 							<InputText
// 								type="text"
// 								placeholder="Username"
// 								value={username}
// 								onChange={(e) => setUsername(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 							<InputText
// 								type="password"
// 								placeholder="Password"
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 						</div>
// 						<Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', marginBottom: '20px', width: '35%', borderRadius: '5px' }} />

// 						<div style={{ marginTop: '20px' }}></div>
// 						<h3>Sepio Credentials</h3>
// 						<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
// 							<InputText
// 								type="text"
// 								placeholder="Sepio Endpoint"
// 								value={sepioEndpoint}
// 								onChange={(e) => setSepioEndpoint(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 							<InputText
// 								type="text"
// 								placeholder="Username"
// 								value={sepioUsername}
// 								onChange={(e) => setSepioUsername(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 							<InputText
// 								type="password"
// 								placeholder="Password"
// 								value={sepioPassword}
// 								onChange={(e) => setSepioPassword(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 						</div>
// 						<Button label="Test Connection" icon="pi pi-check" onClick={testSepioConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', width: '35%', borderRadius: '5px' }} />
// 					</div>
// 					</div>
// 				</div>
// 			</div>
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
// 					backgroundColor: 'rgba(255 ,255, 255, 0.8)',
// 					zIndex: 2000
// 				}}>


// 				</div>
// 			)} */}
// 		</div>
// 	);
// }




















// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { AppBar, Toolbar, IconButton,  Avatar, Divider } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate, NavLink, useLocation } from 'react-router-dom';
// import { Sidebar} from "react-pro-sidebar";
// import {Menu, MenuItem} from '@mui/material';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import SepioMainLogo from './../image/QueryTool.png';
// import { Toast } from 'primereact/toast';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// //
// import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Message } from 'primereact/message';
// import axios from 'axios';


// export default function Layout({ icon_username }) {
// 	const [username, setUsername] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [message, setMessage] = useState('');
// 	const [sepioEndpoint, setSepioEndpoint] = useState('');
// 	const [sepioUsername, setSepioUsername] = useState('');
// 	const [sepioPassword, setSepioPassword] = useState('');
// 	const [sepioMessage, setSepioMessage] = useState('');
// 	const [serviceNowInstance, setServiceNowInstance] = useState('');
// 	const [inputWidth, setInputWidth] = useState('100%');
// 	const toast = React.useRef(null);

// 	//
// 	const navigate = useNavigate();
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// 	const [userPrivileges, setUserPrivileges] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);
	
	
// 	const [dropDown, setDropDown] = useState(null);
// 	const open = Boolean(dropDown);
// 	const [sidebarOpen, setSidebarOpen] = useState(true);


// const [marginLeft, setMarginLeft] = useState('auto');

// const handleResizes = () => {
// 	const windowWidth = window.innerWidth;
// 	if (windowWidth <= 280) {
// 		setMarginLeft('0px'); // Move to the right on smaller screens
// 	} else if (windowWidth <= 1580) {

// 		setMarginLeft('-450px'); // Move to the right on medium screens
// 	} else {
// 		setInputWidth('100%'); // Default width for larger screens
// 		setMarginLeft('auto'); // Center align on larger screens
// 	}
// };


// useEffect(() => {
// 	window.addEventListener('resize', handleResizes);
// 	handleResizes();

// 	return () => {
// 		window.removeEventListener('resize', handleResizes);
// 	};
// }, []);




// 	const toggleSidebar = () => {
// 		setSidebarOpen(!sidebarOpen);
// 	  };
	
// 	  useEffect(() => {
// 		const handleResize = () => {
// 		  if (window.innerWidth <= 960) {
// 			setSidebarOpen(false);
// 		  } else {
// 			setSidebarOpen(true);
// 		  }
// 		};
	
// 		window.addEventListener("resize", handleResize);
// 		handleResize();
	
// 		return () => window.removeEventListener("resize", handleResize);
// 	  }, []);
	




// 	const handleClicks = (event) => {
// 		setDropDown(event.currentTarget);
// 	};

// 	const handleClose = () => {
// 		setDropDown(null);
// 	};








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
// 					console.error('Error fetching the privilege', error);
// 					setIsLoading(false); // Set loading to false even if there is an error
// 				});
// 		}
// 	}, [icon_username]);


// 	const location = useLocation();

// 	// Функція для отримання даних з сервера
// 	const fetchData = async () => {
// 		try {
// 			const snResponse = await axios.get('/get-source');
// 			setServiceNowInstance(snResponse.data.serviceNowInstance);
// 			setUsername(snResponse.data.username);
// 			setPassword(snResponse.data.password);

// 			const sepioResponse = await axios.get('/get-sepio-source');
// 			setSepioEndpoint(sepioResponse.data.sepioEndpoint);
// 			setSepioUsername(sepioResponse.data.sepioUsername);
// 			setSepioPassword(sepioResponse.data.sepioPassword)

// 		} catch (error) {
// 			console.error("Error fetching data:", error);
// 		}
// 	};

// 	const showError = (message) => {
// 		toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
// 	};

// 	const showSuccess = (message) => {
// 		toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
// 	};

// 	// Виконання fetchData при зміні маршруту
// 	useEffect(() => {
// 		fetchData();
// 	}, [location]);



// 	const testConnection = async () => {
// 		try {

// 			if (serviceNowInstance.indexOf("http") >= 0) {
// 				showError('Please, provide endpoint without «http(s)://»');
// 				return;
// 			}

// 			const response = await axios.post('/check-connection', {
// 				serviceNowInstance,
// 				username,
// 				password
// 			});

// 			if (response.data.success) {
// 				showSuccess(response.data.message);
// 			} else {
// 				showSuccess(response.data.message);
// 			}
// 		} catch (error) {
// 			showError('Connection failed. Please check your credentials and try again.');
// 		}
// 	};

// 	const testSepioConnection = async () => {
// 		try {

// 			if (sepioEndpoint.indexOf("http") >= 0) {
// 				showError('Please, provide endpoint without «http(s)://»');
// 				return;
// 			}

// 			const response = await axios.post('/check-sepio-connection', {
// 				sepioEndpoint,
// 				sepioUsername,
// 				sepioPassword
// 			});

// 			if (response.data.success) {
// 				showSuccess(response.data.message);
// 			} else {
// 				showSuccess(response.data.message);
// 			}
// 		} catch (error) {
// 			showError('Connection failed. Please check your credentials and try again.');
// 		}
// 	};


// 	const handelquerytool = () => {
// 		navigate('/querytool');
// 	}


// 	return (
// 		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
// 			<Toast ref={toast} />
// 			<AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '1px', zIndex: 1201 }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
//             <MenuIcon />
//           </IconButton>
//           <IconButton edge="start" color="inherit" aria-label="logo">
//             <img alt="logo" style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} onClick = {handelquerytool} />
//           </IconButton>
//           <div style={{ flexGrow: 1 }} />
//           <div style={{ marginRight: '10px' }}>
//             <NavLink to='/' style={{ textDecoration: 'none' }}>
//               <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//               Logout
//             </NavLink>
//           </div>
//           <IconButton
// 						style={{ marginRight: '-25px' }}
// 						color="inherit"
// 						aria-label="user account"
// 						aria-controls="menu-appbar"
// 						aria-haspopup="true"
// 						onClick={handleClicks}
// 					>
// 						<Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
// 					</IconButton>

//         </Toolbar>
//       </AppBar>
// 	  <div style={{ display: 'flex', flex: 1, height: '100%' }}>
// 	  <Sidebar className='border-end' collapsed={!sidebarOpen} style={{ backgroundColor: '#FAFAFA', height: '100%' }}>

// 				<CSidebarNav>
// 					<CContainer fluid>
// 						<CForm className='d-flex'></CForm>
// 					</CContainer>
// 					<CNavItem>
// 						<NavLink to='/querytool/mac' className='nav-link'>
// 							<RiDashboardLine className='nav-icon' /> {sidebarOpen && 'MAC'}
// 						</NavLink>
// 					</CNavItem>
// 					<CNavItem>
// 						<NavLink to='/querytool/settings' className='nav-link'>
// 							<RiDashboardLine className='nav-icon' /> { sidebarOpen && 'Settings'}
// 						</NavLink>
// 						{!isLoading && userPrivileges === 'ADMIN' && (
// 							<NavLink to='/querytool/createuser' className='nav-link'>
// 								<RiDashboardLine className='nav-icon' /> {sidebarOpen && 'Users'}
// 							</NavLink>
// 						)}
						
// 					</CNavItem>
// 				</CSidebarNav>
// 				</Sidebar>



// 				<div style={{ marginLeft: marginLeft, flex: 1, paddingLeft: '0px', marginTop: '80px', overflowY: 'auto'}}>
// 					<div style = {{marginLeft: '500px' }}>
// 					<div style={{ width: '70%', maxWidth: '600px', minWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',background: 'linear-gradient(to top ,#9EADB7, #93B8D4)',  }}>
// 						<div style={{ marginBottom: '20px' }}>
// 							{message && (
// 								<div style={{ marginBottom: '20px' }}>
// 									<Message text={message} />
// 								</div>
// 							)}
// 							{sepioMessage && (
// 								<div style={{ marginBottom: '20px' }}>
// 									<Message text={sepioMessage} />
// 								</div>
// 							)}
// 						</div>

// 						<h3>ServiceNow Credentials</h3>
// 						<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
// 							<InputText
// 								type="text"
// 								placeholder="ServiceNow Instance"
// 								value={serviceNowInstance}
// 								onChange={(e) => setServiceNowInstance(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth, }}
// 							/>
// 							<InputText
// 								type="text"
// 								placeholder="Username"
// 								value={username}
// 								onChange={(e) => setUsername(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 							<InputText
// 								type="password"
// 								placeholder="Password"
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 						</div>
// 						<Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', marginBottom: '20px', width: '35%', borderRadius: '5px' }} />

// 						<div style={{ marginTop: '20px' }}></div>
// 						<h3>Sepio Credentials</h3>
// 						<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
// 							<InputText
// 								type="text"
// 								placeholder="Sepio Endpoint"
// 								value={sepioEndpoint}
// 								onChange={(e) => setSepioEndpoint(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 							<InputText
// 								type="text"
// 								placeholder="Username"
// 								value={sepioUsername}
// 								onChange={(e) => setSepioUsername(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 							<InputText
// 								type="password"
// 								placeholder="Password"
// 								value={sepioPassword}
// 								onChange={(e) => setSepioPassword(e.target.value)}
// 								style={{ marginBottom: '10px', width: inputWidth }}
// 							/>
// 						</div>
// 						<Button label="Test Connection" icon="pi pi-check" onClick={testSepioConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', width: '35%', borderRadius: '5px' }} />
// 					</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }











import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Sidebar } from "react-pro-sidebar";
import { Menu, MenuItem } from '@mui/material';
import { RiDashboardLine } from 'react-icons/ri';
import { Toast } from 'primereact/toast';
import { CSidebarNav, CNavItem } from '@coreui/react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import axios from 'axios';

export default function Layout({ icon_username }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [sepioEndpoint, setSepioEndpoint] = useState('');
  const [sepioUsername, setSepioUsername] = useState('');
  const [sepioPassword, setSepioPassword] = useState('');
  const [sepioMessage, setSepioMessage] = useState('');
  const [serviceNowInstance, setServiceNowInstance] = useState('');
  const [inputWidth, setInputWidth] = useState('100%');
  const toast = React.useRef(null);

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userPrivileges, setUserPrivileges] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dropDown, setDropDown] = useState(null);
  const [marginLeft, setMarginLeft] = useState('auto');
  const open = Boolean(dropDown);
  const handleResizes = () => {
	const windowWidth = window.innerWidth;
	if (windowWidth <= 280) {
		setMarginLeft('0px'); // Move to the right on smaller screens
	} else if (windowWidth <= 1580) {

		setMarginLeft('-450px'); // Move to the right on medium screens
	} else {
		setInputWidth('100%'); // Default width for larger screens
		setMarginLeft('auto'); // Center align on larger screens
	}
};


useEffect(() => {
	window.addEventListener('resize', handleResizes);
	handleResizes();

	return () => {
		window.removeEventListener('resize', handleResizes);
	};
}, []);

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
          }, 100);
        })
        .catch(error => {
          console.error('Error fetching the privilege', error);
          setIsLoading(false);
        });
    }
  }, [icon_username]);

  const location = useLocation();

  const fetchData = async () => {
	try {
		const snResponse = await axios.get('/get-source');
		setServiceNowInstance(snResponse.data.serviceNowInstance);
		setUsername(snResponse.data.username);
		setPassword(snResponse.data.password);

		const sepioResponse = await axios.get('/get-sepio-source');
		setSepioEndpoint(sepioResponse.data.sepioEndpoint);
		setSepioUsername(sepioResponse.data.sepioUsername);
		setSepioPassword(sepioResponse.data.sepioPassword)

	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

  const showError = (message) => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  };

  const showSuccess = (message) => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
  };

  useEffect(() => {
    fetchData();
  }, [location]);


  const testConnection = async () => {
	try {

		if (serviceNowInstance.indexOf("http") >= 0) {
			showError('Please, provide endpoint without «http(s)://»');
			return;
		}

		const response = await axios.post('/check-connection', {
			serviceNowInstance,
			username,
			password
		});

		if (response.data.success) {
			showSuccess(response.data.message);
		} else {
			showSuccess(response.data.message);
		}
	} catch (error) {
		showError('Connection failed. Please check your credentials and try again.');
	}
};
const testSepioConnection = async () => {
	try {

		if (sepioEndpoint.indexOf("http") >= 0) {
			showError('Please, provide endpoint without «http(s)://»');
			return;
		}

		const response = await axios.post('/check-sepio-connection', {
			sepioEndpoint,
			sepioUsername,
			sepioPassword
		});

		if (response.data.success) {
			showSuccess(response.data.message);
		} else {
			showSuccess(response.data.message);
		}
	} catch (error) {
		showError('Connection failed. Please check your credentials and try again.');
	}
};

  const handleClicks = (event) => {
    setDropDown(event.currentTarget);
  };

  const handleClose = () => {
    setDropDown(null);
  };

  const handelquerytool = () => {
    navigate('/querytool');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toast ref={toast} />
			<AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '1px', zIndex: 1201 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <img alt="logo" style={{ cursor: 'pointer', height: '40px' }} onClick = {handelquerytool} />
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
      <div style={{ display: 'flex', flex: 1, height: '100%' }}>
        <Sidebar className='border-end' collapsed={!sidebarOpen} style={{ backgroundColor: '#FAFAFA', height: '100%' }}>
          <CSidebarNav>
            <CNavItem>
              <NavLink to='/querytool/mac' className='nav-link'>
                <RiDashboardLine className='nav-icon' /> {sidebarOpen && 'MAC'}
              </NavLink>
            </CNavItem>
            <CNavItem>
              <NavLink to='/querytool/settings' className='nav-link'>
                <RiDashboardLine className='nav-icon' /> {sidebarOpen && 'Settings'}
              </NavLink>
              {!isLoading && userPrivileges === 'ADMIN' && (
                <NavLink to='/querytool/createuser' className='nav-link'>
                  <RiDashboardLine className='nav-icon' /> {sidebarOpen && 'Users'}
                </NavLink>
              )}
            </CNavItem>
          </CSidebarNav>
        </Sidebar>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', marginTop: '64px' }}>
          <div style={{ margin: 'auto', width: '70%', maxWidth: '600px', minWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', background: 'linear-gradient(to top ,#9EADB7, #93B8D4)' }}>
            {message && (
              <div style={{ marginBottom: '20px' }}>
                <Message text={message} />
              </div>
            )}
            {sepioMessage && (
              <div style={{ marginBottom: '20px' }}>
                <Message text={sepioMessage} />
              </div>
            )}
            <h3>ServiceNow Credentials</h3>
						<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
							<InputText
								type="text"
								placeholder="ServiceNow Instance"
								value={serviceNowInstance}
								onChange={(e) => setServiceNowInstance(e.target.value)}
								style={{ marginBottom: '10px', width: inputWidth, }}
							/>
							<InputText
								type="text"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								style={{ marginBottom: '10px', width: inputWidth }}
							/>
							<InputText
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								style={{ marginBottom: '10px', width: inputWidth }}
							/>
						</div>
						<Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', marginBottom: '20px', width: '35%', borderRadius: '5px' }} />

						<div style={{ marginTop: '20px' }}></div>
						<h3>Sepio Credentials</h3>
						<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
							<InputText
								type="text"
								placeholder="Sepio Endpoint"
								value={sepioEndpoint}
								onChange={(e) => setSepioEndpoint(e.target.value)}
								style={{ marginBottom: '10px', width: inputWidth }}
							/>
							<InputText
								type="text"
								placeholder="Username"
								value={sepioUsername}
								onChange={(e) => setSepioUsername(e.target.value)}
								style={{ marginBottom: '10px', width: inputWidth }}
							/>
							<InputText
								type="password"
								placeholder="Password"
								value={sepioPassword}
								onChange={(e) => setSepioPassword(e.target.value)}
								style={{ marginBottom: '10px', width: inputWidth }}
							/>
						</div>
						<Button label="Test Connection" icon="pi pi-check" onClick={testSepioConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', width: '35%', borderRadius: '5px' }} />
            </div>
          </div>
        </div>
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
					backgroundColor: 'rgba(255 ,255, 255, 0.8)',
					zIndex: 2000
				}}>


				</div>
			)}
    </div>
  );
}








// import React, { useEffect, useState } from 'react';
// import { AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate, NavLink, useLocation } from 'react-router-dom';
// import { Sidebar } from "react-pro-sidebar";
// import { Menu, MenuItem } from '@mui/material';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { Toast } from 'primereact/toast';
// import { CSidebarNav, CNavItem } from '@coreui/react';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Message } from 'primereact/message';
// import axios from 'axios';

// export default function Layout({ icon_username }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [sepioEndpoint, setSepioEndpoint] = useState('');
//   const [sepioUsername, setSepioUsername] = useState('');
//   const [sepioPassword, setSepioPassword] = useState('');
//   const [sepioMessage, setSepioMessage] = useState('');
//   const [serviceNowInstance, setServiceNowInstance] = useState('');
//   const [inputWidth, setInputWidth] = useState('100%');
//   const toast = React.useRef(null);

//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [userPrivileges, setUserPrivileges] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [dropDown, setDropDown] = useState(null);

//   const handleResize = () => {
//     if (window.innerWidth <= 960) {
//       setSidebarOpen(false);
//     } else {
//       setSidebarOpen(true);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   useEffect(() => {
//     if (icon_username) {
//       fetch(`/api/user/${icon_username}`)
//         .then(response => response.json())
//         .then(data => {
//           setUserPrivileges(data.privileges);
//           setTimeout(() => {
//             setIsLoading(false);
//           }, 100);
//         })
//         .catch(error => {
//           console.error('Error fetching the privilege', error);
//           setIsLoading(false);
//         });
//     }
//   }, [icon_username]);

//   const location = useLocation();

//   const fetchData = async () => {
//     try {
//       const snResponse = await axios.get('/get-source');
//       setServiceNowInstance(snResponse.data.serviceNowInstance);
//       setUsername(snResponse.data.username);
//       setPassword(snResponse.data.password);

//       const sepioResponse = await axios.get('/get-sepio-source');
//       setSepioEndpoint(sepioResponse.data.sepioEndpoint);
//       setSepioUsername(sepioResponse.data.sepioUsername);
//       setSepioPassword(sepioResponse.data.sepioPassword)
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const showError = (message) => {
//     toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
//   };

//   const showSuccess = (message) => {
//     toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [location]);

//   const testConnection = async () => {
//     try {
//       if (serviceNowInstance.indexOf("http") >= 0) {
//         showError('Please, provide endpoint without «http(s)://»');
//         return;
//       }

//       const response = await axios.post('/check-connection', {
//         serviceNowInstance,
//         username,
//         password
//       });

//       if (response.data.success) {
//         showSuccess(response.data.message);
//       } else {
//         showSuccess(response.data.message);
//       }
//     } catch (error) {
//       showError('Connection failed. Please check your credentials and try again.');
//     }
//   };

//   const testSepioConnection = async () => {
//     try {
//       if (sepioEndpoint.indexOf("http") >= 0) {
//         showError('Please, provide endpoint without «http(s)://»');
//         return;
//       }

//       const response = await axios.post('/check-sepio-connection', {
//         sepioEndpoint,
//         sepioUsername,
//         sepioPassword
//       });

//       if (response.data.success) {
//         showSuccess(response.data.message);
//       } else {
//         showSuccess(response.data.message);
//       }
//     } catch (error) {
//       showError('Connection failed. Please check your credentials and try again.');
//     }
//   };

//   const handleClicks = (event) => {
//     setDropDown(event.currentTarget);
//   };

//   const handleClose = () => {
//     setDropDown(null);
//   };

//   const handelquerytool = () => {
//     navigate('/querytool');
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <Toast ref={toast} />
//       <AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000000', zIndex: 1201 }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
//             <MenuIcon />
//           </IconButton>
//           <IconButton edge="start" color="inherit" aria-label="logo">
//             <img alt="logo" style={{ cursor: 'pointer', height: '40px' }} src={SepioLogo} onClick={handelquerytool} />
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
//             onClick={handleClicks}
//           >
//             <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <div style={{ display: 'flex', flex: 1, height: '100%' }}>
//         <Sidebar className='border-end' collapsed={!sidebarOpen} style={{ backgroundColor: '#FAFAFA', height: '100%' }}>
//           <CSidebarNav>
//             <CNavItem>
//               <NavLink to='/querytool/mac' className='nav-link'>
//                 <RiDashboardLine className='nav-icon' /> {sidebarOpen && 'MAC'}
//               </NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/settings' className='nav-link'>
//                 <RiDashboardLine className='nav-icon' /> {sidebarOpen && 'Settings'}
//               </NavLink>
//               {!isLoading && userPrivileges === 'ADMIN' && (
//                 <NavLink to='/querytool/createuser' className='nav-link'>
//                   <RiDashboardLine className='nav-icon' /> {sidebarOpen && 'Users'}
//                 </NavLink>
//               )}
//             </CNavItem>
//           </CSidebarNav>
//         </Sidebar>
//         <div style={{ flex: 1, padding: '20px', overflowY: 'auto', marginTop: '64px' }}>
//           <div style={{ margin: 'auto', width: '70%', maxWidth: '600px', minWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', background: 'linear-gradient(to top ,#9EADB7, #93B8D4)' }}>
//             {message && (
//               <div style={{ marginBottom: '20px' }}>
//                 <Message text={message} />
//               </div>
//             )}
//             {sepioMessage && (
//               <div style={{ marginBottom: '20px' }}>
//                 <Message text={sepioMessage} />
//               </div>
//             )}
//             <h3>ServiceNow Credentials</h3>
//             <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
//               <InputText
//                 type="text"
//                 value={serviceNowInstance}
//                 placeholder="ServiceNow Instance"
//                 style={{ marginBottom: '10px', width: inputWidth }}
//                 onChange={(e) => setServiceNowInstance(e.target.value)}
//               />
//               <InputText
//                 type="text"
//                 value={username}
//                 placeholder="Username"
//                 style={{ marginBottom: '10px', width: inputWidth }}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <InputText
//                 type="password"
//                 value={password}
//                 placeholder="Password"
//                 style={{ marginBottom: '10px', width: inputWidth }}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button label="Test Connection" onClick={testConnection} />
//             </div>
//             <h3>Sepio Credentials</h3>
//             <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
//               <InputText
//                 type="text"
//                 value={sepioEndpoint}
//                 placeholder="Sepio Endpoint"
//                 style={{ marginBottom: '10px', width: inputWidth }}
//                 onChange={(e) => setSepioEndpoint(e.target.value)}
//               />
//               <InputText
//                 type="text"
//                 value={sepioUsername}
//                 placeholder="Sepio Username"
//                 style={{ marginBottom: '10px', width: inputWidth }}
//                 onChange={(e) => setSepioUsername(e.target.value)}
//               />
//               <InputText
//                 type="password"
//                 value={sepioPassword}
//                 placeholder="Sepio Password"
//                 style={{ marginBottom: '10px', width: inputWidth }}
//                 onChange={(e) => setSepioPassword(e.target.value)}
//               />
//               <Button label="Test Connection" onClick={testSepioConnection} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
