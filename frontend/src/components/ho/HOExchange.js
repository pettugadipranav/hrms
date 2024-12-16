import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HOExchange = () => {
    const [mutualRequests, setMutualRequests] = useState([]);

    useEffect(() => {
        fetchMutualRequests();
    }, []);

    const fetchMutualRequests = () => {
        axios.get(`http://localhost:5000/roomexchange_approval`)
            .then(response => {
                console.log(response.data);
                setMutualRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching room exchange approval:', error);
            });
    }

    const handleApprove = (index) => {
        const [request1, request2] = mutualRequests[index];
        const req1id = request1.id;
        const req2id = request2.id;
        const req1from = request1.room_number_from;
        const req2from = request2.room_number_from;

        axios.post(`http://localhost:5000/roomexchange_approval`, { req1id, req2id, req1from, req2from })
            .then(response => {
                console.log(response.data);
                // Refetch the data after approval
                fetchMutualRequests();
            })
            .catch(error => {
                console.error('Error approving room exchange:', error);
            });
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Room Exchange Approval</h2>
            {mutualRequests.map((pair, index) => (
                <div key={index} className="row justify-content-center align-items-center mb-4">
                    <div className='card  justify-content-center  align-items-center  '>
                        <div className="card-body">
                            <div className="row ">
                                <div className="col-md-5">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">Request 1</h5>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    <p><strong>ID:</strong> {pair[0]?.id}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>Created Time:</strong> {pair[0]?.created_time}</p>
                                                </div>
                                            </div>
                                            <p><strong>Description:</strong> {pair[0]?.room_exchange_description}</p>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p><strong>From:</strong> {pair[0]?.room_number_from}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>To:</strong> {pair[0]?.room_number_to}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">Request 2</h5>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    <p><strong>ID:</strong> {pair[1]?.id}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>Created Time:</strong> {pair[1]?.created_time}</p>
                                                </div>
                                            </div>
                                            <p><strong>Description:</strong> {pair[1]?.room_exchange_description}</p>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p><strong>From:</strong> {pair[1]?.room_number_from}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>To:</strong> {pair[1]?.room_number_to}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex justify-content-center align-items-center">
                                    <button className="btn btn-success btn-lg btn-approve" onClick={() => handleApprove(index)}>Approve</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HOExchange;
