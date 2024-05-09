import React from "react";
import Image from "next/image";
function EventCard({ event }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div className="bg-white border-2 rounded-xl flex flex-col justify-center items-center w-max h-max p-2">
      <Image
        src={event.poster.asset.url}
        width={200}
        height={200}
        className="rounded-lg"
      ></Image>
      <div className="flex flex-col items-start mt-2 w-full">
        <h1>
          {event.title.length > 23
            ? event.title.substring(0, 22).trim() + "..."
            : event.title}
        </h1>
        <h5>{formatDate(event.date)}</h5>
      </div>
    </div>
  );
}

export default EventCard;
