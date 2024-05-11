import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        <Route element={ <AuthLayout /> } >
          <Route path='/sign-in' element={ <SigninForm />} />
          <Route index element={ <SignupForm />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App