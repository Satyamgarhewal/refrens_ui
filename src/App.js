import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './app/pages/homepage/homepage';
import Users from './app/pages/users/users';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users/:id" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
