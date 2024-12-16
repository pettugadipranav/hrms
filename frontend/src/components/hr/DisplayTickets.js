import React from 'react';
import { useEffect, useState } from "react";

import axios from './axios';

import {
      BrowserRouter as Router,
      Routes,
      Route,
      Link
    } from "react-router-dom";

    function DisplayTickets() {   
      const [tickets, setTickets] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        var hostelBlock = localStorage.getItem("hostel_block");
        console.log("hostelBlock from local storage: ", hostelBlock);
        axios.get(`http://localhost:5000/tickets_hr/${hostelBlock}`)
          .then((response) => {
            setTickets(response.data);
            setLoading(false);
          });
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (tickets.length === 0) {
        return <div>All TICKETS SOLVED</div>;
      }
    
      return (
        <div>
          DISPLAY TICKETS in bootstrap cards:
          
          <div className="row">
            {tickets.map((ticket) => (
              <div className="col-md-4" key={ticket.id} onClick={() => {
                const selectedTicketId = ticket.id; // Assuming you want to store the ID
                const raised_time = ticket.raised_time;
                const title = ticket.title;
                const tag = ticket.tag;
                const ticket_status = ticket.ticket_status;
                const ticket_description = ticket.ticket_description;
                const file_upload = ticket.file_upload;
                const reply = ticket.reply;
                const filtered = ticket.filtered;
    
                const ticketData = JSON.stringify({
                  id: selectedTicketId,
                  raised_time: raised_time,
                  title: title,
                  tag: tag,
                  ticket_status: ticket_status,
                  ticket_description: ticket_description,
                  file_upload: file_upload,
                  reply: reply,
                  filtered: filtered
                });
                localStorage.setItem("selectedTicket", ticketData);
              }}>
                <Link to={{ pathname: "/display_ticket/ticket_details" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">title: {ticket.title}</h5>
                      <p className="card-text">tag: {ticket.tag}</p>
                      <p className="card-text">ticket_status: {ticket.ticket_status}</p>
                      <p className="card-text">filtered:{ticket.filtered}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
    

export default DisplayTickets;