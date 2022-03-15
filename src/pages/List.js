import React from 'react';
import {
    atom,
    useRecoilState
} from 'recoil';
import { Link } from "react-router-dom";
import { reactMembers } from '../App.js';
import { javaMembers } from '../App.js';

export const editMember = atom({
    key: 'editMember',
    default: {}
  });

function List(props) {
    const [listReact, setListReact] = useRecoilState(reactMembers);
    const [listJava, setListjava] = useRecoilState(javaMembers);
    const [member, setMember] = useRecoilState(editMember);

    const tranferMember = (value, index) => {
        if (value.memberClass === "react") {
            const newMember = { ...value };
            newMember.memberClass = "java";
            const newArr = [...listReact];
            newArr.splice(index, 1);
            setListReact(newArr);
            setListjava([...listJava, newMember]);
        }
        else {
            const newMember = { ...value };
            newMember.memberClass = "react";
            const newArr = [...listJava];
            newArr.splice(index, 1);
            setListjava(newArr);
            setListReact([...listReact, newMember]);
        }
    }
    const setDataEdit = (value, index) => {
        setMember({...value, index: index});
        console.log(value)
    }

    const deleteMember = (value, index) => {
        if (value.memberClass === "react") {
            const newArr = [...listReact];
            newArr.splice(index, 1);
            setListReact(newArr);
        }
        else {
            const newArr = [...listJava];
            newArr.splice(index, 1);
            setListjava(newArr);
        }
    }

    return (
        <div className='list-member'>
            <div className='list-react'>
                <h2>list member of React class</h2>
                {
                    listReact.length > 0 ? listReact.map((value, index) => {
                        return (
                            <div key={index}>name: {value.memberName} - age: {value.memberAge}
                                <button onClick={() => tranferMember(value, index)}>tranfer</button>
                                <button onClick={() => deleteMember(value, index)}>delete</button>
                                <button onClick={() => setDataEdit(value, index)}>
                                    <Link to='/edit-member'>edit</Link>
                                </button>
                            </div>
                        )
                    }) : "empty class"
                }
            </div>
            <div className='list-java'>
                <h2>list member of Java class</h2>
                {
                    listJava.length > 0 ? listJava.map((value, index) => {
                        return (
                            <div key={index}>name: {value.memberName} - age: {value.memberAge}
                                <button onClick={() => tranferMember(value, index)}>tranfer</button>
                                <button onClick={() => deleteMember(value, index)}>delete</button>
                                <button onClick={() => setDataEdit(value, index)}>
                                    <Link to='/edit-member'>edit</Link>
                                </button>
                            </div>
                        )
                    }) : "empty class"
                }
            </div>
        </div>
    );
}

export default List;