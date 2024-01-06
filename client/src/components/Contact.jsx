import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  // LOGS:
  landlord && console.log(landlord);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  let accessToken = document.cookie
    .split(";")
    .find((token) => token.trim().startsWith("accessToken="))
    .split("=");

  accessToken = accessToken[accessToken.length - 1];

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8800/api/user/get/${listing.userRef}`,
          { accessToken }
        );
        setLandlord(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [accessToken, listing.userRef]);

  return (
    <div className="text-white">
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg text-slate-700 text-sm md:text-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-amber-900 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}
