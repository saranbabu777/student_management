import './App.css';
import { Route, Routes } from 'react-router-dom'
import CreateStudent from './components/create-student';
import EditStudent from './components/edit-student';
import StudentList from './components/student-list';
import Navbar from './components/navbar';
import AddFees from './components/add-fees';
import FeeList from './components/fee-list';

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
      </Routes>
    </div>
  );
}

export default App;
