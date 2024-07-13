import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import Login from './components/Login';
import FA from './components/FA';
import RootView from './components/RootView';
import SignUp from './components/SignUp';
import MAC from './components/MAC';
import Settings from './components/Settings';
import LoginPassword from './components/LoginPassword';
import CreateUser from './components/CreateUser';
import Submit from './components/Submit';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';           // Core CSS
import 'primeicons/primeicons.css';
import '@coreui/coreui/dist/css/coreui.min.css';

function App() {
  const [icon_username, setUsername] = useLocalStorage('');
  const [userPrivileges, setUserPrivileges] = useState(null);
  console.log(userPrivileges);

  useEffect(() => {
    if (icon_username) {
      fetch(`/api/user/${icon_username}`)
        .then(response => response.json())
        .then(data => {
          setUserPrivileges(data.privileges); // Assuming the privileges are returned as data.privileges
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [icon_username]);

  return (
    <Router>
      <section className='sepio'>
        <div className="App">
          <Routes>
            <Route path='/' element={<Login setUsername={setUsername} />} />
          
           {(userPrivileges === 'ADMIN' || userPrivileges === 'UI_USER') && (
            <Route path='/querypassword' element={<SignUp />} />
          )}
          
          {(userPrivileges === 'ADMIN' || userPrivileges === 'UI_USER')&& (
            <Route path='/2fa' element={<FA />} />
          )}


            {(userPrivileges === 'ADMIN' || userPrivileges === 'UI_USER') &&(
            <Route path='/querytool' element={<RootView icon_username={icon_username} />} />
          )}
          {(userPrivileges === 'ADMIN' || userPrivileges === 'UI_USER') &&(
            <Route path='/querytool/mac' element={<MAC icon_username={icon_username} />} />
          )}
          {(userPrivileges === 'ADMIN' || userPrivileges === 'UI_USER') &&(
            <Route path='/querytool/settings' element={<Settings icon_username={icon_username}
             />} />
            )}
            {userPrivileges === 'ADMIN' && (
              <Route path='/querytool/createuser' element={<CreateUser icon_username={icon_username} />} />           
            )}
            {userPrivileges === 'ADMIN' &&(
            <Route path='/querytool/usersubmit' element={<Submit icon_username={icon_username} />} />
          )}
          </Routes>
        </div>
      </section>
    </Router>
  );
}

export default App;














// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useLocalStorage } from './hooks/useLocalStorage';
// import Login from './components/Login';
// import FA from './components/FA';
// import RootView from './components/RootView';
// import SignUp from './components/SignUp';
// import MAC from './components/MAC';
// import Settings from './components/Settings';
// import LoginPassword from './components/LoginPassword';
// import CreateUser from './components/CreateUser';
// import Submit from './components/Submit';
// import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
// import 'primereact/resources/primereact.min.css';           // Core CSS
// import 'primeicons/primeicons.css';
// import '@coreui/coreui/dist/css/coreui.min.css';

// function App() {
//   const [icon_username, setUsername] = useLocalStorage('');
//   const [userPrivileges, setUserPrivileges] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (icon_username) {
//       fetch(`/api/user/${icon_username}`)
//         .then(response => response.json())
//         .then(data => {
//           setUserPrivileges(data.privileges); // Assuming the privileges are returned as data.privileges
//           setIsAuthenticated(true); // Assuming successful fetch means user is authenticated
//           setIsLoading(false); // Loading is complete
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//           setIsAuthenticated(false);
//           setIsLoading(false); // Loading is complete
//         });
//     } else {
//       setIsAuthenticated(false);
//       setIsLoading(false); // Loading is complete
//     }
//   }, [icon_username]);

//   const PrivateRoute = ({ element }) => {
//     if (isLoading) return null; // or a loading spinner
//     return isAuthenticated ? element : <Navigate to="/" />;
//   };

//   const AdminRoute = ({ element }) => {
//     if (isLoading) return null; // or a loading spinner
//     return userPrivileges === 'ADMIN' ? element : <Navigate to="/" />;
//   };

//   return (
//     <Router>
//       <section className='sepio'>
//         <div className="App">
//           <Routes>
//             <Route path='/' element={<Login setUsername={setUsername} />} />
//             <Route path='/querypassword' element={<SignUp />} />
//             <Route path='/checkpassword' element={<LoginPassword setUsername={setUsername} />} />
//             <Route path='/2fa' element={<FA />} />
//             <Route path='/querytool' element={<PrivateRoute element={<RootView icon_username={icon_username} />} />} />
//             <Route path='/querytool/mac' element={<PrivateRoute element={<MAC icon_username={icon_username} />} />} />
//             <Route path='/querytool/settings' element={<PrivateRoute element={<Settings icon_username={icon_username} />} />} />
//             <Route path='/querytool/createuser' element={<AdminRoute element={<CreateUser icon_username={icon_username} />} />} />
//             <Route path='/querytool/usersubmit' element={<PrivateRoute element={<Submit icon_username={icon_username} />} />} />
//           </Routes>
//         </div>
//       </section>
//     </Router>
//   );
// }

// export default App;
