import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState(""); // State for the input
  const [response, setResponse] = useState(""); // State for the API response
  const [loading, setLoading] = useState(false); // State for loading status

  // Fetch data function
  const fetchData = async (query) => {
    setLoading(true); // Set loading to true when the API call starts
    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
      headers: {
        'x-rapidapi-key': '8e9e59a764msh71bd60a47663107p1c5a05jsn590fe13709bb',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        messages: [
          {
            role: 'user',
            content: query, // Use the query from user input
          },
        ],
        web_access: false,
      },
    };

    try {
      const res = await axios.request(options);
      console.log('Response:', res.data);
      setResponse(res.data.result || 'No response from API');
      setQuery("");
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setResponse("Error fetching response");
    } finally {
      setLoading(false); // Set loading to false when the API call finishes
    }
  };

  // Handle form submit or input change
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(query); // Fetch data based on the input query
  };

  return (
    <div className="w-full h-screen text-center bg-zinc-800 text-white">
      <h1 className='pt-4'>What Can I Help With?</h1>
      <div className="search flex justify-center items-center">
        <input 
          className="w-1/2 outline-none bg-zinc-700 rounded mt-6 h-16 p-6"
          type="text" 
          placeholder="Message ChatVATS" 
          onChange={(e) => setQuery(e.target.value)} 
          value={query} 
        />
        <div className="flex justify-center ml-4">
          <button 
            className="bg-blue-500 text-white px-8 py-4 rounded mt-6"
            onClick={handleSubmit}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Loading..." : "Send"} {/* Show "Loading..." while fetching */}
          </button>
        </div>
      </div>
      
      <div className="text flex justify-center mt-10 text-white h-[420px]">
        <textarea 
          value={loading ? "Fetching data..." : response} // Show loading text in textarea
          className="w-3/4 outline-none rounded bg-zinc-700 p-6"
          readOnly 
        />
      </div>
    </div>
  );
};

export default App;
