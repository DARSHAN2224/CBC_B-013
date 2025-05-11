import Navbar from "../components/Navbar"; 
import Card from "../components/Card";
import Footer from "../components/Footer"; 
import HorizontalVideoList from "../components/HorizontalVideoList";
import '../App.css';

// Stress Free Videos
const stressFreeVideos = [
  { title: "Stress Free 1", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { title: "Stress Free 2", url: "https://youtu.be/3JZ_D3ELwOQ" },
  { title: "Stress Free 3", url: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
  { title: "Stress Free 4", url: "https://youtu.be/kJQP7kiw5Fk" },
  { title: "Stress Free 5", url: "https://www.youtube.com/watch?v=IcrbM1l_BoI" },
  { title: "Stress Free 6", url: "https://youtu.be/60ItHLz5WEA" },
  { title: "Stress Free 7", url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ" },
  { title: "Stress Free 8", url: "https://youtu.be/kJQP7kiw5Fk" },
  { title: "Stress Free 9", url: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
  { title: "Stress Free 10", url: "https://youtu.be/dQw4w9WgXcQ" },
  { title: "Stress Free 11", url: "https://www.youtube.com/watch?v=IcrbM1l_BoI" },
  { title: "Stress Free 12", url: "https://youtu.be/60ItHLz5WEA" },
  { title: "Stress Free 13", url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ" },
  { title: "Stress Free 14", url: "https://youtu.be/kJQP7kiw5Fk" },
  { title: "Stress Free 15", url: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
];

// Hilarious Videos
const hilariousVideos = [
  { title: "Hilarious 1", url: "https://www.youtube.com/watch?v=Jg5T9p5Y4gE" },
  { title: "Hilarious 2", url: "https://youtu.be/3v6SK4pxYQI" },
  { title: "Hilarious 3", url: "https://www.youtube.com/watch?v=lz5bTTDPJp0" },
  { title: "Hilarious 4", url: "https://youtu.be/ZcXOVX2ztxQ" },
  { title: "Hilarious 5", url: "https://www.youtube.com/watch?v=sTcsC3ZySgM" },
  { title: "Hilarious 6", url: "https://youtu.be/6q5n9LRQg0E" },
  { title: "Hilarious 7", url: "https://www.youtube.com/watch?v=aESk64J7EXs" },
  { title: "Hilarious 8", url: "https://youtu.be/Lh7hzr2A1X8" },
  { title: "Hilarious 9", url: "https://www.youtube.com/watch?v=Xk9sOwudJ9Y" },
  { title: "Hilarious 10", url: "https://youtu.be/cDPE5qU8Q-I" },
  { title: "Hilarious 11", url: "https://www.youtube.com/watch?v=YhRnvw57tqI" },
  { title: "Hilarious 12", url: "https://youtu.be/21QvkTnQ6_8" },
  { title: "Hilarious 13", url: "https://www.youtube.com/watch?v=nnZTEmScNRQ" },
  { title: "Hilarious 14", url: "https://youtu.be/qEd6WgdMbws" },
  { title: "Hilarious 15", url: "https://www.youtube.com/watch?v=89Nk2-bpkA0" },
];

const yogaAndMeditationVideos = [
  { title: "Yoga Relief 1", url: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
  { title: "Yoga Relief 2", url: "https://youtu.be/KkVYX7TKa88" },
  { title: "Yoga Relief 3", url: "https://youtu.be/1pftfLl3cTA" },
  { title: "Yoga for Flexibility", url: "https://youtu.be/1pftfLl3cTA" },
  { title: "Yoga Flow for Relaxation", url: "https://youtu.be/fP9XHeV8yfg" },
  { title: "Gentle Yoga for Beginners", url: "https://youtu.be/tLxym62aV3w" },
  { title: "Yoga for Sleep", url: "https://youtu.be/CBW2O6bY9VY" },

  { title: "Meditation 1 - Calm the Mind", url: "https://www.youtube.com/watch?v=6p_yaNFSYao" },
  { title: "Meditation 2 - Deep Relaxation", url: "https://youtu.be/ZToicYcHIOU" },
  { title: "Meditation 3 - Mindfulness", url: "https://youtu.be/inpok4MKVLM" },
  { title: "Guided Meditation for Beginners", url: "https://youtu.be/Xo2lv5F_2NA" },
  { title: "Stress Relief Meditation", url: "https://youtu.be/zdv0k7J0XrI" },
  { title: "Breathing Meditation for Relaxation", url: "https://youtu.be/Jh9iFTzZG0E" },
  { title: "Morning Meditation for Peace", url: "https://youtu.be/Q9q9Vlmhclw" },
  { title: "Evening Meditation for Sleep", url: "https://youtu.be/lTFlT6KO9Lw" },
];
const travelStressBusterVideos = [
  // Relax Travel Videos
  { title: "Relax Travel 1: Serene Beaches of Maldives", url: "https://www.youtube.com/watch?v=PbNooZ6cH6E" },
  { title: "Relax Travel 2: Tranquil Mountain Views in Switzerland", url: "https://youtu.be/9vh5kgt-OB8" },
  { title: "Relax Travel 3: Peaceful Forest Walk in Japan", url: "https://youtu.be/K6t7lgcfJZs" },
  { title: "Relax Travel 4: Calm Walk Through Santorini", url: "https://youtu.be/gIqlfiwejrQ" },
  { title: "Relax Travel 5: Sunrise over the Grand Canyon", url: "https://youtu.be/lmMkRmh3SzQ" },
  { title: "Relax Travel 6: Soothing Views of New Zealand's Nature", url: "https://youtu.be/0kFHnO6GG80" },
  { title: "Relax Travel 7: Serene Sounds of Bali's Rice Terraces", url: "https://youtu.be/XbRxt6Zjz34" },
  { title: "Relax Travel 8: Tranquility at the Beaches of Thailand", url: "https://youtu.be/9PpGb1AqLoA" },
  { title: "Relax Travel 9: Peaceful Views of Lake Como, Italy", url: "https://youtu.be/WpZcfyT_ZhA" },
  { title: "Relax Travel 10: Majestic Northern Lights in Iceland", url: "https://youtu.be/T_wjjPYv2Qk" },
  { title: "Relax Travel 11: Calming Walk Through Kyoto Gardens", url: "https://youtu.be/4PRxZs6mjLM" },
  { title: "Relax Travel 12: Meditation at the Temples of Bhutan", url: "https://youtu.be/xrcwp06d2NQ" },
  { title: "Relax Travel 13: Gentle River Cruise in Amsterdam", url: "https://youtu.be/KmC8nvmeEbc" },
  { title: "Relax Travel 14: Tranquil Coastal Views in Portugal", url: "https://youtu.be/L5OdvLR98zY" },
  { title: "Relax Travel 15: Peaceful Sunset in the Seychelles", url: "https://youtu.be/qS1-lW0A2RI" },
];

function Home() {
  return (
    <>
      <Navbar getStarted={true} />
      <HorizontalVideoList videos={stressFreeVideos} sectionTitle="Stress Free Playlist" />
      <HorizontalVideoList videos={hilariousVideos} sectionTitle="Hilarious Videos" /> {/* Added the new section */}
      <HorizontalVideoList videos={yogaAndMeditationVideos} sectionTitle="Learn Yoga and Meditation" />
      <HorizontalVideoList videos={travelStressBusterVideos} sectionTitle="Relax Travel for Stress Relief" />

      <Footer />
    </>
  );
}

export default Home;
