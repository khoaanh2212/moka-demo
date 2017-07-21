const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const PORT = 8000;

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

let listEmployee = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Brad' },
  { id: 3, name: 'Paul' },
  { id: 4, name: 'Vin Diesel' },
];

let listUser = [
  { id: 1, name: 'Johnny' },
  { id: 2, name: 'Lenny' },
  { id: 3, name: 'Watch' },
  { id: 4, name: 'Rocker' },
];

const basicToken = 'eyJraWQiOiJldS1jZW50cmFsLTExIiwidHlwIjoiSldTIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiJldS1jZW50cmFsLTE6OGFmZWM5M2YtMzQ5ZS00N2I4LThkNjItNjczYTY5YjQwMWRkIiwiYXVkIjoiZXUtY2VudHJhbC0xOjM3ZDNmZDUyLWQ0OTUtNGViZS05OTFiLWI2NWVhNjQ4OThmMCIsImFtciI6WyJhdXRoZW50aWNhdGVkIiwibG9naW4uYWdvcmEuc2VydmljZSIsImxvZ2luLmFnb3JhLnNlcnZpY2U6ZXUtY2VudHJhbC0xOjM3ZDNmZDUyLWQ0OTUtNGViZS05OTFiLWI2NWVhNjQ4OThmMDowY2YyYmUxNi0xMWEwLTQzMzAtYmVmOS01MTQxOGI5MmY5OTciXSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb20iLCJleHAiOjE0ODE2MDE3NjAsImlhdCI6MTQ4MTUxNTM2MH0.gQEcfYeun21MBWb9wna1yRkGyeLDUl8h8gS-AMV7OTLI87RBCAEDgl3XjCrbw-QPt38aQZUybQ96lqVYlOP_ZYDB8J6-fzV4InYPcygmrFmoItPe0HEyKtPbqifGvUFrWXPYvzuSGlwAjvZmNkgw95TOwJ9P5F4U9oPMHUMRBp0fF5D0-6Eqr4siX2ROzzozqYZ2U08YEinhs4ytDhWIg1yzzAnUirl28zORZdSJpPOstTxlX3ngxEn9m7tuacy-hmmfkh-coXouD47-pyWhfYK1NebzydhWwouYfFhHGDjSlRa2F8eBAaWkNAdodo2u98vKS8iRDPplPWnJFUiPxA';

app.post('/api/login', (req, res) => {
  // const username = req.param('username');
  // const password = req.param('password');

  const { username, password } = req.body;
  if (username === 'demo@8bitrockstar.com' && password === '123456') {
    res.status(200).json(
      {
        token: basicToken,
        identityId: 'eu-central-1:8afec93f-349e-47b8-8d62-673a69b401dd',
      }
    );
  } else {
    res.status(401).json({});
  }
});


app.get('/api/employee', (req, res) => {
  res.status(200).json(listEmployee);
});
app.delete('/api/employee', (req, res) => {
  const id = req.param('id');
  const token = req.param('token');

  if (token === basicToken) {
    listEmployee = listEmployee.filter((o) => (o.id != id));
    res.status(200).json(listEmployee);
  } else {
    res.status(401).json();
  }
});

app.get('/api/user', (req, res) => {
  res.status(200).json(listUser);
});

app.delete('/api/user', (req, res) => {
  const id = req.param('id');
  const token = req.param('token');

  if (token === basicToken) {
    listUser = listUser.filter((o) => (o.id != id));
    res.status(200).json(listUser);
  } else {
    res.status(401).json();
  }
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.emit('greetings', 'Welcome to socket io');

  socket.on('UPDATE_EMPLOYEE', () => {
    socket.broadcast.emit('CHANGE_EMPLOYEE', listEmployee);
  });

  socket.on('UPDATE_USER', () => {
    socket.broadcast.emit('CHANGE_USER', listUser);
  });

});

server.listen(PORT, () => console.log(`mock server is now running on http://localhost:${PORT}`));
