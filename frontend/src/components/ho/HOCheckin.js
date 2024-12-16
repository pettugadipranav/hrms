import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Popup = ({ checkin, onClose }) => {
    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header justify-content-between align-items-end ">
                        <h5 className="modal-title">Details</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times; close</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Reason:</strong> {checkin.reason}</p>
                        <div className="d-flex justify-content-between align-items-end">
                            <p><strong>Start Time:</strong> {checkin.start_time_formatted}</p>
                            <p><strong>End Time:</strong> {checkin.end_time_formatted}</p>
                        </div>
                        <a href={`http://localhost:5000/${checkin.file_upload}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">See proof</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

const HOCheckin = () => {
    const [checkinApproval, setCheckinApproval] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error_for, setError_for] = useState(null);
    const [selectedCheckin, setSelectedCheckin] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/checkin_approval`)
            .then(response => {
                console.log(response.data);
                setCheckinApproval(response.data);
            })
            .catch(error => {
                console.log(error);
                setError_for('Error fetching checkin approval. Please try again later.');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleApprove = (id, start_time_formatted) => {
        console.log('Approving checkin:', id, start_time_formatted);
        axios.post(`http://localhost:5000/checkin_approval/approve`, { id, start_time_formatted })
            .then(response => {
                setCheckinApproval(checkinApproval.filter(checkin => checkin.id !== id));
            })
            .catch(error => {
                setError_for('Error approving checkin. Please try again later.');
            });
    }

    const handleDetails = (checkin) => {
        setSelectedCheckin(checkin);
    }

    const closePopup = () => {
        setSelectedCheckin(null);
    }

    return (
        <div className="container">
            <h1 className="mt-4">Checkin Approval</h1>
            {error_for && <div className="alert alert-danger">{error_for}</div>}
            {loading ? (
                <p>Loading...</p>
            ) : checkinApproval.length === 0 ? (
                <p>No checkin approvals</p>
            ) : (
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        {checkinApproval.map((checkin, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{checkin.title}</h5>
                                    <p className="card-text">ID: {checkin.id}</p>
                                    <div className="d-flex justify-content-between align-items-end">
                                        <button onClick={() => handleDetails(checkin)} className="btn btn-primary">Details</button>
                                        <button onClick={() => handleApprove(checkin.id, checkin.start_time_formatted)} className="btn btn-success">Approve</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedCheckin && <Popup checkin={selectedCheckin} onClose={closePopup} />}
        </div>
    );
}

export default HOCheckin;
