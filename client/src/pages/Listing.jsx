import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // LOGS:
  // console.log(params)
  // console.log(listing);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await axios.get(
          `http://localhost:8800/api/listing/getListItem/${params.listing}`
        );

        setListing(response.data);

        setIsLoading(false);
        setError(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, [params.listing]);

  return (
    <main>
      {isLoading && <p className="text-white my-7 text-2xl">Loading...</p>}
      {error && <p className="text-white">Something went wrong!</p>}
      {listing && !isLoading && !error && (
        <div className="text-white">
          <Swiper navigation>
            {listing.imgUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
}
