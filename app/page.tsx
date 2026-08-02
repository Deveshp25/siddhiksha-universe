import {
  CreativeJourney,
  Gallery,
  HeroExperience,
  MeetDreamerScene,
  MusicExperience,
  WorldsScene,
} from "@/components";

export default function Home() {
  return (
    <>
      <HeroExperience />
      <MeetDreamerScene />
      <WorldsScene />
      <MusicExperience />
      <CreativeJourney />
      <Gallery />
    </>
  );
}
