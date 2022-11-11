import './App.css';
import { Route, Routes } from 'react-router-dom'
import CreateStudent from './components/create-student';
import EditStudent from './components/edit-student';
import StudentList from './components/student-list';
import Navbar from './components/navbar';
import AddFees from './components/add-fees';
import FeeList from './components/fee-list';
import Tournament from './components/tournament';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<StudentList />} />
        <Route path="/create" element={<CreateStudent />} />
        <Route path="/add-fees" element={<AddFees />} />
        <Route path="/fees" element={<FeeList />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        <Route path="/tournament" element={<Tournament />} />
      </Routes>
    </div>
  );
}

export default App;
