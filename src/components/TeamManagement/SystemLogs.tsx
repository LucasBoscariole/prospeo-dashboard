import Image from "next/image";
import React from "react";

export const SystemLogs = () => {
  const activityLog = [
    {
      message: 'Jon Condouret added "Netn" as an intent topic.',
      timestamp: "9 March 2024 11:01PM",
    },
    {
      message:
        "Marita Man (dojd@team.com) accepted the invite to join the team.",
      timestamp: "9 March 2024 11:01PM",
    },
    {
      message:
        "The permission of Jon Condouret (jon@prospeo.io) were changed by Marito Dh (dhdi@gmail.com).",
      timestamp: "9 March 2024 11:01PM",
    },
    {
      message: "Jon Condouret changed the mapping of HubSpot.",
      timestamp: "9 March 2024 11:01PM",
    },
    {
      message:
        "Marito Naj (marito@gmail.com) connected the Outreach integration.",
      timestamp: "9 March 2024 11:01PM",
    },
  ];

  return (
    <div className="mt-4 bg-white border-sidebar-border py-6 rounded-2xl">
      <h3 className="text-black text-xl font-medium mb-4 pl-6">
        System logs (last 500)
      </h3>
      <div>
        {activityLog?.map(({ message, timestamp }, index) => {
          return (
            <div
              className="py-4 border-b border-sidebar-border px-6 flex flex-col gap-2"
              key={index}
            >
              <h6 className="text-base text-black">{message}</h6>
              <p className="text-sm text-[#454545]">{timestamp}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center mt-4 px-4">
        <span className="text-base text-dark pl-6">101 - 125 of 164,149</span>
        <div className="flex items-center gap-4">
          <button>
            <Image
              src={"/images/icons/chevron_left.svg"}
              alt="chevron_left"
              width={16}
              height={16}
            />
          </button>
          <div className="flex gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <button
                key={i}
                className={`text-base text-dark ${
                  i === 0 ? "font-bold" : "font-normal"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button>
            <Image
              src={"/images/icons/chevron_right.svg"}
              alt="chevron_right"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
