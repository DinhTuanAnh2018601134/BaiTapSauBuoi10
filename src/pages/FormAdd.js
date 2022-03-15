import React, { useEffect } from 'react';
import {
    useRecoilState
} from 'recoil';
import { useForm } from "react-hook-form";
import { reactMembers } from '../App.js';
import { javaMembers } from '../App.js';

function FormAdd(props) {
    const [listReact, setListReact] = useRecoilState(reactMembers);
    const [listJava, setListjava] = useRecoilState(javaMembers);
    const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm();
    const onLoginSubmit = (data) => {
        if(data.memberClass === "react")
            setListReact([...listReact, data]);
        else
            setListjava([...listJava, data]);
        reset();
    };
    useEffect(() => {
        setFocus('memberName');
    },[setFocus])

    return (
        <div>
            <h2>Form add member</h2>
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
                <button type="submit">add member</button>
            </form>
        </div>
    );
}

export default FormAdd;