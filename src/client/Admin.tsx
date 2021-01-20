import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Chirp, MB } from "./utils/types";
import Modal from "./Modal";

export interface AdminProps { };

const Admin: React.FC<AdminProps> = (props) => {
    const { id } = useParams<{ id: string }>();
    const [allUsers, setAllUsers] = useState<Array<any>>([]);
    const [user, setUser] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const [msg, setMsg] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [modalBtns, setModalBtns] = useState<MB>({ close: true, home: false, destroy: false });

    const getSingleChirp = async () => {
        getUsers();
        let r: Response = await fetch("/api/chirps/" + id);
        let singleChirpJson: Chirp = await r.json();
        setUserId(singleChirpJson.userid);
        setMsg(singleChirpJson.content);
        setLocation(singleChirpJson.location);
    };

    const getUsers = async () => {
        let r = await fetch("/api/users/");
        let allUsersJson = await r.json();
        setAllUsers(allUsersJson);
    };

    const editChirp = async () => {
        let editedChirp: Chirp = {
            userid: userId,
            content: msg,
            location
        };

        let myMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(editedChirp)
        }
        let put: Response = await fetch("/api/chirps/" + id, myMethod);
        setModalDisplay(true);
        setModalMessage("Chirp Edited!")
        setModalBtns({close: false, home: true, destroy: false});
    };

    const destroyChirp = () => {
        setModalDisplay(true);
        setModalMessage("Are you sure you want to delete this Chirp?");
        setModalBtns({ close: false, home: true, destroy: true });
    }

    const confirmDestroy = async () => {
        setModalMessage("DELETED!");
        setMsg("DELETED!");
        setLocation("DELETED!");
        setModalBtns({ close: false, home: true, destroy: false });

        let myMethod = {
            method: 'DELETE'
        }
        let destroy: Response = await fetch("/api/chirps/" + id, myMethod);
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserId(Number(e.target.value));
    };

    const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }

    useEffect(() => {
        getSingleChirp();
    }, []);

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center tall">
                <div className="col-8 d-flex flex-column align-items-center">
                    <h1>Admin Panel</h1>
                    <div className="card full-width shadow m-2 p-3">
                        <label className="sr-only">User:</label>
                        <select id="user-select" onChange={handleUserChange} value={userId} className="m-3">
                        <option value="null">- Select User -</option>
                            {allUsers?.map(x => (
                                    <option key={x.id} value={x.id}>{x.name}</option>
                            ))}
                        </select>
                        <div className="p-2"></div>
                        <label>Chirp</label><textarea value={msg} onChange={handleMsgChange} ></textarea>
                        <label className="sr-only">Location:</label>
                        <div className="m-3">Chirping From: <input type="text" value={location} onChange={handleLocationChange}></input></div>
                        <div className="d-flex full-width justify-content-between p-3">
                            <button className="btn btn-primary btn-sm" onClick={editChirp}>Submit Edit</button>
                            <Link to={"/"} className="btn btn-info btn-sm">Cancel Edit</Link>
                            <button className="btn btn-danger btn-sm" onClick={destroyChirp}>Delete Chirp</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal display={modalDisplay} btns={modalBtns} destroyFunction={confirmDestroy}>{modalMessage}</Modal>
        </>
    );
};

export default Admin;  