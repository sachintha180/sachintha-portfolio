// ModelDashboard.tsx

import CentralCanvas from "../components/CentralCanvas";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";

export default function ModelDashboard() {
  return (
    <div className="h-screen p-4 bg-gray-50 space-y-4">
      <div className="p-2">
        <h1 className="text-3xl font-semibold">Model Playground</h1>
      </div>
      <div className="grid grid-cols-[minmax(250px,1fr)_minmax(600px,2fr)_minmax(250px,1fr)] gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <SidebarLeft />
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <CentralCanvas />
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <SidebarRight />
        </div>
      </div>
    </div>
  );
}
