"use client";



import { useEffect, useState } from "react";

import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

import "./events.css";



type Event = {

  id: string;

  title: string;

  subtitle: string;

  description: string;

  category: string;

  image: string;

  poster: string;

};



const events: Event[] = [

  {

    id: "01",

    title: "DIVE X",

    subtitle: "SUBMARINE WORKSHOP",

    description:

      "Dive into the world of underwater engineering with DIVE X, a hands-on submarine workshop that explores the fundamentals of underwater vehicles, buoyancy, propulsion, and control systems. Participants will gain practical insights into how submarines operate beneath the surface while exploring the engineering principles behind their design and movement.",

    category: "WORKSHOP",

    image: "/images/events/DiveX.png",

    poster: "/images/events/DiveX.png",

  },

  {

    id: "02",

    title: "CUBESAT",

    subtitle: "SPACE SYSTEMS WORKSHOP",

    description:

      "Explore the fascinating world of satellites through the CubeSat Workshop. Designed to introduce participants to the fundamentals of space systems and satellite engineering, this workshop takes you through the key concepts behind building a compact satellite. Participants will learn how a CubeSat is structured, how its subsystems work together, and how engineers design spacecraft to operate in the challenging environment of space.",

    category: "WORKSHOP",

    image: "/images/events/CubeSat.png",

    poster: "/images/events/CubeSat.png",

  },

  {

    id: "03",

    title: "RC RACING",

    subtitle: "RACING COMPETITION",

    description:

      "Speed, precision, control, and strategy come together on the track. The RC Racing Competition challenges participants to push their remote-controlled cars to the limit while navigating a demanding racing circuit. Participants will put their driving skills, reflexes, and machine control to the test as they race against the clock and their competitors.",

    category: "COMPETITION",

    image: "/images/events/RCRacing.png",

    poster: "/images/events/RCRacing.png",

  },

  {

    id: "04",

    title: "DRONE RUSH",

    subtitle: "DRONE WORKSHOP",

    description:

      "Take your first flight into the world of drones with Drone Rush, a hands-on workshop that introduces participants to the fundamentals of drone technology. Learn how drones are designed, assembled, controlled, and operated while gaining practical exposure to the components and systems that make them fly.",

    category: "WORKSHOP",

    image: "/images/events/DroneRush.png",

    poster: "/images/events/DroneRush.png",

  },

];



export function EventsSection() {
  const AUTO_PLAY_MS = 3800;

  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const activeEvent = events[activeEventIndex];

  const selectedIndex = selectedEvent
    ? events.findIndex((event) => event.id === selectedEvent.id)
    : -1;

  const showEvent = (index: number) => {
    const nextIndex = (index + events.length) % events.length;
    if (nextIndex === activeEventIndex) return;

    const isForward =
      nextIndex > activeEventIndex ||
      (activeEventIndex === events.length - 1 && nextIndex === 0);

    setDirection(isForward ? 1 : -1);
    setActiveEventIndex(nextIndex);
  };

  const openActiveEvent = () => {
    setSelectedEvent(activeEvent);
  };

  const goToPreviousEvent = () => {
    if (selectedIndex === -1) return;

    const previousIndex = (selectedIndex - 1 + events.length) % events.length;
    setDirection(-1);
    setActiveEventIndex(previousIndex);
    setSelectedEvent(events[previousIndex]);
  };

  const goToNextEvent = () => {
    if (selectedIndex === -1) return;

    const nextIndex = (selectedIndex + 1) % events.length;
    setDirection(1);
    setActiveEventIndex(nextIndex);
    setSelectedEvent(events[nextIndex]);
  };

  /* Automatically switch tickets every 3.8 seconds.
     Opening the detail modal pauses the carousel. */
  useEffect(() => {
    if (selectedEvent) return;

    const timer = window.setTimeout(() => {
      setDirection(1);
      setActiveEventIndex((current) => (current + 1) % events.length);
    }, AUTO_PLAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeEventIndex, selectedEvent]);

  /* Lock body scroll + hide navbar while modal is open */

  useEffect(() => {

    if (!selectedEvent) {

      document.body.style.overflow = "";

      document.body.classList.remove("event-modal-open");

      return;

    }



    document.body.style.overflow = "hidden";

    document.body.classList.add("event-modal-open");



    return () => {

      document.body.style.overflow = "";

      document.body.classList.remove("event-modal-open");

    };

  }, [selectedEvent]);



  /* ESC + arrow keys */

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {

      if (!selectedEvent) return;



      if (event.key === "Escape") {

        setSelectedEvent(null);

      }



      if (event.key === "ArrowLeft") {

        goToPreviousEvent();

      }



      if (event.key === "ArrowRight") {

        goToNextEvent();

      }

    };



    window.addEventListener("keydown", handleKeyDown);



    return () => {

      window.removeEventListener("keydown", handleKeyDown);

    };

  }, [selectedEvent, selectedIndex]);



  return (

    <>

      <section className="events-section">

        {/* Background */}

        <div className="events-background-grid" />

        <div className="events-glow events-glow-left" />

        <div className="events-glow events-glow-right" />



        <div className="container events-container">

          <div className="events-layout">

            {/* =========================

                LEFT CONTENT

            ========================= */}



            <motion.div

              className="events-intro"

              initial={{ opacity: 0, x: -45 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true, amount: 0.25 }}

              transition={{

                duration: 0.8,

                ease: "easeOut",

              }}

            >

              <motion.div

                className="events-kicker"

                initial={{ opacity: 0, y: 15 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{

                  duration: 0.5,

                  ease: "easeOut",

                }}

              >

                <span className="events-kicker-line" />

                <span>EVENTS</span>

              </motion.div>



              <motion.h2

                initial={{ opacity: 0, y: 25 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{

                  delay: 0.1,

                  duration: 0.7,

                  ease: "easeOut",

                }}

              >

                FOUR EXPERIENCES

                <span>ONE VISION</span>

              </motion.h2>



              <motion.p

                initial={{ opacity: 0, y: 20 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{

                  delay: 0.25,

                  duration: 0.6,

                  ease: "easeOut",

                }}

              >

                Competitions and workshops designed

                <br className="events-desktop-break" />

                to challenge, upskill and inspire.

              </motion.p>

            </motion.div>



            {/* =========================
                EVENT TICKETS
            ========================= */}

            <motion.div
              className="events-list"
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <div className="event-carousel" aria-label="Event showcase">
                <div className="event-ticket-stage">
                  <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.div
                      key={activeEvent.id}
                      className="event-ticket-card"
                      custom={direction}
                      variants={{
                        enter: (slideDirection: number) => ({
                          opacity: 0,
                          x: slideDirection > 0 ? 70 : -70,
                          rotateY: slideDirection > 0 ? 55 : -55,
                          scale: 0.94,
                        }),
                        center: {
                          opacity: 1,
                          x: 0,
                          rotateY: 0,
                          scale: 1,
                        },
                        exit: (slideDirection: number) => ({
                          opacity: 0,
                          x: slideDirection > 0 ? -70 : 70,
                          rotateY: slideDirection > 0 ? -55 : 55,
                          scale: 0.94,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.72,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <button
                        type="button"
                        className="event-ticket"
                        onClick={openActiveEvent}
                        aria-label={`View details for ${activeEvent.title}`}
                      >
                        <img
                          src={activeEvent.image}
                          alt={`${activeEvent.title} - ${activeEvent.subtitle}`}
                        />

                        <span className="event-ticket-overlay" />
                        <span className="event-ticket-hint">VIEW EVENT →</span>
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="event-carousel-controls" aria-label="Choose an event">
                  <div className="event-carousel-progress" aria-hidden="true">
                    <motion.span
                      key={`progress-${activeEvent.id}-${selectedEvent ? "paused" : "running"}`}
                      className="event-carousel-progress-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_PLAY_MS / 1000, ease: "linear" }}
                    />
                  </div>

                  <div className="event-carousel-dots">
                    {events.map((event, index) => {
                      const isActive = index === activeEventIndex;

                      return (
                        <button
                          key={event.id}
                          type="button"
                          className={`event-carousel-control${isActive ? " is-active" : ""}`}
                          onClick={() => showEvent(index)}
                          aria-label={`Show event ${event.id}: ${event.title}`}
                          aria-current={isActive ? "true" : undefined}
                        >
                          <span className="event-carousel-control-number">{event.id}</span>
                          <span className="event-carousel-control-name">{event.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* =====================================================

          EVENT DETAIL MODAL

      ===================================================== */}



      <AnimatePresence>

        {selectedEvent && (

          <motion.div

            className="event-modal-backdrop"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            transition={{ duration: 0.3 }}

            onMouseDown={(e) => {

              if (e.target === e.currentTarget) {

                setSelectedEvent(null);

              }

            }}

          >

            {/* PREVIOUS EVENT */}

            <button

              type="button"

              className="event-modal-nav event-modal-nav-prev"

              onClick={goToPreviousEvent}

              aria-label="Previous event"

            >

              <span>←</span>

              <small>PREV</small>

            </button>



            {/* NEXT EVENT */}

            <button

              type="button"

              className="event-modal-nav event-modal-nav-next"

              onClick={goToNextEvent}

              aria-label="Next event"

            >

              <span>→</span>

              <small>NEXT</small>

            </button>



            {/* ACTUAL POPUP */}

            <motion.div

              className="event-modal"

              initial={{

                opacity: 0,

                scale: 0.94,

                y: 30,

              }}

              animate={{

                opacity: 1,

                scale: 1,

                y: 0,

              }}

              exit={{

                opacity: 0,

                scale: 0.96,

                y: 20,

              }}

              transition={{

                duration: 0.45,

                ease: [0.22, 1, 0.36, 1],

              }}

            >

              <div className="event-modal-grid" />

              <div className="event-modal-glow" />



              {/* Top metadata */}

              <div className="event-modal-top">

                <div className="event-modal-id">

                  <span>EVENT</span>

                  <strong>{selectedEvent.id}</strong>

                </div>



                <button

                  type="button"

                  className="event-modal-close"

                  onClick={() => setSelectedEvent(null)}

                  aria-label="Close event details"

                >

                  <span />

                  <span />

                </button>

              </div>



              {/* Main content */}

              <div className="event-modal-content">

                {/* =========================

                    LEFT

                ========================= */}



                <div className="event-modal-info">

                  <motion.div

                    className="event-modal-category"

                    initial={{ opacity: 0, x: -20 }}

                    animate={{ opacity: 1, x: 0 }}

                    transition={{ delay: 0.15 }}

                  >

                    <span />

                    {selectedEvent.category}

                  </motion.div>



                  <motion.h2

                    initial={{ opacity: 0, y: 20 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{

                      delay: 0.2,

                      duration: 0.5,

                    }}

                  >

                    {selectedEvent.title}

                  </motion.h2>



                  <motion.h3

                    initial={{ opacity: 0, y: 15 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{

                      delay: 0.25,

                      duration: 0.5,

                    }}

                  >

                    {selectedEvent.subtitle}

                  </motion.h3>



                  <motion.div

                    className="event-modal-divider"

                    initial={{ width: 0 }}

                    animate={{ width: "100%" }}

                    transition={{

                      delay: 0.3,

                      duration: 0.7,

                    }}

                  />



                  <motion.p

                    initial={{ opacity: 0, y: 15 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{

                      delay: 0.35,

                      duration: 0.6,

                    }}

                  >

                    {selectedEvent.description}

                  </motion.p>



                  {/* =========================

                      THREE BUTTONS

                  ========================= */}



                  <motion.div

                    className="event-modal-actions"

                    initial={{ opacity: 0, y: 20 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{

                      delay: 0.45,

                      duration: 0.5,

                    }}

                  >

                    <Link

                      href="/register"

                      className="event-modal-button event-modal-button-primary"

                    >

                      <span>REGISTER NOW</span>

                      <span>→</span>

                    </Link>



                    <button type="button" className="event-modal-button">

                      <span>RULES & DETAILS</span>

                      <span>↗</span>

                    </button>



                    <button

                      type="button"

                      className="event-modal-button"

                      onClick={() => setSelectedEvent(null)}

                    >

                      <span>CLOSE EVENT</span>

                      <span>×</span>

                    </button>

                  </motion.div>

                </div>



                {/* =========================

                    RIGHT POSTER

                ========================= */}



                <motion.div

                  className="event-modal-poster"

                  initial={{

                    opacity: 0,

                    x: 30,

                    scale: 0.96,

                  }}

                  animate={{

                    opacity: 1,

                    x: 0,

                    scale: 1,

                  }}

                  transition={{

                    delay: 0.25,

                    duration: 0.7,

                    ease: "easeOut",

                  }}

                >

                  <div className="poster-frame">

                    {/* Corner decorations */}

                    <span className="poster-corner poster-corner-tl" />

                    <span className="poster-corner poster-corner-tr" />

                    <span className="poster-corner poster-corner-bl" />

                    <span className="poster-corner poster-corner-br" />



                    {/* Poster status */}

                    <div className="poster-status">

                      <span />

                      EVENT POSTER

                    </div>



                    <img

                      src={selectedEvent.poster}

                      alt={`${selectedEvent.title} poster`}

                    />



                    {/* Scan animation */}

                    <motion.div

                      className="poster-scan"

                      animate={{

                        top: ["0%", "100%", "0%"],

                      }}

                      transition={{

                        duration: 5,

                        repeat: Infinity,

                        ease: "linear",

                      }}

                    />

                  </div>



                  <div className="poster-code">

                    <span>SCAN TO REGISTER</span>

                    <span>{selectedEvent.id} // MECHNOVATE '26</span>

                  </div>

                </motion.div>

              </div>



              {/* Bottom system bar */}

              <div className="event-modal-footer">

                <span>MECHNOVATE '26</span>



                <div />



                <span>

                  {selectedEvent.id} // {selectedEvent.category}

                </span>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </>

  );

}
