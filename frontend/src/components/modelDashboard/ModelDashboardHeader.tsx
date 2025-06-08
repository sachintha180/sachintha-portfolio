import type { ReactNode } from "react";

type ModelDashboardHeaderProps = {
  children: ReactNode;
};

export default function ModelDashboardHeader({
  children,
}: ModelDashboardHeaderProps) {
  return (
    <header className="mb-10 flex max-h-[250px] w-full rounded-sm">
      {/* Gradient Border Container */}
      <div className="w-full bg-gradient-to-r from-gray-800 to-transparent">
        {/* White Background Container */}
        <div className="mb-[2px] flex bg-white p-5">
          {/* Title */}
          <div className="flex flex-1 flex-col gap-2 self-center">
            <h1 className="text-3xl text-gray-800 lg:text-4xl 2xl:text-5xl">
              Model Playground
            </h1>
            <p className="text-xl text-gray-700">
              Interactive ML Visualization
            </p>
          </div>
        </div>
      </div>

      {/* Children (for Control Buttons) */}
      {children}
    </header>
  );
}
