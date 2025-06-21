const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

let dbUser = null;
let dbAdmin = null;
let dbcomplaint = null;

const initializeDBs = async () => {
  try {
    dbUser = await open({
      filename: path.join(__dirname, 'people_data.db'),
      driver: sqlite3.Database,
    });

    dbAdmin = await open({
      filename: path.join(__dirname, 'dummy_admins.db'),
      driver: sqlite3.Database,
    });
    dbcomplaint = await open({
      filename: path.join(__dirname, 'complaint_form.db'),
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log('✅ Server running at http://localhost:3000');
    });
  } catch (e) {
    console.error('❌ DB Error:', e.message);
    process.exit(1);
  }
};

initializeDBs();

// People login 
// app.post('/auth_user', async (request, response) => {
//   try {
//     const { aadharNo, password } = request.body;

//     console.log("Request received:", request.body);

//     if (!aadharNo || !password) {
//       return response.status(400).send({ succeeded: false, error: 'Missing fields' });
//     }

//     const checkPersonQuery = SELECT * FROM people WHERE aadhaarNo = ?;;
//     const person = await db.get(checkPersonQuery, [aadharNo]);

//     if (person) {
//       const expected = person.aadhaarNo.slice(8, 12);
//       const isValid = password === expected;

//       if (isValid) {
//         const payload = { aadharNo: person.aadhaarNo };
//         const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN');

//         return response.status(200).send({ succeeded: true, jwtToken });
//       } else {
//         return response.status(200).send({ succeeded: false, error: 'Invalid password' });
//       }
//     } else {
//       return response.status(200).send({ succeeded: false, error: 'User not found' });
//     }
//   } catch (error) {
//     console.error("🔥 /auth_user error:", error.message);
//     return response.status(500).send({ succeeded: false, error: 'Internal Server Error' });
//   }
// });
let aadhar_no_storing = null;
app.post('/auth_user', async (request, response) => {
  try {
    const { aadharNo, password } = request.body;

    const person = await dbUser.get('SELECT * FROM people WHERE aadhaarNo = ?', [aadharNo]);
    aadhar_no_storing = person.aadhaarNo;

    if (person && password === person.aadhaarNo.slice(8, 12)) {
      const token = jwt.sign({ aadharNo }, 'MY_SECRET');
      response.send({ succeeded: true, jwtToken: token });
      
    } else {
      response.send({ succeeded: false, error: 'Invalid user credentials' });
    } 
  } catch (error) {
    console.error('/auth_user error:', error.message);
    response.status(500).send({ succeeded: false, error: 'Internal Server Error' });
  }

 
});

// Admin login
var admin_location = null;
app.post('/auth_admin', async (request, response) => {
  try {
    const { email, password } = request.body;

    const admin = await dbAdmin.get('SELECT * FROM admins WHERE Email = ?', [email]);
    admin_location = admin.Location;
    console.log("Admin request received:", request.body);
    if (password === admin.Password) {
      const token = jwt.sign({ email }, 'MY_SECRET');
      response.send({ succeeded: true, jwtToken: token });
    } else {
      console.log("Invalid admin credentials:", password, admin.Password);
      response.send({ succeeded: false, error: 'Invalid admin credentials' });
    }
  } catch (error) {
    console.error('/auth_admin error:', error.message);
    response.status(500).send({ succeeded: false, error: 'Internal Server Error' });
  }
});

// Create a new complaint by user

app.post('/complaint_user', async (req, res) => {
  try {
    const {
      Full_Name,
      Contact_Number,
      Email_Address,
      Category,
      Address,
      Complaint_Title,
      Incident_Location,
      Detailed_Description
    } = req.body;

    const createComplaintQuery = `
      INSERT INTO complaint_form (
        Full_Name,
        Contact_Number,
        Email_Address,
        Category,
        Address,
        Complaint_Title,
        Incident_Location,
        Detailed_Description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await dbcomplaint.run(createComplaintQuery, [
      Full_Name,
      Contact_Number,
      Email_Address,
      Category,
      Address,
      Complaint_Title,
      Incident_Location,
      Detailed_Description,
    ]);

    res.send({ succeeded: true });
  } catch (e) {
    console.error("/complaint_user error:", e);
    res.status(500).send({ succeeded: false, error: "Internal Server Error" });
  }
});


// get all complaints
app.get('/get_complaints', async (request, response) => {
  try {
    const complaints = await dbcomplaint.all('SELECT * FROM complaint_form');
    response.send({ succeeded: true, complaints });
  } catch (error) {
    console.error("/get_complaints error:", error.message);
    response.status(500).send({ succeeded: false, error: "Internal Server Error" });
  }
});


// Get complaints by Aadhaar number 


app.get('/get_complaints_by_aadhar', async (request, response) => {
  try {
    const aadhaarNo = aadhar_no_storing;

    if (!aadhaarNo) {
      return response.status(400).send({ succeeded: false, error: 'Aadhaar number is required' });
    }

    const complaints = await dbcomplaint.all('SELECT * FROM complaint_form WHERE aadhaarNo = ?', [aadhaarNo]);
    response.send({ succeeded: true, complaints });
  } catch (error) {
    console.error("/get_complaints_by_aadhar error:", error.message);
    response.status(500).send({ succeeded: false, error: "Internal Server Error" });
  }
});





// spefic complains for admin 

app.get('/get_complaints_by_admin', async (request, response) => {
  try {
    const complaints = await dbcomplaint.all('SELECT * FROM complaint_form where status = "pending" and Location = ?', [admin_location]);
    response.send({ succeeded: true, complaints });
  } catch (error) {
    console.error("/get_complaints_by_admin error:", error.message);
    response.status(500).send({ succeeded: false, error: "Internal Server Error" });
  }
});



// Update complaint status by admin
app.put('/update_complaint_status', async (request, response) => {
  try {
    const { complaintId} = request.body;

    if (!complaintId ) {
      return response.status(400).send({ succeeded: false, error: 'Complaint ID required' });
    }

    const updateStatusQuery = 'UPDATE complaint_form SET status = ? WHERE id = ?';
    await dbcomplaint.run(updateStatusQuery, [status, complaintId]);

    response.send({ succeeded: true, message: "Complaint status updated successfully" });
  } catch (error) {
    console.error("/update_complaint_status error:", error.message);
    response.status(500).send({ succeeded: false, error: "Internal Server Error" });
  }
});





//#############################################################################################3
// const express = require('express');
// const path = require('path');
// const { open } = require('sqlite');
// const sqlite3 = require('sqlite3');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(express.json());
// app.use(cors());

// let dbUser = null;
// let dbAdmin = null;

// const initializeDBs = async () => {
//   try {
//     dbUser = await open({
//       filename: path.join(__dirname, 'people_data.db'),
//       driver: sqlite3.Database,
//     });

//     dbAdmin = await open({
//       filename: path.join(__dirname, 'dummy_admins.db'),
//       driver: sqlite3.Database,
//     });

//     app.listen(3000, () => {
//       console.log('✅ Server running at http://localhost:3000');
//     });
//   } catch (e) {
//     console.error('❌ DB Error:', e.message);
//     process.exit(1);
//   }
// };

// initializeDBs();

// // People login 
// // app.post('/auth_user', async (request, response) => {
// //   try {
// //     const { aadharNo, password } = request.body;

// //     console.log("Request received:", request.body);

// //     if (!aadharNo || !password) {
// //       return response.status(400).send({ succeeded: false, error: 'Missing fields' });
// //     }

// //     const checkPersonQuery = `SELECT * FROM people WHERE aadhaarNo = ?;`;
// //     const person = await db.get(checkPersonQuery, [aadharNo]);

// //     if (person) {
// //       const expected = person.aadhaarNo.slice(8, 12);
// //       const isValid = password === expected;

// //       if (isValid) {
// //         const payload = { aadharNo: person.aadhaarNo };
// //         const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN');

// //         return response.status(200).send({ succeeded: true, jwtToken });
// //       } else {
// //         return response.status(200).send({ succeeded: false, error: 'Invalid password' });
// //       }
// //     } else {
// //       return response.status(200).send({ succeeded: false, error: 'User not found' });
// //     }
// //   } catch (error) {
// //     console.error("🔥 /auth_user error:", error.message);
// //     return response.status(500).send({ succeeded: false, error: 'Internal Server Error' });
// //   }
// // });

// app.post('/auth_user', async (request, response) => {
//   try {
//     const { aadharNo, password } = request.body;

//     const person = await dbUser.get('SELECT * FROM people WHERE aadhaarNo = ?', [aadharNo]);

//     if (person && password === person.aadhaarNo.slice(8, 12)) {
//       const token = jwt.sign({ aadharNo }, 'MY_SECRET');
//       response.send({ succeeded: true, jwtToken: token });
//     } else {
//       response.send({ succeeded: false, error: 'Invalid user credentials' });
//     }
//   } catch (error) {
//     console.error('/auth_user error:', error.message);
//     response.status(500).send({ succeeded: false, error: 'Internal Server Error' });
//   }
// });



// // Admin authentication route
// // app.post('/auth_admin', async (request, response) => {
// //   try {
// //     const { email, password } = request.body;

// //     console.log("Request received:", request.body);

// //     if (!email || !password) {
// //       return response.status(400).send({ succeeded: false, error: 'Missing fields' });
// //     }

// //     const checkPersonQuery = `SELECT * FROM admin WHERE email = ?;`;
// //     const person = await db.get(checkPersonQuery, [email]);

// //     if (person) {
// //       const expected = person.password;
// //       const isValid = password === expected;

// //       if (isValid) {
// //         const payload = { email: person.email };
// //         const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN');

// //         return response.status(200).send({ succeeded: true, jwtToken });
// //       } else {
// //         return response.status(200).send({ succeeded: false, error: 'Invalid password' });
// //       }
// //     } else {
// //       return response.status(200).send({ succeeded: false, error: 'User not found' });
// //     }
// //   } catch (error) {
// //     console.error("🔥 /auth_user error:", error.message);
// //     return response.status(500).send({ succeeded: false, error: 'Internal Server Error' });
// //   }
// // });


// app.post('/auth_admin', async (request, response) => {
//   try {
//     const { email, password } = request.body;

//     const admin = await dbAdmin.get('SELECT * FROM admins WHERE Email = ?', [email]);
//     console.log("Admin request received:", request.body);
//     if (password === admin.Password) {
//       const token = jwt.sign({ email }, 'MY_SECRET');
//       response.send({ succeeded: true, jwtToken: token });
//     } else {
//       console.log("Invalid admin credentials:", password, admin.Password);
//       response.send({ succeeded: false, error: 'Invalid admin credentials' });
//     }
//   } catch (error) {
//     console.error('/auth_admin error:', error.message);
//     response.status(500).send({ succeeded: false, error: 'Internal Server Error' });
//   }
// });


