"use client";

import Image from "next/image";
import { useState } from "react";
import "./recap.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


type GalleryItem = {
  id: number;
  type: "image" | "video";
  category: "Events" | "Workshops" | "Talks" | "Competitions" | "Cultural";
  src: string;
  title: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "image",
    category: "Events",
    src: "/images/recap1.jpg",
    title: "Opening Ceremony",
  },
  {
    id: 2,
    type: "image",
    category: "Events",
    src: "/images/recap2.jpg",
    title: "The Mechnovate Crowd",
  },
  {
    id: 3,
    type: "image",
    category: "Talks",
    src: "/images/recap3.jpg",
    title: "Expert Talk",
  },
  {
    id: 4,
    type: "image",
    category: "Competitions",
    src: "/images/recap4.jpg",
    title: "Technical Competition",
  },
  {
    id: 5,
    type: "image",
    category: "Workshops",
    src: "/images/recap5.jpg",
    title: "Hands-on Workshop",
  },
  {
    id: 6,
    type: "image",
    category: "Events",
    src: "/images/recap13.jpg",
    title: "Moments from Mechnovate",
  },
  {
    id: 7,
    type: "image",
    category: "Cultural",
    src: "/images/recap7.jpg",
    title: "Cultural Night",
  },
  {
    id: 8,
    type: "image",
    category: "Events",
    src: "/images/recap8.jpg",
    title: "Unforgettable Moments",
  },
  {
    id: 9,
    type: "image",
    category: "Talks",
    src: "/images/recap9.jpg",
    title: "Ideas in Motion",
  },
  {
    id: 10,
    type: "image",
    category: "Workshops",
    src: "/images/recap10.jpg",
    title: "Building Together",
  },
  {
    id: 11,
    type: "image",
    category: "Competitions",
    src: "/images/recap11.jpg",
    title: "The Competition Floor",
  },
  {
    id: 12,
    type: "image",
    category: "Cultural",
    src: "/images/recap12.jpg",
    title: "Celebrating Together",
  },
];

const filters = [
  "All",
  "Events",
  "Workshops",
  "Talks",
  "Competitions",
  "Cultural",
];

export default function RecapPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
    <Header />
    <main className="recap-page">

      {/* =====================================================
          SECTION 1 — HERO COLLAGE
      ====================================================== */}

      <section className="recap-hero">

        <div className="hero-grid" />

        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        {/* Left top image */}
        <div className="polaroid polaroid-one">
          <div className="polaroid-image">
            <Image
              src="/images/recap1.jpg"
              alt="Mechnovate 25 event"
              fill
              priority
              sizes="(max-width: 768px) 45vw, 300px"
            />
          </div>
          <span>Unforgettable Moments</span>
        </div>

        {/* Left middle image */}
        <div className="polaroid polaroid-two">
          <div className="polaroid-image">
            <Image
              src="/images/recap5.jpg"
              alt="Mechnovate 25 talk"
              fill
              priority
              sizes="(max-width: 768px) 35vw, 240px"
            />
          </div>
          <span>Hands-on Innovation</span>
        </div>

        {/* Left bottom image */}
        <div className="polaroid polaroid-three">
          <div className="polaroid-image">
            <Image
              src="/images/recap3.jpg"
              alt="Mechnovate 25 workshop"
              fill
              priority
              sizes="(max-width: 768px) 40vw, 270px"
            />
          </div>
          <span>Inspiring Talks</span>
        </div>

        {/* Right top image */}
        <div className="polaroid polaroid-four">
          <div className="polaroid-image">
            <Image
              src="/images/recap2.jpg"
              alt="Mechnovate 25 participants"
              fill
              priority
              sizes="(max-width: 768px) 40vw, 280px"
            />
          </div>
          <span>People & Community</span>
        </div>

        {/* Right middle image */}
        <div className="polaroid polaroid-five">
          <div className="polaroid-image">
            <Image
              src="/images/recap4.jpg"
              alt="Mechnovate 25 stage"
              fill
              priority
              sizes="(max-width: 768px) 40vw, 300px"
            />
          </div>
          <span>Ideas in Motion</span>
        </div>

        {/* Center content */}
        <div className="hero-content">

          <p className="hero-kicker">
            SAME IDEAS. BIGGER HORIZONS.
          </p>

          <h1>
            MECHNOVATE<span>’25</span>
          </h1>

          <div className="hero-recap">
            RECAP
          </div>

          <p className="hero-description">
            A year of ideas, people and impact.
          </p>

          <div className="hero-line" />

          <p className="hero-note">
            A look back at the moments that brought
            innovation, creativity and community together.
          </p>

        </div>

       

        <div className="hero-side-text hero-side-text-right">
          MORE THAN
          <br />
          AN EVENT
        </div>

      </section>


      {/* =====================================================
          SECTION 2 — ABOUT
      ====================================================== */}

      <section className="recap-about">

        <div className="section-label">
          ABOUT
        </div>

        <div className="about-layout">

          <div className="about-content">

            <h2>
              MECHNOVATE<span>’25</span>
            </h2>

            <p className="about-lead">
              A celebration of innovation.
            </p>

            <p>
              Mechnovate’25 brought together curious minds,
              bold ideas and unstoppable energy. From
              thrilling competitions to insightful talks and
              hands-on workshops, the event created a space
              where innovation met community.
            </p>

            <p>
              Here's a look back at the moments, people and
              ideas that made Mechnovate’25 unforgettable.
            </p>

            <div className="stats">

              <div className="stat">
                <strong>3K+</strong>
                <span>Participants</span>
              </div>

              <div className="stat">
                <strong>25+</strong>
                <span>Events</span>
              </div>

              <div className="stat">
                <strong>50+</strong>
                <span>Colleges</span>
              </div>

              <div className="stat">
                <strong>∞</strong>
                <span>Memories</span>
              </div>

            </div>

          </div>


          {/* About collage */}

          <div className="about-collage">

            <div className="about-photo about-photo-main">
              <Image
                src="/images/recap7.jpg"
                alt="Mechnovate 25 main event"
                fill
                sizes="(max-width: 900px) 80vw, 500px"
              />
            </div>

            <div className="about-photo about-photo-small about-photo-two">
              <Image
                src="/images/recap8.jpg"
                alt="Mechnovate 25 event moment"
                fill
                sizes="300px"
              />
            </div>

            <div className="about-photo about-photo-small about-photo-three">
              <Image
                src="/images/recap9.jpg"
                alt="Mechnovate 25 robotics"
                fill
                sizes="300px"
              />
            </div>

         

          </div>

        </div>

      </section>

            {/* =====================================================
          SECTION 3 — RECAP VIDEO
      ====================================================== */}

      <section className="recap-video-section">
        <div className="recap-video-heading">
          <div className="section-label">THE EXPERIENCE</div>

          <h2>
            RELIVE THE <span>MOMENTS</span>
          </h2>

          <p>
            A glimpse into the energy, ideas and memories that made
            Mechnovate&apos;25 unforgettable.
          </p>
        </div>

        <div className="recap-video-wrapper">
          <video
            className="recap-video"
            src="/images/recap14.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </section>


      {/* =====================================================
          SECTION 3 — GALLERY
      ====================================================== */}

      <section className="recap-gallery">

        <div className="gallery-heading">

          <div>
            <div className="section-label">
              GALLERY
            </div>

            <h2>
              HIGHLIGHTS FROM{" "}
              <span>MECHNOVATE’25</span>
            </h2>

            <p>
              Moments that tell our story better than words.
            </p>
          </div>

        </div>


        {/* Filters */}

        <div className="gallery-filters">

          {filters.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "filter active"
                  : "filter"
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}

        </div>


        {/* Gallery */}

        <div className="gallery-grid">

          {filteredItems.map((item) => (

            <div
              className={`gallery-card ${
                item.type === "video"
                  ? "gallery-video"
                  : ""
              }`}
              key={item.id}
            >

              <div className="gallery-image">

                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="
                    (max-width: 600px) 92vw,
                    (max-width: 1000px) 45vw,
                    23vw
                  "
                />

                {item.type === "video" && (
                  <div className="video-play">
                    <span />
                  </div>
                )}

                <div className="gallery-overlay">
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
    <Footer />
    </>
  );
}