import * as React from "react";
import { useState, useEffect, useCallback } from "react";
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
    const [modalBtns, setModalBtns] = useState<MB>({ close: true, home: false });

    let mention: M = {
        name: undefined,
        userId: undefined
    };

    interface M { // M is for Mention --
        name: string | undefined,
        userId: number | undefined
    };

    interface R { // R is for Record --
        userId: number,
        chirpId: number
    };

    const formatCheck = async () => {
        // Determines if a Chirp is formatted correctly for the Database -- 
        if (user === null || user === "null") {
            setModalDisplay(true);
            setModalMessage("Please select a User.");
        } else if (msg === "" || msg === " ") {
            setModalDisplay(true);
            setModalMessage("Please enter a Chirp.");
        } else if (location === "" || location === " ") {
            setModalDisplay(true);
            setModalMessage("Please enter a Location.");
        } else {
            mentions(msg);
        }
    }

    const mentions = (msgContent: string) => {
        // Determines if a @User is mentioned in the body of the Chirp --
        let mentionCheck = msgContent.split("@");
        if (mentionCheck.length > 1) { // mentionCheck is an array with the @user in position 1 --
            let nameToFindwTail = mentionCheck[1].split(" ");
            let nameToFind = nameToFindwTail[0]; // Isolates the User in a string --

            let success = false;
            // Determines if the nameToFind variable is in the Users State array --
            for (let i = 0; i < allUsers.length; i++) {
                if (nameToFind === allUsers[i].name) {
                    success = true;
                    mention.userId = i + 1; // Zero and One discrepancy for Array and DB id --
                    mention.name = nameToFind;
                }
            }
            if (success) {
                setModalDisplay(true);
                setModalBtns({ close: false, home: true, destroy: false });
                setModalMessage("You mentioned @" + nameToFind + " in your Chirp!");
            } else {
                setModalDisplay(true);
                setModalBtns({ close: false, home: true, destroy: false });
                setModalMessage("No users found with name @" + nameToFind + ". Chirp Posted Anyway!");
            }
            sendPost(true); // Boolean handles if the default Modal will be called. I know this is a hack --
        } else {
            sendPost(false)
        }
    };

    const sendPost = async (hasMention: Boolean) => { 
        let finalSubmit: Chirp = {
            userid: Number(user),
            content: msg,
            location,
        };
        let myMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(finalSubmit)
        }
        let r: Response = await fetch("/api/chirps/new", myMethod);
        let newId = await r.json();
        let insertId = newId.insertId; // Grabs the insertedId number for possible Mentions Table insert --

        // Mentions Logic --
        if (mention.userId != undefined) {
            let mentionRecord: R = {
                userId: Number(mention.userId),
                chirpId: Number(insertId)
            };
            let myMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(mentionRecord)
            }
            let r: Response = await fetch("/api/chirps/mention/", myMethod)
        }
        if (hasMention === false) {
            // If no mentions are found, valid or otherwise, display this --
            setModalDisplay(true);
            setModalBtns({ close: false, home: true, destroy: false });
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

    const closeModal = () => {
        setModalDisplay(false);
    }

    const getUsers = async () => {
        let r = await fetch("/api/users/");
        let allUsersJson = await r.json();
        setAllUsers(allUsersJson);
    };

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
                        <small>@mentions are case-sensitive and limited to one per Chirp.</small>
                        <label className="sr-only">Location:</label>
                        <div className="m-3">Chirping From: <input type="text" value={location} onChange={handleLocationChange}></input></div>
                        <div className="d-flex full-width justify-content-between p-3">
                            <Link to={"/"} className="btn btn-info btn-sm">Cancel</Link>
                            <button className="btn btn-primary btn-sm" onClick={formatCheck}>Submit Chirp</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal display={modalDisplay} btns={modalBtns} displayFunction={closeModal}>{modalMessage}</Modal>
        </>
    );
};

export default NewChirp;