import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { MentionChirp } from "./utils/types";

export interface SingleChirpProps { };

const AllMentions: React.FC<SingleChirpProps> = (props) => {
    const { id } = useParams<{ id: string }>();
    const [allChirps, setAllChirps] = useState<MentionChirp[]>(null);

    const getSingleChirp = async () => {
        let r = await fetch("/api/chirps/mentions/" + id);
        let allChirpsJson = await r.json();
        setAllChirps(allChirpsJson[0]);
    };

    useEffect(() => {
        getSingleChirp();
    }, []);

    return (
        <>
            <div className="container d-flex flex-column align-items-center">
                {allChirps?.map(chirp => (
                    <div key={"chirp-" + chirp.chirpid} className="col-6">
                        <div className="card shadow m-2 p-3">
                            <h3><Link to={"/mentions/" + chirp.chirpAuthorId}>@{chirp.chirpAuthorName}</Link></h3>
                            <p>{chirp.content}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <small>{chirp.location}</small>
                                <small><Link to={"/" + chirp.chirpid}>{chirp._created}</Link></small>
                                <Link to={"/admin/" + chirp.chirpid}><button className="btn btn-primary btn-sm">Admin</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
                <Link to={"/"}><button className="btn btn-primary btn-sm">Home</button></Link>
            </div>
        </>
    );
};

export default AllMentions;