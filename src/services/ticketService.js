// src/services/ticketService.js
import axios from "axios";

const API_URL = "http://localhost:5000/tickets";

// ✅ Get all tickets
export const getTickets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✅ Get single ticket
export const getTicketById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✅ Create ticket
export const createTicket = async (ticketData) => {
  const response = await axios.post(API_URL, ticketData);
  return response.data;
};

// ✅ Update ticket
export const updateTicket = async (id, ticketData) => {
  const response = await axios.put(`${API_URL}/${id}`, ticketData);
  return response.data;
};

// ✅ Delete ticket
export const deleteTicket = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
