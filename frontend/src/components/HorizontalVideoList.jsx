import React from "react";
import VideoCard from "../components/Card";

const HorizontalVideoList = ({ videos, sectionTitle }) => {
  return (
<div className="bg-white py-16 px-4">
  <h2 className="text-xl font-bold mb-4 text-gray-900 text-left">{sectionTitle}</h2>
  <div className="overflow-x-auto no-scrollbar">
    <div className="flex gap-4 w-max">
      {videos.map((video, index) => (
        <VideoCard key={index} videoUrl={video.url} title={video.title} />
      ))}
    </div>
  </div>
</div>
  );
};

export default HorizontalVideoList;
