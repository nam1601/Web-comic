import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import './App.css';
import { useSelector } from 'react-redux';

import { selectUser } from '~/features/user/userSlice';
import Header from './component/Header/Header';
import NavBar from './component/NavBar/NavBar';
import Footer from './component/Footer/Footer';
function App() {
    const user = useSelector(selectUser);
    console.log('user from homePage: ', user);
    return (
        <Router>
            <div className="App">
                <Header user={user} />
                <NavBar />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = Fragment;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
