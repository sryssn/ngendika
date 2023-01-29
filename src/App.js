import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AddNewPost from './pages/AddNewPost';
import DetailPage from './pages/DetailPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import PageNotFound from './components/404';
import LeaderboardsPage from './pages/LeaderboardsPage';

function App() {
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <div className="app-container">
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-new-post" element={<AddNewPost />} />
        <Route path="/post/:id" element={<DetailPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
      </Routes>
    </div>
  );
}

export default App;
