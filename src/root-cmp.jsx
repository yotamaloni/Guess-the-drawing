import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/styles.scss";
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { UserMsg } from './cmps/user-msg';
import routes from './routes';

export function RootCmp() {
  return (
    <div className="root-cmp">
      <Router>
        <AppHeader />
        <main className="main-container">
          <Routes>
            {routes.map(route => <Route key={route.id} path={route.path} element={route.element} />)}
          </Routes>
        </main>
        <AppFooter />
      </Router>
      <UserMsg />
    </div >
  );
}

