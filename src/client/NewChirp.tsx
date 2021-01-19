import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Modal from "./Modal";
import { Chirp } from "./utils/types";

export interface NewChirpProps { };

const NewChirp: React.FC<NewChirpProps> = (props) => {
    const [modalType, setModalType] = useState<string>("none");
    const [allUsers, setAllUsers] = useState<Array<any>>([]);
    const [user, setUser] = useState<string>('');
    const [msg, setMsg] = useState<string>('');

    const submitChirp = async () => {
        let finalSubmit: Chirp = {
            userid: Number(user),
            content: msg,
            location: "Test"
        };
        let myMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(finalSubmit)
        }
        let r: Response = await fetch("/api/chirps/new", myMethod);
        setModalType("new");
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUser(e.target.value);
    };

    const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value);
    };

    const getUsers = async () => {
        let r = await fetch("/api/users/");
        let allUsersJson = await r.json();
        setAllUsers(allUsersJson);
    }

    const showState = () => {
        console.log(user, msg);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center tall">
                <div className="col-8 d-flex flex-column align-items-center">
                    <h1>Post New Chirp</h1>
                    <div className="card full-width shadow m-2 p-3">
                        <label className="sr-only">User:</label>
                        <select id="user-select" onChange={handleUserChange} className="mb-2">
                        <option value="null">- Select User -</option>
                            {allUsers?.map(x => (
                                <option key={x.id} value={x.id}>{x.name}</option>
                            ))}
                        </select>
                        <label className="sr-only">Chirp:</label><textarea placeholder="Chirp" onChange={handleMsgChange} ></textarea>
                        <div className="d-flex full-width justify-content-between p-3">
                            <Link to={"/"} className="btn btn-info btn-sm">Cancel</Link>
                            <button className="btn btn-primary btn-sm" onClick={submitChirp}>Submit Chirp</button>
                            <button onClick={showState}>Show State</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal type={modalType} user={user} msg={msg}></Modal>
        </>
    );
};

export default NewChirp;