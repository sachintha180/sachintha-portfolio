import HomeHeader from "../components/HomeHeader";
import SkillCarousel from "../components/SkillCarousel";
import MouseFollower from "../components/ui/MouseFollower";
import { useEffect, useState } from "react";
import MagnifierWindow from "../components/ui/MagnifierWindow";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../lib/projects";
import { experiments } from "../lib/experiments";
import ExperimentCard from "../components/ExperimentCard";

export default function Home() {
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="font-title relative h-screen w-screen overflow-hidden">
      {/* Blurred BG - Only visible on xl screens and above */}
      <img
        src="background_img.png"
        alt="Background Image"
        className="absolute left-0 z-10 hidden h-full w-full object-cover blur-sm xl:block"
        draggable={false}
      />
      {/* Magnifier (sharp) - Only visible on xl screens and above */}
      <MagnifierWindow
        x={mouse.x}
        y={mouse.y}
        radius={100}
        src="background_img.png"
        className="absolute left-0 hidden h-full w-full object-cover xl:block"
        zIndex={20}
      />
      {/* Magnifier "Glass" - Only visible on xl screens and above */}
      <MouseFollower radius={200} zIndex={30} position={mouse} />

      {/* Main Section */}
      <main className="relative z-30 mx-auto flex h-full w-full flex-col border-x-3 border-gray-200 bg-white p-5 xl:w-3/5">
        {/* Header Row - Fixed at top */}
        <div className="flex-shrink-0">
          <HomeHeader />
        </div>

        {/* Content Section - Scrollable */}
        <section
          id="content"
          className="flex-grow space-y-15 overflow-y-auto md:p-3 xl:mx-3"
        >
          {/* Profile Row */}
          <div className="w-full">
            <h2 className="mb-4 text-3xl text-gray-800">Profile</h2>
            <div className="space-y-5 border-l-4 border-gray-800 bg-white px-4">
              <p className="leading-relaxed font-bold text-gray-700">
                Versatile Full Stack developer with extensive experience
                building end-to-end applications, skilled in Python Flask for
                robust backend solutions, and a keen eye for modern, intuitive
                frontend design.
              </p>
              <p>
                Self-taught in data analytics and machine learning with hands-on
                AI application expertise. Strong in algorithm design, data
                structures, artificial neural networks, and genetic algorithms.
                Dedicated to effective collaboration and teaching in computer
                science, and always striving for impactful results.
              </p>
            </div>
          </div>

          {/* Skills Row */}
          <div className="w-full">
            <h2 className="mb-6 text-3xl text-gray-800">
              Skills & Technologies
            </h2>

            {/* Skill Carousel */}
            <SkillCarousel />
          </div>

          {/* Projects Row */}
          <div className="w-full">
            <h2 className="mb-6 text-3xl text-gray-800">Projects</h2>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Experiments Row */}
          <div className="w-full">
            <h2 className="mb-6 text-3xl text-gray-800">Experiments</h2>

            {/* Experiments List */}
            <div className="flex flex-col gap-3">
              {experiments.map((project) => (
                <ExperimentCard key={project.id} experiment={project} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
