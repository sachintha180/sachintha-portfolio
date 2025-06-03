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
    <div className="h-screen w-screen font-title relative overflow-hidden">
      {/* Blurred BG */}
      <img
        src="background_img.png"
        alt="Background Image"
        className="object-cover absolute left-0 w-full h-full z-10 blur-sm"
        draggable={false}
      />
      {/* Magnifier (sharp) */}
      <MagnifierWindow
        x={mouse.x}
        y={mouse.y}
        radius={100}
        src="background_img.png"
        className="object-cover absolute left-0 w-full h-full"
        zIndex={20}
      />
      {/* Magnifier "Glass" */}
      <MouseFollower radius={200} zIndex={30} position={mouse} />

      {/* Main Section */}
      <main className="md:w-1/2 mx-auto h-full font-title p-5 bg-white border-x-3 border-gray-200 z-30 relative flex flex-col">
        {/* Header Row - Fixed at top */}
        <div className="flex-shrink-0">
          <HomeHeader />
        </div>

        {/* Content Section - Scrollable */}
        <section
          id="content"
          className="space-y-15 mx-3 p-3 overflow-y-auto flex-grow"
        >
          {/* Profile Row */}
          <div className="w-full">
            <h2 className="text-3xl text-gray-800 mb-4">Profile</h2>
            <div className="bg-white px-4 border-l-4 border-gray-800 space-y-5">
              <p className="text-gray-700 leading-relaxed font-bold">
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
            <h2 className="text-3xl text-gray-800 mb-6">
              Skills & Technologies
            </h2>

            {/* Skill Carousel */}
            <SkillCarousel />
          </div>

          {/* Projects Row */}
          <div className="w-full">
            <h2 className="text-3xl text-gray-800 mb-6">Projects</h2>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Experiments Row */}
          <div className="w-full">
            <h2 className="text-3xl text-gray-800 mb-6">Experiments</h2>

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
