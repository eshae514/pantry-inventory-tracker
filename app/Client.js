'use client'

import * as React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//import { Container, Row, Col } from 'react-bootstrap';
import { Box, AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';

import SignOut from "./SignOut";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Tracker from "./Tracker";
import { UserAuthContextProvider } from "./UserAuthContext";

function Background() {
  const location = useLocation();
  
  // Only show background on the landing page
  const isLandingPage = location.pathname === '/';

  if (!isLandingPage) return null;

  return (
    <React.Fragment>
      <img
        src="/kitchen.jpg" // Replace with your image path
        alt="Description of image"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -2,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(210,105,30, 0.7)', // Orange tint with 50% opacity
          mixBlendMode: 'overlay',
          objectFit: 'Cover',
          zIndex: -2,
          pointerEvents: 'none',
        }}
      />
      <Typography
        variant="h1"
        style={{
          position: 'fixed',
          top: '40%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontWeight: 'regular',
          fontFamily: 'Roboto',
          padding: '10px',
          zIndex: 0,
        }}
      >
        Pantry Tracker
      </Typography>
      <Typography
        variant="h5"
        style={{
          position: 'fixed',
          top: '50%',
          left: '39.5%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontWeight: 'regular',
          fontFamily: 'Roboto',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          padding: '10px',
          zIndex: 0,
        }}
      >
        Get Started Today using the Pantry Tracker, which helps you stay on top of your pantry items
      </Typography>
    </React.Fragment>
  );
}

export default function Page() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: 'rgba(204, 102, 0)' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/Login">Login</Button>
          <Button color="inherit" component={Link} to="/SignUp">Sign Up</Button>
          <Button color="inherit" component={Link} to="/Tracker">Free Trial</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ position: 'relative', overflow: 'hidden' }}>
        <Background />
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<page />}/>
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Tracker" element={<Tracker />} />
          </Routes>
        </UserAuthContextProvider>
      </Container>
    </Router>
  );
}
