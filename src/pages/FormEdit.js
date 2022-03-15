import React, { useEffect } from 'react';
import {
    useRecoilState
} from 'recoil';
import { useForm } from "react-hook-form";
import { reactMembers } from '../App.js';
import { javaMembers } from '../App.js';
import { editMember } from './List.js'

function FormEdit(props) {
    const [listReact, setListReact] = useRecoilState(reactMembers);
    const [listJava, setListjava] = useRecoilState(javaMembers);
    const [member, setMember] = useRecoilState(editMember);
    const { register, handleSubmit, setValue, setFocus } = useForm();
    const onLoginSubmit = (data) => {
        if (member.memberClass === 'react') {
            if (data.memberClass === 'react') {
                const newArr = [...listReact];
                newArr.splice(member.index, 1, data);
                setListReact(newArr);
            }
            else {
                const newArr = [...listReact];
                newArr.splice(member.index, 1);
                setListReact(newArr);
                setListjava([...listJava, data]);
            }
        }
        else {
            if (data.memberClass === 'java') {
                const newArr = [...listJava];
                newArr.splice(member.index, 1, data);
                setListjava(newArr);
            }
            else{
                const newArr = [...listJava];
                newArr.splice(member.index, 1);
                setListjava(newArr);
                setListReact([...listReact, data]);
            }
        }
        setMember({})
    };

    useEffect(() => {
        setValue('memberName', member.memberName);
        setValue('memberAge', member.memberAge);
        setValue('memberClass', member.memberClass);
        setFocus('memberName');
    });

    return (
        <div>
            <h2>Form edit member</h2>
            <form onSubmit={handleSubmit(onLoginSubmit)}>
                <label htmlFor="name">name</label>
                <input {...register("memberName", { required: true })}></input>
                <label htmlFor="age">age</label>
                <input {...register("memberAge", { required: true })}></input>
                <select {...register("memberClass")}>
                    <option value="react">react</option>
                    <option value="java">java</option>
                </select>
                <br />
                <button type="submit">edit member</button>
            </form>
        </div>
    );
}

export default FormEdit;