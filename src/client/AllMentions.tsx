import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Chirp } from "./utils/types";

export interface SingleChirpProps { };

const AllMentions: React.FC<SingleChirpProps> = (props) => {
    const { id } = useParams<{ id: string }>();
    const [chirp, setSingleChirp] = useState<Chirp>(null);

    const getSingleChirp = async () => {
        let r = await fetch("/api/chirps/permalink/" + id);
        let singleChirpJson = await r.json();
        setSingleChirp(singleChirpJson);
    };

    useEffect(() => {
        getSingleChirp();
    }, []);

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center tall">
                <div className="col-8 d-flex flex-column align-items-center">
                    <div className="card full-width shadow m-2 p-3">
                        <h3>All Mentions</h3>
                    </div>
                    <Link to={"/"}><button className="btn btn-primary btn-sm">Home</button></Link>
                </div>
            </div>
        </>
    );
};

export default AllMentions;