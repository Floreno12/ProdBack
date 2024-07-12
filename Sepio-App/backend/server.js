





// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const path = require('path');
// const cors = require('cors');
// const speakeasy = require('speakeasy');
// const qrcode = require('qrcode');
// const session = require('express-session');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const app = express();

// const PORT = process.env.PORT || 3000;
// //
// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use(session({
//   secret: 'your_secret_key',  // Change this to a strong secret key
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }  // Set to true if using HTTPS
// }));

// // Log incoming requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request for ${req.url}`);
//   next();
// });


// app.get('/user/all', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     console.log('Error fetching users:', error);
//     res.status(500).json({ success: false, message: 'Error fetching users' });
//   }
// });



// app.post('/user/privileges', async (req, res) => {
//   const { username, password, privileges, serviceNowInstance, serviceUsername, servicePassword, sepioEndpoint, sepioUsername, sepioPassword } = req.body;
//   console.log(`Check user: ${username}`);

//   try {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = await prisma.user.create({
//       data: {
//         name: username,
//         password: hashedPassword,
//         otp_secret: '',
//         otp_verified: false,
//         privileges: privileges,
//         serviceNowInstance: serviceNowInstance || null,
//         serviceUsername: serviceUsername || null,
//         servicePassword: servicePassword || null,
//         sepioEndpoint: sepioEndpoint || null,
//         sepioUsername: sepioUsername || null,
//         sepioPassword: sepioPassword ||null
//       },
//     });
//     console.log('User created successfully', newUser);
//     res.json({ success: true });
//   } catch (error) {
//     console.log('Error', error);
//     res.status(500).json({ success: false, message: 'Error' });
//   }
// });



// app.post('/update-password', async (req, res) => {
//   const { password } = req.body;
//   const username = req.session.username;

//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'Username and password are required' });
//   }

//   try {
//     const user = await prisma.user.findUnique({ where: { name: username } });

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const updatedUser = await prisma.user.update({
//       where: { name: username },
//       data: {
//         password: hashedPassword,
//         credentialsUpdated: true,
//       },
//     });

//     res.json({ success: true, credentialsUpdated: updatedUser.credentialsUpdated });
//   } catch (error) {
//     console.error('Error updating password for user:', error);
//     res.status(500).json({ success: false, message: 'Error updating password for user' });
//   }
// });



// app.post('/reset-credentials-updated', async (req, res) => {
//   const username = req.session.username;

//   if (!username) {
//     return res.status(400).json({ success: false, message: 'Username is required' });
//   }

//   try {
//     await prisma.user.update({
//       where: { name: username },
//       data: { credentialsUpdated: false },
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.error('Error resetting credentials updated status for user:', error);
//     res.status(500).json({ success: false, message: 'Error resetting credentials updated status' });
//   }
// });



// app.post('/authenticate', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({ where: { name: username } });

//     if (!user || (user.privileges !== 'ADMIN' && user.privileges !== 'UI_USER')) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     req.session.username = username;

//     if (!user.credentialsUpdated) {
//       return res.json({ credentialsUpdated: false });
//     }

//     // Handle OTP logic as required...

//     res.json({ otpRequired: user.otp_verified, credentialsUpdated: true });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Database error' });
//   }
// });



// app.get('/api/user/:username', async (req, res) => {
//   const { username } = req.params;
  
//   try {
//     const user = await prisma.user.findUnique({
//       where: { name: username },
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ privileges: user.privileges });
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ message: 'Database error' });
//   }
// });



// app.post('/verify', async (req, res) => {
//   const { username, token } = req.body;
//   console.log(`Verifying token for user: ${username}`);

//   try {
//     const user = await prisma.user.findUnique({
//       where: { name: username },
//     });

//     if (!user || !user.otp_secret) {
//       console.log(`User ${username} not set up for 2FA`);
//       return res.status(400).json({ verified: false, message: 'User not set up for 2FA' });
//     }

//     const verified = speakeasy.totp.verify({
//       secret: user.otp_secret,
//       encoding: 'base32',
//       token: token.trim(),
//       window: 5,
//     });

//     // Verified connection with Google Authenticator 
//     if (verified) {
//       console.log(`Token verified for user: ${username}`);
//       await prisma.user.update({
//         where: { name: username },
//         data: { otp_verified: true },
//       });
//       res.json({ verified: true });
//     } else {
//       console.log(`Invalid token for user: ${username}`);
//       res.json({ verified: false, message: 'Invalid token' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Database error' });
//   }
// });

// // Routes
// let serviceNowCredentials = {};
// let sepioCredentials = {};

// app.get('/get-source', async (req, res) => {

//   console.log("we are here > /get-source + " + serviceNowCredentials.toString());

//   res.json(serviceNowCredentials);
// });

// app.get('/get-sepio-source', async (req, res) => {

//   console.log("we are here > /get-sepio-source + " + sepioCredentials.toString());

//   res.json(sepioCredentials);
// });




// app.post('/check-connection', async (req, res) => {
//   const { serviceNowInstance, username, password } = req.body;
//   serviceNowCredentials = {serviceNowInstance, username, password};

//   try {
//     const response = await axios.get(`https://${serviceNowInstance}/api/now/table/incident`, {
//       auth: {
//         username,
//         password
//       }
//     });

//     if (response.status === 200) {
//       try {
//         console.log('Creating new record in ServiceNowCredentials:', { instance: serviceNowInstance, username, password });

//         const newRecord = await prisma.serviceNowCredentials.create({
//           data: {
//             instance: serviceNowInstance,
//             username,
//             password
//           }
//         });

//         console.log('New record created:', newRecord);
//         res.json({ success: true, message: 'Connection successful' });
//       } catch (dbError) {
//         console.error('Database error:', dbError);
//         res.status(500).json({ success: false, message: 'Failed to save credentials to the database' });
//       }
//     } else {
//       res.status(response.status).json({ success: false, message: 'Connection failed' });
//     }
//   } catch (error) {
//     console.error('API error:', error);
//     if (error.response && error.response.status === 401) {
//       res.status(401).json({ success: false, message: 'Authentication failed: Invalid username or password' });
//     } else if (error.response && error.response.status === 404) {
//       res.status(404).json({ success: false, message: 'ServiceNow connection failed: Invalid instance.' });
//     } else {
//       res.status(500).json({ success: false, message: 'Connection failed' });
//     }
//   }
// });






// app.post('/check-sepio-connection', async (req, res) => {
// 	const { sepioEndpoint, sepioUsername, sepioPassword } = req.body;
// 	sepioCredentials = { sepioEndpoint, sepioUsername, sepioPassword };
	
// 	// Ensure all fields are provided
// 	if (!sepioEndpoint || !sepioUsername || !sepioPassword) {
// 	  return res.status(400).json({ success: false, message: 'All fields are required!' });
// 	}
  
// 	// Validate if the endpoint is for Sepio (you can add more specific checks here)
// 	if (!sepioEndpoint.includes('sepio')) {
// 	  return res.status(400).json({ success: false, message: 'Invalid Sepio endpoint!' });
// 	}
  
// 	const requestBody = {
// 	  username: sepioUsername,
// 	  password: sepioPassword
// 	};
  
// 	const config = {
// 	  headers: {
// 		'Content-Type': 'application/json',
// 	  }
// 	};
  
// 	try {
// 	  const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);
	  
// 	  if (response.status === 200) {
// 		try {
// 		  const newRecord = await prisma.sepio.create({
// 			data: {
// 			  instance: sepioEndpoint,
// 			  username: sepioUsername,
// 			  password: sepioPassword
// 			}
// 		  });
  
// 		  console.log('New record created:', newRecord);
// 		  res.json({ success: true, message: 'Connection successful!' });
// 		} catch (dbError) {
// 		  console.error('Database error:', dbError);
// 		  res.status(500).json({ success: false, message: 'Failed to save credentials to the database' });
// 		}
// 	  } else {
// 		res.status(500).json({ success: false, message: 'Connection failed!' });
// 	  }
// 	} catch (error) {
// 	  console.error('API error:', error);
// 	  res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
// 	}
//   });


// const getMacAddresses = async (macAddress, serviceNowInstance, snUsername, snPassword) => {

//   console.log(macAddress);

//   console.log(serviceNowInstance + " # " + snUsername + " # " + snPassword);

//   if (!snUsername && !snPassword && !serviceNowInstance) {
//     return { "error": "Please, provide valid ServiceNow credentials" };
//   }

//   const auth = Buffer.from(`${snUsername}:${snPassword}`).toString('base64');

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + auth
//     }
//   };

//   try {
//     let snQueryParms = [];
//     let searchQuery = "";

//     macAddress.map(singleMAC => snQueryParms.push("mac_addressLIKE" + singleMAC));

//     searchQuery = snQueryParms.join("%5EOR");

//     let endpoint = `https://${serviceNowInstance}/api/now/table/cmdb_ci?sysparm_query=GOTO${searchQuery}&sysparm_fields=mac_address%2Csys_class_name%2Csys_id`;

//     console.log(`endpoint > ${endpoint}`);

//     const response = await axios.get(endpoint, config);

//     console.log("foo 1 ");

//     const queryResults = response.data.result;

//     console.log("foo 2 ");

//     if (response.status === 200) {

//       const queryResults = response.data.result;

//       console.log('Filtered MAC addresses:', queryResults);

//       return queryResults;

//     } else {
//       console.log('Filtered MAC addresses status:' + response.status);
//       res.status(500).json({ success: false, message: 'Connection failed!' });
//     }
//   } catch (error) {
//     console.error('Error fetching MAC addresses:', error);
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//     return [];
//   }
// };

// const getSepioToken = async (snEndpoint, snUsername, snPassword) => {

//   console.log("Started sepio token retrieving process");

//   var requestBody = {
//     "username": snUsername,
//     "password": snPassword
//   };

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   };

//   try {
//     const response = await axios.post(`https://${snEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//     console.log(response.data.token);

//     if (response.status === 200) {
//       console.log('Successfully got token from Sepio: ' + response.data.token);
//       return response.data.token;
//     } else {
//       console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
//       throw error;
//     }

//   } catch (error) {
//     console.error('Error getting token from Sepio: ', error);
//     throw error;
//   }
// };

// const addTagsToSepioElements = async (sepioToken, snEndpoint, filteredMacs, mac) => {

//   try {
//     let tagsList = [];

//     if (filteredMacs.length > 0) {
//       tagsList = filteredMacs.map(result => (result.sys_class_name));
//       tagsList.push("in_cmdb");
//     } else {
//       tagsList.push("NOT_INCMDB");
//     }
//     console.log("An attemt to add tags to Sepio elements");

//     let requestBody = {
//       "tagNames": tagsList,
//       "elementKeys": [mac],
//       "function": 0,
//       "processChildren": false
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + sepioToken
//       }
//     };

//     const response = await axios.post(`https://${snEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

//     if (response.status === 200) {

//       console.log("Adding tags process to element: " + mac + " is success!");

//       return response;
//     } else {
//       console.error("Adding tags process to element: " + mac + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
//     }
//   } catch (ex) {
//     console.error('Error adding tags to Sepio elements:', error);
//     throw error;
//   }
// };





// app.post('/api/check-mac', async (req, res) => {
//   const { login, password, macAddress } = req.body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { name: login },
//     });

//     if (!user || !await bcrypt.compare(password, user.password) || (user.privileges !== 'SERVICE_ACCOUNT' && user.privileges !== 'ADMIN')) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     const snEndpoint = user.serviceNowInstance || req.body.snEndpoint || "";
//     const snUsername = user.serviceUsername || req.body.snLogin || "";
//     const snPassword = user.servicePassword || req.body.snPassword || "";

//     const sepioEndpoint = user.sepioEndpoint || req.body.sepioEndpoint || "";
//     const sepioUsername = user.sepioUsername || req.body.sepioUsername || "";
//     const sepioPassword = user.sepioPassword || req.body.sepioPassword || "";

//     console.log('Sepio Credentials:', { sepioEndpoint, sepioUsername, sepioPassword });

//     const macAddresses = req.body.macAddress ? req.body.macAddress : [];

//     const isClientFormatRequired = req.body.isClientFormatRequired ? req.body.isClientFormatRequired : false;

//     console.log('Received MAC addresses: ' + macAddresses);

//     if (snEndpoint && snUsername && snPassword) {
//       const macCheckResult = await getMacAddresses(macAddresses, snEndpoint, snUsername, snPassword);
//       console.log('MAC check result: ' + macCheckResult);

//       if (Array.isArray(macCheckResult)) {
//         let responseForClientSide = [];
//         let foundMacAddresses = [];
//         let notFoundMacAddresses = [];

//         for (const singleMac of macAddresses) {
//           const matchingResults = macCheckResult.filter(macCheckResult => macCheckResult.mac_address === singleMac && macCheckResult.sys_class_name.indexOf("cmdb_ci") >= 0);

//           if (sepioEndpoint && sepioUsername && sepioPassword) {
//             const sepioToken = await getSepioToken(sepioEndpoint, sepioUsername, sepioPassword);

//             if (sepioToken) {
//               const responseSepio = await addTagsToSepioElements(sepioToken, sepioEndpoint, matchingResults, singleMac);
//             } else {
//               return res.status(500).json({
//                 success: false,
//                 error: "An attempt to get a token from Sepio failed"
//               });
//             }
//           }

//           let macAndTables = { "macAddress": "", "tables": [] };

//           if (isClientFormatRequired) {
//             if (matchingResults.length > 0) {
//               macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
//               macAndTables.tables = matchingResults.map(result => (result.sys_class_name));
//             } else {
//               macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
//             }
//             responseForClientSide.push(macAndTables);
//           } else {
//             if (matchingResults.length > 0) {
//               macAndTables.macAddress = singleMac;
//               macAndTables.tables = matchingResults.map(result => ({
//                 table: result.sys_class_name,
//                 sys_id: result.sys_id
//               }));
//               foundMacAddresses.push(macAndTables);
//             } else {
//               notFoundMacAddresses.push(singleMac);
//             }
//           }
//         }

//         console.log("responseForClientSide > " + responseForClientSide);
//         let reqdResponse = isClientFormatRequired ? responseForClientSide : { success: true, foundMacAddresses, notFoundMacAddresses };
//         res.json(reqdResponse);
//       } else {
//         res.status(500).json({
//           success: false,
//           error: "Unsupported data from ServiceNow instance. It should be 'array'"
//         });
//       }
//     } else {
//       res.status(401).json({
//         success: false,
//         error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check your login / password / endpoint"
//       });
//     }
//   } catch (error) {
//     console.log('Error', error);
//     res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
//   }
// });






// app.post('/api/mac', async (req, res) => {

//   try {
//     const requestLogin = req.body.requestLogin ? req.body.requestLogin : "";
//     const requestPassword = req.body.requestPassword ? req.body.requestPassword : "";

//     if (true) {

//       const snEndpoint = serviceNowCredentials.serviceNowInstance ? serviceNowCredentials.serviceNowInstance : req.body.snEndpoint ? req.body.snEndpoint : "";
//       const snUsername = serviceNowCredentials.username ? serviceNowCredentials.username : req.body.snLogin ? req.body.snLogin : "";
//       const snPassword = serviceNowCredentials.password ? serviceNowCredentials.password : req.body.snPassword ? req.body.snPassword : "";

//       const sepioEndpoint = sepioCredentials.sepioEndpoint ? sepioCredentials.sepioEndpoint : req.body.sepioEndpoint ? req.body.sepioEndpoint : "";
//       const sepioUsername = sepioCredentials.sepioUsername ? sepioCredentials.sepioUsername : req.body.sepioUsername ? req.body.sepioUsername : "";
//       const sepioPassword = sepioCredentials.sepioPassword ? sepioCredentials.sepioPassword : req.body.sepioPassword ? req.body.sepioPassword : "";

//       const macAddress = req.body.macAddress ? req.body.macAddress : [];

//       const isClientFormatRequired = req.body.isClientFormatRequired ? req.body.isClientFormatRequired : false;

//       console.log('Received MAC addresses: ' + macAddress);

//       if (snEndpoint && snUsername && snPassword) {

//         const macCheckResult = await getMacAddresses(macAddress, snEndpoint, snUsername, snPassword);

//         console.log('MAC check result: ' + macCheckResult);

//         if (Array.isArray(macCheckResult)) {

//           let responceForClientSide = [];
//           let foundMacAddresses = [];
//           let notFoundMacAddresses = [];

//           for (const singleMac of macAddress) {

//             const matchingResults = macCheckResult.filter(macCheckResult => macCheckResult.mac_address === singleMac && macCheckResult.sys_class_name.indexOf("cmdb_ci") >= 0);

//             if (sepioEndpoint && sepioUsername && sepioPassword) {
      
//               const sepioToken = await getSepioToken(sepioEndpoint, sepioUsername, sepioPassword);

//               if (sepioToken) {
//                 const responceSepio = await addTagsToSepioElements(sepioToken, sepioEndpoint, matchingResults, singleMac);
//               } else {
//                 res.status(500).json({
//                   success: false,
//                   error: "An attempt to get a token from Sepio failed"
//                 });
//               }
//             }

//             let macAndTables = { "macAddress": "", "tables": [] };

//             if (isClientFormatRequired) {

//               if (matchingResults.length > 0) {
//                 macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
//                 macAndTables.tables = matchingResults.map(result => (result.sys_class_name));
//               } else {
//                 macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
//               }
//               responceForClientSide.push(macAndTables);

//             } else {
//               if (matchingResults.length > 0) {
//                 macAndTables.macAddress = singleMac;
//                 macAndTables.tables = matchingResults.map(result => ({
//                   table: result.sys_class_name,
//                   sys_id: result.sys_id
//                 }));
//                 foundMacAddresses.push(macAndTables);
//               } else {
//                 notFoundMacAddresses.push(singleMac);
//               }
//             }
//           }
//           console.log("responceForClientSide > " + responceForClientSide);
//           let reqdRespons = isClientFormatRequired ? responceForClientSide : { success: true, foundMacAddresses, notFoundMacAddresses }
//           res.json(reqdRespons);
//         } else {
//           res.status(500).json({
//             success: false,
//             error: "Unsupported data from ServiceNow instance. It should be 'array'"
//           });
//         }
//       } else {
//         res.status(500).json({
//           success: false,
//           error: macCheckResult.error
//         });
//       }
//     } else {
//       res.status(401).json({
//         success: false,
//         error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check you login / password / endpoint"
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
//   }
// });


// app.use(express.static(path.join(__dirname, '../front-end/build')));

// // Serve React app for any other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// module.exports = {
//   getMacAddresses,
//   getSepioToken,
//   addTagsToSepioElements,
// };











































































// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const path = require('path');
// const cors = require('cors');
// const speakeasy = require('speakeasy');
// const qrcode = require('qrcode');
// const session = require('express-session');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const app = express();

// const PORT = process.env.PORT || 3000;
// //
// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use(session({
//   secret: 'your_secret_key',  // Change this to a strong secret key
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }  // Set to true if using HTTPS
// }));

// // Log incoming requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request for ${req.url}`);
//   next();
// });


// app.get('/user/all', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     console.log('Error fetching users:', error);
//     res.status(500).json({ success: false, message: 'Error fetching users' });
//   }
// });



// app.post('/user/privileges', async (req, res) => {
//   const { username, password, privileges, serviceNowInstance, serviceUsername, servicePassword, sepioEndpoint, sepioUsername, sepioPassword } = req.body;
//   console.log(`Check user: ${username}`);

//   try {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = await prisma.user.create({
//       data: {
//         name: username,
//         password: hashedPassword,
//         otp_secret: '',
//         otp_verified: false,
//         privileges: privileges,
//         serviceNowInstance: serviceNowInstance || null,
//         serviceUsername: serviceUsername || null,
//         servicePassword: servicePassword || null,
//         sepioEndpoint: sepioEndpoint || null,
//         sepioUsername: sepioUsername || null,
//         sepioPassword: sepioPassword ||null
//       },
//     });
//     console.log('User created successfully', newUser);
//     res.json({ success: true });
//   } catch (error) {
//     console.log('Error', error);
//     res.status(500).json({ success: false, message: 'Error' });
//   }
// });



// app.post('/update-password', async (req, res) => {
//   const { password } = req.body;
//   const username = req.session.username;

//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'Username and password are required' });
//   }

//   try {
//     const user = await prisma.user.findUnique({ where: { name: username } });

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const updatedUser = await prisma.user.update({
//       where: { name: username },
//       data: {
//         password: hashedPassword,
//         credentialsUpdated: true,
//       },
//     });

//     res.json({ success: true, credentialsUpdated: updatedUser.credentialsUpdated });
//   } catch (error) {
//     console.error('Error updating password for user:', error);
//     res.status(500).json({ success: false, message: 'Error updating password for user' });
//   }
// });



// app.post('/reset-credentials-updated', async (req, res) => {
//   const username = req.session.username;

//   if (!username) {
//     return res.status(400).json({ success: false, message: 'Username is required' });
//   }

//   try {
//     await prisma.user.update({
//       where: { name: username },
//       data: { credentialsUpdated: false },
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.error('Error resetting credentials updated status for user:', error);
//     res.status(500).json({ success: false, message: 'Error resetting credentials updated status' });
//   }
// });



// app.post('/authenticate', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({ where: { name: username } });

//     if (!user || (user.privileges !== 'ADMIN' && user.privileges !== 'UI_USER')) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     req.session.username = username;

//     if (!user.credentialsUpdated) {
//       return res.json({ credentialsUpdated: false });
//     }


//     if (user.otp_verified) {
//       console.log(`User ${username} has completed OTP setup`);
//       return res.json({ otpRequired: true, credentialsUpdated: true });
//     } else {
//       console.log(`User ${username} has not completed OTP setup, generating secret`);
//       const secret = speakeasy.generateSecret({ length: 20 });
//       console.log(`Generated secret for user ${username}: ${secret.base32}`);

//       const otpauth_url = speakeasy.otpauthURL({
//         secret: secret.base32,
//         label: encodeURIComponent(username),
//         issuer: 'YourApp',
//         encoding: 'base32',
//       });

//       // Store secret in db
//       await prisma.user.update({
//         where: { name: username },
//         data: { otp_secret: secret.base32 },
//       });

//       // Generate QR code for 2FA Authentication
//       qrcode.toDataURL(otpauth_url, (err, data_url) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({ message: 'QR code generation failed' });
//         }
//         console.log(`Generated QR code for user ${username}`);
//         res.json({ otpRequired: true, qrCode: data_url, secret: secret.base32, credentialsUpdated: true });
//       });
//     }

//     // res.json({ otpRequired: user.otp_verified, credentialsUpdated: true });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Database error' });
//   }
// });



// app.get('/api/user/:username', async (req, res) => {
//   const { username } = req.params;
  
//   try {
//     const user = await prisma.user.findUnique({
//       where: { name: username },
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ privileges: user.privileges });
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ message: 'Database error' });
//   }
// });



// app.post('/verify', async (req, res) => {
//   const { username, token } = req.body;
//   console.log(`Verifying token for user: ${username}`);

//   try {
//     const user = await prisma.user.findUnique({
//       where: { name: username },
//     });

//     if (!user || !user.otp_secret) {
//       console.log(`User ${username} not set up for 2FA`);
//       return res.status(400).json({ verified: false, message: 'User not set up for 2FA' });
//     }

//     const verified = speakeasy.totp.verify({
//       secret: user.otp_secret,
//       encoding: 'base32',
//       token: token.trim(),
//       window: 5,
//     });

//     // Verified connection with Google Authenticator 
//     if (verified) {
//       console.log(`Token verified for user: ${username}`);
//       await prisma.user.update({
//         where: { name: username },
//         data: { otp_verified: true },
//       });
//       res.json({ verified: true });
//     } else {
//       console.log(`Invalid token for user: ${username}`);
//       res.json({ verified: false, message: 'Invalid token' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Database error' });
//   }
// });

// // Routes
// let serviceNowCredentials = {};
// let sepioCredentials = {};

// app.get('/get-source', async (req, res) => {

//   console.log("we are here > /get-source + " + serviceNowCredentials.toString());

//   res.json(serviceNowCredentials);
// });

// app.get('/get-sepio-source', async (req, res) => {

//   console.log("we are here > /get-sepio-source + " + sepioCredentials.toString());

//   res.json(sepioCredentials);
// });




// app.post('/check-connection', async (req, res) => {
//   const { serviceNowInstance, username, password } = req.body;
//   serviceNowCredentials = {serviceNowInstance, username, password};

//   try {
//     const response = await axios.get(`https://${serviceNowInstance}/api/now/table/incident`, {
//       auth: {
//         username,
//         password
//       }
//     });

//     if (response.status === 200) {
//       try {
//         console.log('Creating new record in ServiceNowCredentials:', { instance: serviceNowInstance, username, password });

//         const newRecord = await prisma.serviceNowCredentials.create({
//           data: {
//             instance: serviceNowInstance,
//             username,
//             password
//           }
//         });

//         console.log('New record created:', newRecord);
//         res.json({ success: true, message: 'Connection successful' });
//       } catch (dbError) {
//         console.error('Database error:', dbError);
//         res.status(500).json({ success: false, message: 'Failed to save credentials to the database' });
//       }
//     } else {
//       res.status(response.status).json({ success: false, message: 'Connection failed' });
//     }
//   } catch (error) {
//     console.error('API error:', error);
//     if (error.response && error.response.status === 401) {
//       res.status(401).json({ success: false, message: 'Authentication failed: Invalid username or password' });
//     } else if (error.response && error.response.status === 404) {
//       res.status(404).json({ success: false, message: 'ServiceNow connection failed: Invalid instance.' });
//     } else {
//       res.status(500).json({ success: false, message: 'Connection failed' });
//     }
//   }
// });






// app.post('/check-sepio-connection', async (req, res) => {
// 	const { sepioEndpoint, sepioUsername, sepioPassword } = req.body;
// 	sepioCredentials = { sepioEndpoint, sepioUsername, sepioPassword };
	
// 	// Ensure all fields are provided
// 	if (!sepioEndpoint || !sepioUsername || !sepioPassword) {
// 	  return res.status(400).json({ success: false, message: 'All fields are required!' });
// 	}
  
// 	// Validate if the endpoint is for Sepio (you can add more specific checks here)
// 	if (!sepioEndpoint.includes('sepio')) {
// 	  return res.status(400).json({ success: false, message: 'Invalid Sepio endpoint!' });
// 	}
  
// 	const requestBody = {
// 	  username: sepioUsername,
// 	  password: sepioPassword
// 	};
  
// 	const config = {
// 	  headers: {
// 		'Content-Type': 'application/json',
// 	  }
// 	};
  
// 	try {
// 	  const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);
	  
// 	  if (response.status === 200) {
// 		try {
// 		  const newRecord = await prisma.sepio.create({
// 			data: {
// 			  instance: sepioEndpoint,
// 			  username: sepioUsername,
// 			  password: sepioPassword
// 			}
// 		  });
  
// 		  console.log('New record created:', newRecord);
// 		  res.json({ success: true, message: 'Connection successful!' });
// 		} catch (dbError) {
// 		  console.error('Database error:', dbError);
// 		  res.status(500).json({ success: false, message: 'Failed to save credentials to the database' });
// 		}
// 	  } else {
// 		res.status(500).json({ success: false, message: 'Connection failed!' });
// 	  }
// 	} catch (error) {
// 	  console.error('API error:', error);
// 	  res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
// 	}
//   });


// const getMacAddresses = async (macAddress, serviceNowInstance, snUsername, snPassword) => {

//   console.log(macAddress);

//   console.log(serviceNowInstance + " # " + snUsername + " # " + snPassword);

//   if (!snUsername && !snPassword && !serviceNowInstance) {
//     return { "error": "Please, provide valid ServiceNow credentials" };
//   }

//   const auth = Buffer.from(`${snUsername}:${snPassword}`).toString('base64');

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + auth
//     }
//   };

//   try {
//     let snQueryParms = [];
//     let searchQuery = "";

//     macAddress.map(singleMAC => snQueryParms.push("mac_addressLIKE" + singleMAC));

//     searchQuery = snQueryParms.join("%5EOR");

//     let endpoint = `https://${serviceNowInstance}/api/now/table/cmdb_ci?sysparm_query=GOTO${searchQuery}&sysparm_fields=mac_address%2Csys_class_name%2Csys_id`;

//     console.log(`endpoint > ${endpoint}`);

//     const response = await axios.get(endpoint, config);

//     console.log("foo 1 ");

//     const queryResults = response.data.result;

//     console.log("foo 2 ");

//     if (response.status === 200) {

//       const queryResults = response.data.result;

//       console.log('Filtered MAC addresses:', queryResults);

//       return queryResults;

//     } else {
//       console.log('Filtered MAC addresses status:' + response.status);
//       res.status(500).json({ success: false, message: 'Connection failed!' });
//     }
//   } catch (error) {
//     console.error('Error fetching MAC addresses:', error);
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//     return [];
//   }
// };

// const getSepioToken = async (snEndpoint, snUsername, snPassword) => {

//   console.log("Started sepio token retrieving process");

//   var requestBody = {
//     "username": snUsername,
//     "password": snPassword
//   };

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   };

//   try {
//     const response = await axios.post(`https://${snEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//     console.log(response.data.token);

//     if (response.status === 200) {
//       console.log('Successfully got token from Sepio: ' + response.data.token);
//       return response.data.token;
//     } else {
//       console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
//       throw error;
//     }

//   } catch (error) {
//     console.error('Error getting token from Sepio: ', error);
//     throw error;
//   }
// };

// const addTagsToSepioElements = async (sepioToken, snEndpoint, filteredMacs, mac) => {

//   try {
//     let tagsList = [];

//     if (filteredMacs.length > 0) {
//       tagsList = filteredMacs.map(result => (result.sys_class_name));
//       tagsList.push("in_cmdb");
//     } else {
//       tagsList.push("NOT_INCMDB");
//     }
//     console.log("An attemt to add tags to Sepio elements");

//     let requestBody = {
//       "tagNames": tagsList,
//       "elementKeys": [mac],
//       "function": 0,
//       "processChildren": false
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + sepioToken
//       }
//     };

//     const response = await axios.post(`https://${snEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

//     if (response.status === 200) {

//       console.log("Adding tags process to element: " + mac + " is success!");

//       return response;
//     } else {
//       console.error("Adding tags process to element: " + mac + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
//     }
//   } catch (ex) {
//     console.error('Error adding tags to Sepio elements:', error);
//     throw error;
//   }
// };





// app.post('/api/check-mac', async (req, res) => {
//   const { login, password, macAddress } = req.body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { name: login },
//     });

//     if (!user || !await bcrypt.compare(password, user.password) || (user.privileges !== 'SERVICE_ACCOUNT' && user.privileges !== 'ADMIN')) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     const snEndpoint = user.serviceNowInstance || req.body.snEndpoint || "";
//     const snUsername = user.serviceUsername || req.body.snLogin || "";
//     const snPassword = user.servicePassword || req.body.snPassword || "";

//     const sepioEndpoint = user.sepioEndpoint || req.body.sepioEndpoint || "";
//     const sepioUsername = user.sepioUsername || req.body.sepioUsername || "";
//     const sepioPassword = user.sepioPassword || req.body.sepioPassword || "";

//     console.log('Sepio Credentials:', { sepioEndpoint, sepioUsername, sepioPassword });

//     const macAddresses = req.body.macAddress ? req.body.macAddress : [];

//     const isClientFormatRequired = req.body.isClientFormatRequired ? req.body.isClientFormatRequired : false;

//     console.log('Received MAC addresses: ' + macAddresses);

//     if (snEndpoint && snUsername && snPassword) {
//       const macCheckResult = await getMacAddresses(macAddresses, snEndpoint, snUsername, snPassword);
//       console.log('MAC check result: ' + macCheckResult);

//       if (Array.isArray(macCheckResult)) {
//         let responseForClientSide = [];
//         let foundMacAddresses = [];
//         let notFoundMacAddresses = [];

//         for (const singleMac of macAddresses) {
//           const matchingResults = macCheckResult.filter(macCheckResult => macCheckResult.mac_address === singleMac && macCheckResult.sys_class_name.indexOf("cmdb_ci") >= 0);

//           if (sepioEndpoint && sepioUsername && sepioPassword) {
//             const sepioToken = await getSepioToken(sepioEndpoint, sepioUsername, sepioPassword);

//             if (sepioToken) {
//               const responseSepio = await addTagsToSepioElements(sepioToken, sepioEndpoint, matchingResults, singleMac);
//             } else {
//               return res.status(500).json({
//                 success: false,
//                 error: "An attempt to get a token from Sepio failed"
//               });
//             }
//           }

//           let macAndTables = { "macAddress": "", "tables": [] };

//           if (isClientFormatRequired) {
//             if (matchingResults.length > 0) {
//               macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
//               macAndTables.tables = matchingResults.map(result => (result.sys_class_name));
//             } else {
//               macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
//             }
//             responseForClientSide.push(macAndTables);
//           } else {
//             if (matchingResults.length > 0) {
//               macAndTables.macAddress = singleMac;
//               macAndTables.tables = matchingResults.map(result => ({
//                 table: result.sys_class_name,
//                 sys_id: result.sys_id
//               }));
//               foundMacAddresses.push(macAndTables);
//             } else {
//               notFoundMacAddresses.push(singleMac);
//             }
//           }
//         }

//         console.log("responseForClientSide > " + responseForClientSide);
//         let reqdResponse = isClientFormatRequired ? responseForClientSide : { success: true, foundMacAddresses, notFoundMacAddresses };
//         res.json(reqdResponse);
//       } else {
//         res.status(500).json({
//           success: false,
//           error: "Unsupported data from ServiceNow instance. It should be 'array'"
//         });
//       }
//     } else {
//       res.status(401).json({
//         success: false,
//         error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check your login / password / endpoint"
//       });
//     }
//   } catch (error) {
//     console.log('Error', error);
//     res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
//   }
// });






// app.post('/api/mac', async (req, res) => {

//   try {
//     const requestLogin = req.body.requestLogin ? req.body.requestLogin : "";
//     const requestPassword = req.body.requestPassword ? req.body.requestPassword : "";

//     if (true) {

//       const snEndpoint = serviceNowCredentials.serviceNowInstance ? serviceNowCredentials.serviceNowInstance : req.body.snEndpoint ? req.body.snEndpoint : "";
//       const snUsername = serviceNowCredentials.username ? serviceNowCredentials.username : req.body.snLogin ? req.body.snLogin : "";
//       const snPassword = serviceNowCredentials.password ? serviceNowCredentials.password : req.body.snPassword ? req.body.snPassword : "";

//       const sepioEndpoint = sepioCredentials.sepioEndpoint ? sepioCredentials.sepioEndpoint : req.body.sepioEndpoint ? req.body.sepioEndpoint : "";
//       const sepioUsername = sepioCredentials.sepioUsername ? sepioCredentials.sepioUsername : req.body.sepioUsername ? req.body.sepioUsername : "";
//       const sepioPassword = sepioCredentials.sepioPassword ? sepioCredentials.sepioPassword : req.body.sepioPassword ? req.body.sepioPassword : "";

//       const macAddress = req.body.macAddress ? req.body.macAddress : [];

//       const isClientFormatRequired = req.body.isClientFormatRequired ? req.body.isClientFormatRequired : false;

//       console.log('Received MAC addresses: ' + macAddress);

//       if (snEndpoint && snUsername && snPassword) {

//         const macCheckResult = await getMacAddresses(macAddress, snEndpoint, snUsername, snPassword);

//         console.log('MAC check result: ' + macCheckResult);

//         if (Array.isArray(macCheckResult)) {

//           let responceForClientSide = [];
//           let foundMacAddresses = [];
//           let notFoundMacAddresses = [];

//           for (const singleMac of macAddress) {

//             const matchingResults = macCheckResult.filter(macCheckResult => macCheckResult.mac_address === singleMac && macCheckResult.sys_class_name.indexOf("cmdb_ci") >= 0);

//             if (sepioEndpoint && sepioUsername && sepioPassword) {
      
//               const sepioToken = await getSepioToken(sepioEndpoint, sepioUsername, sepioPassword);

//               if (sepioToken) {
//                 const responceSepio = await addTagsToSepioElements(sepioToken, sepioEndpoint, matchingResults, singleMac);
//               } else {
//                 res.status(500).json({
//                   success: false,
//                   error: "An attempt to get a token from Sepio failed"
//                 });
//               }
//             }

//             let macAndTables = { "macAddress": "", "tables": [] };

//             if (isClientFormatRequired) {

//               if (matchingResults.length > 0) {
//                 macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
//                 macAndTables.tables = matchingResults.map(result => (result.sys_class_name));
//               } else {
//                 macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
//               }
//               responceForClientSide.push(macAndTables);

//             } else {
//               if (matchingResults.length > 0) {
//                 macAndTables.macAddress = singleMac;
//                 macAndTables.tables = matchingResults.map(result => ({
//                   table: result.sys_class_name,
//                   sys_id: result.sys_id
//                 }));
//                 foundMacAddresses.push(macAndTables);
//               } else {
//                 notFoundMacAddresses.push(singleMac);
//               }
//             }
//           }
//           console.log("responceForClientSide > " + responceForClientSide);
//           let reqdRespons = isClientFormatRequired ? responceForClientSide : { success: true, foundMacAddresses, notFoundMacAddresses }
//           res.json(reqdRespons);
//         } else {
//           res.status(500).json({
//             success: false,
//             error: "Unsupported data from ServiceNow instance. It should be 'array'"
//           });
//         }
//       } else {
//         res.status(500).json({
//           success: false,
//           error: macCheckResult.error
//         });
//       }
//     } else {
//       res.status(401).json({
//         success: false,
//         error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check you login / password / endpoint"
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
//   }
// });


// app.use(express.static(path.join(__dirname, '../front-end/build')));

// // Serve React app for any other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// module.exports = {
//   getMacAddresses,
//   getSepioToken,
//   addTagsToSepioElements,
// };













// const { PrismaClient } = require('@prisma/client');
// const bcrypt = require('bcrypt');

// const prisma = new PrismaClient();

// async function createAdminUser() {
//   try {
//     // Check if the admin user already exists
//     const existingAdmin = await prisma.user.findUnique({
//       where: { name: 'admin' },
//     });

//     // If the admin user does not exist, create it
//     if (!existingAdmin) {
//       const hashedPassword = await bcrypt.hash('admin', 10); // Hash the password with salt rounds of 10

//       const newAdmin = await prisma.user.create({
//         data: {
//           name: 'admin',
//           password: hashedPassword,
//           privileges: 'ADMIN',
//           otp_secret: '',
//           otp_verified: false,
//         },
//       });

//       console.log('Admin user created:', newAdmin);
//     } else {
//       console.log('Admin user already exists');
//     }
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Run the createAdminUser function on application startup
// createAdminUser();



























const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;
//
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'your_secret_key',  // Change this to a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set to true if using HTTPS
}));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});





async function createAdminUser() {
  try {
    // Check if the admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { name: 'calll' },
    });

    // If the admin user does not exist, create it
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin', 10); // Hash the password with salt rounds of 10

      const newAdmin = await prisma.user.create({
        data: {
          name: 'calll',
          password: hashedPassword,
          privileges: 'ADMIN',
          otp_secret: '',
          otp_verified: false,
        },
      });

      console.log('Admin user created:', newAdmin);
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the createAdminUser function on application startup
createAdminUser();


app.get('/user/all', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.log('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});



app.post('/user/privileges', async (req, res) => {
  const { username, password, privileges, serviceNowInstance, serviceUsername, servicePassword, sepioEndpoint, sepioUsername, sepioPassword } = req.body;
  console.log(`Check user: ${username}`);

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
        otp_secret: '',
        otp_verified: false,
        privileges: privileges,
        serviceNowInstance: serviceNowInstance || null,
        serviceUsername: serviceUsername || null,
        servicePassword: servicePassword || null,
        sepioEndpoint: sepioEndpoint || null,
        sepioUsername: sepioUsername || null,
        sepioPassword: sepioPassword ||null
      },
    });
    console.log('User created successfully', newUser);
    res.json({ success: true });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ success: false, message: 'Error' });
  }
});



app.post('/update-password', async (req, res) => {
  const { password } = req.body;
  const username = req.session.username;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { name: username } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        password: hashedPassword,
        credentialsUpdated: true,
      },
    });

    res.json({ success: true, credentialsUpdated: updatedUser.credentialsUpdated });
  } catch (error) {
    console.error('Error updating password for user:', error);
    res.status(500).json({ success: false, message: 'Error updating password for user' });
  }
});



app.post('/reset-credentials-updated', async (req, res) => {
  const username = req.session.username;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required' });
  }

  try {
    await prisma.user.update({
      where: { name: username },
      data: { credentialsUpdated: false },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error resetting credentials updated status for user:', error);
    res.status(500).json({ success: false, message: 'Error resetting credentials updated status' });
  }
});



app.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { name: username } });

    if (!user || (user.privileges !== 'ADMIN' && user.privileges !== 'UI_USER')) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.session.username = username;

    if (!user.credentialsUpdated) {
      return res.json({ credentialsUpdated: false });
    }


    if (user.otp_verified) {
      console.log(`User ${username} has completed OTP setup`);
      return res.json({ otpRequired: true, credentialsUpdated: true });
    } else {
      console.log(`User ${username} has not completed OTP setup, generating secret`);
      const secret = speakeasy.generateSecret({ length: 20 });
      console.log(`Generated secret for user ${username}: ${secret.base32}`);

      const otpauth_url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: encodeURIComponent(username),
        issuer: 'YourApp',
        encoding: 'base32',
      });

      // Store secret in db
      await prisma.user.update({
        where: { name: username },
        data: { otp_secret: secret.base32 },
      });

      // Generate QR code for 2FA Authentication
      qrcode.toDataURL(otpauth_url, (err, data_url) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'QR code generation failed' });
        }
        console.log(`Generated QR code for user ${username}`);
        res.json({ otpRequired: true, qrCode: data_url, secret: secret.base32, credentialsUpdated: true });
      });
    }

    // res.json({ otpRequired: user.otp_verified, credentialsUpdated: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Database error' });
  }
});



app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ privileges: user.privileges });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Database error' });
  }
});



app.post('/verify', async (req, res) => {
  const { username, token } = req.body;
  console.log(`Verifying token for user: ${username}`);

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user || !user.otp_secret) {
      console.log(`User ${username} not set up for 2FA`);
      return res.status(400).json({ verified: false, message: 'User not set up for 2FA' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.otp_secret,
      encoding: 'base32',
      token: token.trim(),
      window: 5,
    });

    // Verified connection with Google Authenticator 
    if (verified) {
      console.log(`Token verified for user: ${username}`);
      await prisma.user.update({
        where: { name: username },
        data: { otp_verified: true },
      });
      res.json({ verified: true });
    } else {
      console.log(`Invalid token for user: ${username}`);
      res.json({ verified: false, message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Database error' });
  }
});

// Routes
let serviceNowCredentials = {};
let sepioCredentials = {};

app.get('/get-source', async (req, res) => {

  console.log("we are here > /get-source + " + serviceNowCredentials.toString());

  res.json(serviceNowCredentials);
});

app.get('/get-sepio-source', async (req, res) => {

  console.log("we are here > /get-sepio-source + " + sepioCredentials.toString());

  res.json(sepioCredentials);
});




app.post('/check-connection', async (req, res) => {
  const { serviceNowInstance, username, password } = req.body;
  serviceNowCredentials = {serviceNowInstance, username, password};

  try {
    const response = await axios.get(`https://${serviceNowInstance}/api/now/table/incident`, {
      auth: {
        username,
        password
      }
    });

    if (response.status === 200) {
      try {
        console.log('Creating new record in ServiceNowCredentials:', { instance: serviceNowInstance, username, password });

        const newRecord = await prisma.serviceNowCredentials.create({
          data: {
            instance: serviceNowInstance,
            username,
            password
          }
        });

        console.log('New record created:', newRecord);
        res.json({ success: true, message: 'Connection successful' });
      } catch (dbError) {
        console.error('Database error:', dbError);
        res.status(500).json({ success: false, message: 'Failed to save credentials to the database' });
      }
    } else {
      res.status(response.status).json({ success: false, message: 'Connection failed' });
    }
  } catch (error) {
    console.error('API error:', error);
    if (error.response && error.response.status === 401) {
      res.status(401).json({ success: false, message: 'Authentication failed: Invalid username or password' });
    } else if (error.response && error.response.status === 404) {
      res.status(404).json({ success: false, message: 'ServiceNow connection failed: Invalid instance.' });
    } else {
      res.status(500).json({ success: false, message: 'Connection failed' });
    }
  }
});






app.post('/check-sepio-connection', async (req, res) => {
	const { sepioEndpoint, sepioUsername, sepioPassword } = req.body;
	sepioCredentials = { sepioEndpoint, sepioUsername, sepioPassword };
	
	// Ensure all fields are provided
	if (!sepioEndpoint || !sepioUsername || !sepioPassword) {
	  return res.status(400).json({ success: false, message: 'All fields are required!' });
	}
  
	// Validate if the endpoint is for Sepio (you can add more specific checks here)
	if (!sepioEndpoint.includes('sepio')) {
	  return res.status(400).json({ success: false, message: 'Invalid Sepio endpoint!' });
	}
  
	const requestBody = {
	  username: sepioUsername,
	  password: sepioPassword
	};
  
	const config = {
	  headers: {
		'Content-Type': 'application/json',
	  }
	};
  
	try {
	  const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);
	  
	  if (response.status === 200) {
		try {
		  const newRecord = await prisma.sepio.create({
			data: {
			  instance: sepioEndpoint,
			  username: sepioUsername,
			  password: sepioPassword
			}
		  });
  
		  console.log('New record created:', newRecord);
		  res.json({ success: true, message: 'Connection successful!' });
		} catch (dbError) {
		  console.error('Database error:', dbError);
		  res.status(500).json({ success: false, message: 'Failed to save credentials to the database' });
		}
	  } else {
		res.status(500).json({ success: false, message: 'Connection failed!' });
	  }
	} catch (error) {
	  console.error('API error:', error);
	  res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
	}
  });


const getMacAddresses = async (macAddress, serviceNowInstance, snUsername, snPassword) => {

  console.log(macAddress);

  console.log(serviceNowInstance + " # " + snUsername + " # " + snPassword);

  if (!snUsername && !snPassword && !serviceNowInstance) {
    return { "error": "Please, provide valid ServiceNow credentials" };
  }

  const auth = Buffer.from(`${snUsername}:${snPassword}`).toString('base64');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + auth
    }
  };

  try {
    let snQueryParms = [];
    let searchQuery = "";

    macAddress.map(singleMAC => snQueryParms.push("mac_addressLIKE" + singleMAC));

    searchQuery = snQueryParms.join("%5EOR");

    let endpoint = `https://${serviceNowInstance}/api/now/table/cmdb_ci?sysparm_query=GOTO${searchQuery}&sysparm_fields=mac_address%2Csys_class_name%2Csys_id`;

    console.log(`endpoint > ${endpoint}`);

    const response = await axios.get(endpoint, config);

    console.log("foo 1 ");

    const queryResults = response.data.result;

    console.log("foo 2 ");

    if (response.status === 200) {

      const queryResults = response.data.result;

      console.log('Filtered MAC addresses:', queryResults);

      return queryResults;

    } else {
      console.log('Filtered MAC addresses status:' + response.status);
      res.status(500).json({ success: false, message: 'Connection failed!' });
    }
  } catch (error) {
    console.error('Error fetching MAC addresses:', error);
    res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
    return [];
  }
};

const getSepioToken = async (snEndpoint, snUsername, snPassword) => {

  console.log("Started sepio token retrieving process");

  var requestBody = {
    "username": snUsername,
    "password": snPassword
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const response = await axios.post(`https://${snEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

    console.log(response.data.token);

    if (response.status === 200) {
      console.log('Successfully got token from Sepio: ' + response.data.token);
      return response.data.token;
    } else {
      console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
      throw error;
    }

  } catch (error) {
    console.error('Error getting token from Sepio: ', error);
    throw error;
  }
};

const addTagsToSepioElements = async (sepioToken, snEndpoint, filteredMacs, mac) => {

  try {
    let tagsList = [];

    if (filteredMacs.length > 0) {
      tagsList = filteredMacs.map(result => (result.sys_class_name));
      tagsList.push("in_cmdb");
    } else {
      tagsList.push("NOT_INCMDB");
    }
    console.log("An attemt to add tags to Sepio elements");

    let requestBody = {
      "tagNames": tagsList,
      "elementKeys": [mac],
      "function": 0,
      "processChildren": false
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sepioToken
      }
    };

    const response = await axios.post(`https://${snEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

    if (response.status === 200) {

      console.log("Adding tags process to element: " + mac + " is success!");

      return response;
    } else {
      console.error("Adding tags process to element: " + mac + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
    }
  } catch (ex) {
    console.error('Error adding tags to Sepio elements:', error);
    throw error;
  }
};





app.post('/api/check-mac', async (req, res) => {
  const { login, password, macAddress } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { name: login },
    });

    if (!user || !await bcrypt.compare(password, user.password) || (user.privileges !== 'SERVICE_ACCOUNT' && user.privileges !== 'ADMIN')) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const snEndpoint = user.serviceNowInstance || req.body.snEndpoint || "";
    const snUsername = user.serviceUsername || req.body.snLogin || "";
    const snPassword = user.servicePassword || req.body.snPassword || "";

    const sepioEndpoint = user.sepioEndpoint || req.body.sepioEndpoint || "";
    const sepioUsername = user.sepioUsername || req.body.sepioUsername || "";
    const sepioPassword = user.sepioPassword || req.body.sepioPassword || "";

    console.log('Sepio Credentials:', { sepioEndpoint, sepioUsername, sepioPassword });

    const macAddresses = req.body.macAddress ? req.body.macAddress : [];

    const isClientFormatRequired = req.body.isClientFormatRequired ? req.body.isClientFormatRequired : false;

    console.log('Received MAC addresses: ' + macAddresses);

    if (snEndpoint && snUsername && snPassword) {
      const macCheckResult = await getMacAddresses(macAddresses, snEndpoint, snUsername, snPassword);
      console.log('MAC check result: ' + macCheckResult);

      if (Array.isArray(macCheckResult)) {
        let responseForClientSide = [];
        let foundMacAddresses = [];
        let notFoundMacAddresses = [];

        for (const singleMac of macAddresses) {
          const matchingResults = macCheckResult.filter(macCheckResult => macCheckResult.mac_address === singleMac && macCheckResult.sys_class_name.indexOf("cmdb_ci") >= 0);

          if (sepioEndpoint && sepioUsername && sepioPassword) {
            const sepioToken = await getSepioToken(sepioEndpoint, sepioUsername, sepioPassword);

            if (sepioToken) {
              const responseSepio = await addTagsToSepioElements(sepioToken, sepioEndpoint, matchingResults, singleMac);
            } else {
              return res.status(500).json({
                success: false,
                error: "An attempt to get a token from Sepio failed"
              });
            }
          }

          let macAndTables = { "macAddress": "", "tables": [] };

          if (isClientFormatRequired) {
            if (matchingResults.length > 0) {
              macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
              macAndTables.tables = matchingResults.map(result => (result.sys_class_name));
            } else {
              macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
            }
            responseForClientSide.push(macAndTables);
          } else {
            if (matchingResults.length > 0) {
              macAndTables.macAddress = singleMac;
              macAndTables.tables = matchingResults.map(result => ({
                table: result.sys_class_name,
                sys_id: result.sys_id
              }));
              foundMacAddresses.push(macAndTables);
            } else {
              notFoundMacAddresses.push(singleMac);
            }
          }
        }

        console.log("responseForClientSide > " + responseForClientSide);
        let reqdResponse = isClientFormatRequired ? responseForClientSide : { success: true, foundMacAddresses, notFoundMacAddresses };
        res.json(reqdResponse);
      } else {
        res.status(500).json({
          success: false,
          error: "Unsupported data from ServiceNow instance. It should be 'array'"
        });
      }
    } else {
      res.status(401).json({
        success: false,
        error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check your login / password / endpoint"
      });
    }
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
  }
});






app.post('/api/mac', async (req, res) => {

  try {
    const requestLogin = req.body.requestLogin ? req.body.requestLogin : "";
    const requestPassword = req.body.requestPassword ? req.body.requestPassword : "";

    if (true) {

      const snEndpoint = serviceNowCredentials.serviceNowInstance ? serviceNowCredentials.serviceNowInstance : req.body.snEndpoint ? req.body.snEndpoint : "";
      const snUsername = serviceNowCredentials.username ? serviceNowCredentials.username : req.body.snLogin ? req.body.snLogin : "";
      const snPassword = serviceNowCredentials.password ? serviceNowCredentials.password : req.body.snPassword ? req.body.snPassword : "";

      const sepioEndpoint = sepioCredentials.sepioEndpoint ? sepioCredentials.sepioEndpoint : req.body.sepioEndpoint ? req.body.sepioEndpoint : "";
      const sepioUsername = sepioCredentials.sepioUsername ? sepioCredentials.sepioUsername : req.body.sepioUsername ? req.body.sepioUsername : "";
      const sepioPassword = sepioCredentials.sepioPassword ? sepioCredentials.sepioPassword : req.body.sepioPassword ? req.body.sepioPassword : "";

      const macAddress = req.body.macAddress ? req.body.macAddress : [];

      const isClientFormatRequired = req.body.isClientFormatRequired ? req.body.isClientFormatRequired : false;

      console.log('Received MAC addresses: ' + macAddress);

      if (snEndpoint && snUsername && snPassword) {

        const macCheckResult = await getMacAddresses(macAddress, snEndpoint, snUsername, snPassword);

        console.log('MAC check result: ' + macCheckResult);

        if (Array.isArray(macCheckResult)) {

          let responceForClientSide = [];
          let foundMacAddresses = [];
          let notFoundMacAddresses = [];

          for (const singleMac of macAddress) {

            const matchingResults = macCheckResult.filter(macCheckResult => macCheckResult.mac_address === singleMac && macCheckResult.sys_class_name.indexOf("cmdb_ci") >= 0);

            if (sepioEndpoint && sepioUsername && sepioPassword) {
      
              const sepioToken = await getSepioToken(sepioEndpoint, sepioUsername, sepioPassword);

              if (sepioToken) {
                const responceSepio = await addTagsToSepioElements(sepioToken, sepioEndpoint, matchingResults, singleMac);
              } else {
                res.status(500).json({
                  success: false,
                  error: "An attempt to get a token from Sepio failed"
                });
              }
            }

            let macAndTables = { "macAddress": "", "tables": [] };

            if (isClientFormatRequired) {

              if (matchingResults.length > 0) {
                macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
                macAndTables.tables = matchingResults.map(result => (result.sys_class_name));
              } else {
                macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
              }
              responceForClientSide.push(macAndTables);

            } else {
              if (matchingResults.length > 0) {
                macAndTables.macAddress = singleMac;
                macAndTables.tables = matchingResults.map(result => ({
                  table: result.sys_class_name,
                  sys_id: result.sys_id
                }));
                foundMacAddresses.push(macAndTables);
              } else {
                notFoundMacAddresses.push(singleMac);
              }
            }
          }
          console.log("responceForClientSide > " + responceForClientSide);
          let reqdRespons = isClientFormatRequired ? responceForClientSide : { success: true, foundMacAddresses, notFoundMacAddresses }
          res.json(reqdRespons);
        } else {
          res.status(500).json({
            success: false,
            error: "Unsupported data from ServiceNow instance. It should be 'array'"
          });
        }
      } else {
        res.status(500).json({
          success: false,
          error: macCheckResult.error
        });
      }
    } else {
      res.status(401).json({
        success: false,
        error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check you login / password / endpoint"
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
  }
});


app.use(express.static(path.join(__dirname, '../front-end/build')));

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = {
  getMacAddresses,
  getSepioToken,
  addTagsToSepioElements,
};