import React from "react";

export default function Home() {
  return (
    <main className="text-white max-w-4xl w-full flex justify-center mx-auto pt-20">
      {/* top side */}
      <section className="top-side-container">
        <div className="header space-y-6">
          <h1 className="text-6xl font-semibold text-white">
            Find your next <span className="text-white/50">perfect</span> place
            ease
          </h1>

          <p className="max-w-lg">
            Verse-Estate will help you find your home fast, easy and
            comfortable. Our expert support are always available
          </p>

          <h3 className="text-lg font-semibold text-amber-700">
            Let's start now...
          </h3>
        </div>
      </section>

      {/* swiper container */}
      <section className="swiper-container"></section>

      {/* listing result for offer, sale and rent */}
      <section className="listing-container"></section>
    </main>
  );
}
