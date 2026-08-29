import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import PastEvents from './pages/PastEvents/PastEvents'

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/events/past" element={<PastEvents />} />
            </Route>
        </Routes>
    )
}

export default App
