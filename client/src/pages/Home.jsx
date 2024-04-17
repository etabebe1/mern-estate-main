import React, { useState, useEffect } from "react";
import axios from "axios";

// Importing swiper library
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { Link } from "react-router-dom";

// Importing component
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerList, setOfferList] = useState([]);
  const [rentList, setRentList] = useState([]);
  const [saleList, setSaleList] = useState([]);
  SwiperCore.use([Navigation]);

  // LOGS:
  // console.log("offer", offerList);
  // console.log("rent", rentList);
  // console.log("sale", saleList);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/listing/search?offer=true&limit=4`
        );

        const { data } = response;
        setOfferList(data);

        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/listing/search?type=rent&limit=4`
        );

        const { data } = response;
        setRentList(data);

        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/listing/search?type=sale&limit=4`
        );

        const { data } = response;
        setSaleList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListing();
  }, []);

  return (
    <main className="text-white pt-20 ">
      {/* top side */}
      <section className="top-side-container py-6 px-3 max-w-4xl flex justify-center mx-auto">
        <div className="header space-y-6">
          <h1 className="text-3xl sm:text-6xl font-semibold text-white">
            Find your next <span className="text-white/50">perfect</span> place
            ease
          </h1>

          <p className="max-w-lg text-sm sm:text-base">
            Verse-Estate will help you find your home fast, easy and
            comfortable. Our expert support are always available
          </p>

          <h3 className="text-lg font-semibold text-amber-700">
            Let's start now...
          </h3>
        </div>
      </section>

      {/* swiper container */}
      <section className="swiper-container h-full w-full">
        <Swiper navigation>
          {offerList &&
            offerList.length > 0 &&
            offerList.map((list, index) => (
              <SwiperSlide key={index + 1}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${list.imgUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      {/* listing result for offer, sale and rent */}
      <section className="listing-container max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10  justify-center">
        {offerList && offerList.length > 0 && (
          <div className="offer-container space-y-5">
            <div className="link-container">
              <h2 className="text-2xl font-semibold">Recent offers</h2>
              <Link
                to={`/search?offer=true`}
                className="text-sm hover:underline transition duration-500 text-amber-700"
              >
                Show more offers
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {offerList.map((list, index) => (
                <ListingItem list={list} key={index + 1} />
              ))}
            </div>
          </div>
        )}

        {rentList && rentList.length > 0 && (
          <div className="rent-container space-y-5">
            <div className="link-container">
              <h2 className="text-2xl font-semibold">Recent place for rent</h2>
              <Link
                to={`/search?type=rent`}
                className="text-sm hover:underline transition duration-500 "
              >
                Show more rent options
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {rentList.map((list, index) => (
                <ListingItem list={list} key={index + 1} />
              ))}
            </div>
          </div>
        )}

        {saleList && saleList.length > 0 && (
          <div className="sale-container space-y-5">
            <div className="link-container">
              <h2 className="text-2xl font-semibold">Recent place for sale</h2>
              <Link
                to={`/search?type=sale`}
                className="text-sm hover:underline transition duration-500 text-amber-700"
              >
                Show more sale options
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {saleList.map((list, index) => (
                <ListingItem list={list} key={index + 1} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
