import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyles from './styles/global';
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Login } from './pages/Login';
import { Content } from './pages/Content';
import { SignUp } from './pages/SignUp';
import { Forgot } from './pages/Forgot';
import { NewForgot } from './pages/NewForgot';

ReactDOM.render(
<React.StrictMode>
  
<BrowserRouter>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/content" element={<Content />}/>
          <Route path="/newForgot" element={<NewForgot />}/>
          <Route path="/forgot" element={<Forgot />}/>
        </Routes>
      <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          fontSize: 14
        },
        error: {
          iconTheme: {
            primary: theme.white800,
            secondary: theme.error,
          },
          style: {
            background: theme.error,
            color: theme.white800
          }
        },
        success: {
          iconTheme: {
            primary: theme.white800,
            secondary: theme.green600,
          },
          style: {
            background: theme.green600,
            color: theme.white800
          }
        }
      }}
      />
      <GlobalStyles />
    </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
