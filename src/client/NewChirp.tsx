import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Modal from "./Modal";
import { Chirp, MB } from "./utils/types";

export interface NewChirpProps { };

const NewChirp: React.FC<NewChirpProps> = (props) => {
    const [allUsers, setAllUsers] = useState<Array<any>>([]);
    const [user, setUser] = useState<string | null>(null);
    const [msg, setMsg] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [modalBtns, setModalBtns] = useState<MB>({close: true, home: false});

    const submitChirp = async () => {
        if(user === null || user === "null") {
            setModalDisplay(true);
            setModalMessage("Please select a User.");
        } else if(msg === "" || msg === " "){
            setModalDisplay(true);
            setModalMessage("Please enter a Chirp.");
        } else if(location === "" || location === " ") {
            setModalDisplay(true);
            setModalMessage("Please enter a Location.");
        } else {
            let finalSubmit: Chirp = {
                userid: Number(user),
                content: msg,
                location
            };
            let myMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(finalSubmit)
            }
            let r: Response = await fetch("/api/chirps/new", myMethod);
            setModalDisplay(true);
            setModalBtns({close: false, home: true});
            setModalMessage("New Chirp Posted!");
        }
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUser(e.target.value);
    };

    const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }

    const getUsers = async () => {
        let r = await fetch("/api/users/");
        let allUsersJson = await r.json();
        setAllUsers(allUsersJson);
    };

    const closeModal = () => {
        setModalDisplay(false);
    }

    const showState = () => {
        console.log(user, msg, location);
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
                        <select id="user-select" onChange={handleUserChange} className="m-3">
                        <option value="null">- Select User -</option>
                            {allUsers?.map(x => (
                                <option key={x.id} value={x.id}>{x.name}</option>
                            ))}
                        </select>
                        <label className="sr-only">Chirp:</label><textarea placeholder="Chirp" onChange={handleMsgChange}></textarea>
                        <label className="sr-only">Location:</label>
                        <div className="m-3">Chirping From: <input type="text" value={location} onChange={handleLocationChange}></input></div>
                        <div className="d-flex full-width justify-content-between p-3">
                            <Link to={"/"} className="btn btn-info btn-sm">Cancel</Link>
                            <button className="btn btn-primary btn-sm" onClick={submitChirp}>Submit Chirp</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal display={modalDisplay} btns={modalBtns} displayFunction={closeModal}>{modalMessage}</Modal>
        </>
    );
};

export default NewChirp;