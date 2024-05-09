"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import EventCard from "./EventCard";
import emailjs from "@emailjs/browser";
import Modal from "./Modal";
import Image from "next/image";
import Link from "next/link";

function EventDisplay({ user }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Get Registration Link");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = "service_h80stol";
    const templateId = "template_um0bz01";
    const publicKey = "y3j-t2GlhuX2oY8V2";

    // Create a new object that contains dynamic template params
    const templateParams = {
      Event_Name: selectedEvent?.title,
      Registration_Link: selectedEvent?.registrationLink,
      Registration_Deadline: selectedEvent?.regDeadline,
      Recipient_Email: user?.email,
      Event_Date: selectedEvent?.date,
      Event_Venue: selectedEvent?.venue,
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
    // Disable the button and change the text
    setIsButtonDisabled(true);
    setButtonText("Email Sent");

    // Revert back to the original state after 3 seconds
    setTimeout(() => {
      setIsButtonDisabled(false);
      setButtonText("Get Registration Link");
    }, 3000);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    const query = `*[_type == "event"] | order(date asc) {
      title,
      poster {
        asset -> {
          url
        }
      },
      description,
      speakers[]->{
        name,
        description,
        linkedin
      },
      date,
      regDeadline,
      registrationLink,
      venue
    }`;

    client
      .fetch(query)
      .then((data) => {
        console.log("Fetched event data:", data);
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, []);

  return (
    <div className="bg-gray-200 flex flex-col justify-center gap-3 pb-4">
      <h1 className="ml-4 text-2xl font-bold">Upcoming Events</h1>
      <div className="flex items-center justify-center gap-3">
        {events.map((event, index) => (
          <button
            key={index}
            className="hover:scale-110 hover:mx-6 transition-transform ease-in-out"
            onClick={() => openModal(event)}
          >
            <EventCard event={event}></EventCard>
          </button>
        ))}
      </div>
      <Modal isOpen={selectedEvent !== null} onClose={closeModal}>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-3/4 flex flex-col gap-3">
            <h2 className="text-xl font-bold">{selectedEvent?.title}</h2>
            <p>{selectedEvent?.description}</p>
            {selectedEvent && (
              <p>
                <span className="font-semibold">Deadline for Registration</span>
                :{" "}
                {selectedEvent.regDeadline &&
                  new Date(selectedEvent.regDeadline).toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
              </p>
            )}

            {selectedEvent && (
              <p>
                <span className="font-semibold">Date of Event</span>:{" "}
                {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
            <p>
              <span className="font-semibold">Venue</span>:{" "}
              {selectedEvent?.venue}
            </p>
            <div>
              {selectedEvent && selectedEvent.speakers && (
                <p className="font-semibold">Speakers</p>
              )}
              {selectedEvent?.speakers?.map((speaker, index) => (
                <div>
                  <Link
                    href={speaker.linkedin}
                    className="font-medium"
                    key={index}
                  >
                    {speaker.name}
                  </Link>
                  <p className="font-normal">{speaker.description}</p>
                </div>
              ))}
            </div>
            {/* Add more event details here */}
          </div>
          <Image
            src={selectedEvent?.poster.asset.url}
            height={300}
            width={300}
          ></Image>
          <button
            className={`rounded-lg text-white p-3 ${isButtonDisabled ? 'bg-gray-400' : 'bg-primary'}`}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default EventDisplay;
