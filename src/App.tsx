import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import PastEvents from './pages/PastEvents/PastEvents'
import UpcomingEvents from './pages/UpcomingEvents/UpcomingEvents'
import Merch from './pages/Merch/Merch'

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/events/upcoming" element={<UpcomingEvents />} />
                <Route path="/events/past" element={<PastEvents />} />
                <Route path="/merch" element={<Merch />} />
            </Route>
        </Routes>
    )
}

export default App
