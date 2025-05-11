// components/VideoCard.jsx
import React from "react";

const extractYouTubeId = (url) => {
  const regex = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&#\s]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const Card = ({ videoUrl, title }) => {
  const videoId = extractYouTubeId(videoUrl);
  if (!videoId) return null;

  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-36 sm:w-40 md:w-48 flex-shrink-0"
    >
      <div className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-auto rounded-t-lg object-cover"
        />
      </div>
      <p className="mt-2 text-center text-sm font-medium text-gray-800">{title}</p>
    </a>
  );
};

export default Card;
