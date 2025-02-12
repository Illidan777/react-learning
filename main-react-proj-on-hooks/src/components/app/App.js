import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePageComics = lazy(() => import('../pages/SinglePageComics'));
const SinglePageChar = lazy(() => import('../pages/SinglePageChar'));

const App = () => {
    return (
        <Suspense fallback={<Spinner/>}>
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route index element={<MainPage/>}/>
                            <Route path="/chars/:entityId" element={<SinglePageChar/>}/>
                            <Route path="comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:entityId" element={<SinglePageComics/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        </Suspense>
    )
}

export default App;