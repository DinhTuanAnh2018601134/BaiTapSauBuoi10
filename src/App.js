import logo from './logo.svg';
import './App.css';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  Routes,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { useEffect } from 'react';
import List from './pages/List';
import FormAdd from './pages/FormAdd';
import FormEdit from './pages/FormEdit';

export const reactMembers = atom({
  key: 'reactMembers',
  default: []
});
export const javaMembers = atom({
  key: 'javaMembers',
  default: []
});

function App() {
  const [listReact, setListReact] = useRecoilState(reactMembers);
  const [listJava, setListjava] = useRecoilState(javaMembers);

  useEffect(() => {
    setListReact(
      JSON.parse(localStorage.getItem('listReact')) || [
        { memberName: "Đinh Tuấn Anh", memberAge: 16, memberClass: "react" },
        { memberName: "Ngụy Minh Thắng", memberAge: 20, memberClass: "react" },
        { memberName: "Nguyễn Anh Thư", memberAge: 21, memberClass: "react" }
      ]);

    setListjava(
      JSON.parse(localStorage.getItem('listJava')) || [
        { memberName: "Bế Trọng Hiếu", memberAge: 19, memberClass: "java" },
        { memberName: "Ngô Huỳnh Đức", memberAge: 20, memberClass: "java" },
        { memberName: "Nguyễn Mạnh Dũng", memberAge: 21, memberClass: "java" }
      ]);
  }, [])

  return (
    <div className="App">
      <List />
      <button><Link to='/add-member'>add member</Link></button>
      <div className='form'>
        <Routes>
          <Route path="/*"/>
          <Route path="add-member" element={<FormAdd />} />
          <Route path="edit-member" element={<FormEdit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
