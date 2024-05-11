import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
    </section>
  )
}
