import * as React from "react";
import { Link } from 'react-router-dom';

export interface ModalProps {
    type: string,
    function?: VoidFunction,
    user: string,
    msg: string
};

const Modal: React.FC<ModalProps> = (props) => {
    switch (props.type) {
        case "edit":
            return (
                <>
                    <div className="modal-container">
                        <div className="my-pop-up">
                            <h2>Chirp has been updated</h2>
                            <h4 className="mt-2">@{props.user}</h4>
                            <p className="mb-4">{props.msg}</p>
                            <Link to={"/"}><button className="btn btn-primary">Return Home</button></Link>
                        </div>
                    </div>
                </>
            );
            break;
        case "destroy":
            return (
                <>
                    <div className="modal-container">
                        <div className="my-pop-up">
                            <h2>Are you sure you want to delete this Chirp?</h2>
                                <h4 className="mt-2">@{props.user}</h4>
                                <p className="mb-4">{props.msg}</p>
                            <div className="d-flex justify-content-between width-50">
                                <Link to={"/"}><button className="btn btn-primary">Cancel</button></Link>
                                <button className="btn btn-danger" onClick={props.function}>Delete</button>
                            </div>
                        </div>
                    </div>
                </>
            );
            break;
        case "destroyed":
            return (
                <>
                    <div className="modal-container">
                        <div className="my-pop-up">
                            <h2>Chirp Deleted</h2>
                            <Link to={"/"}><button className="btn btn-primary">Return Home</button></Link>
                        </div>
                    </div>
                </>
            );
            break;
        case "new":
            return (
                <>
                    <div className="modal-container">
                        <div className="my-pop-up">
                            <h2>New Chirp Posted!</h2>
                            <h3 className="mt-2">@{props.user}</h3>
                            <p className="mb-4">{props.msg}</p>
                            <Link to={"/"}><button className="btn btn-primary">Return Home</button></Link>
                        </div>
                    </div>
                </>
            );
            break;
        case "none":
            return (<> </>);
            break;
    }
};

export default Modal;