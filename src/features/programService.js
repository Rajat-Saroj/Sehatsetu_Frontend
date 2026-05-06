import axios from 'axios';

const API_URL = 'http://localhost:5000/api/programs/';

// Fetches ALL programs for the Catalogue
const getPrograms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetches ONE specific program for the Details Page
const getProgram = async (programId) => {
  const response = await axios.get(API_URL + programId);
  return response.data;
};

const programService = {
  getPrograms,
  getProgram, // <-- This is what was missing!
};

export default programService;