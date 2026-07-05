import { AdminLayoutWrapper } from "../dashboard/layout";

export default function TeamPage() {
  return (
    <AdminLayoutWrapper>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Team</h1>
          <p className="text-gray-500 mt-1">Monitor administrator and team member roles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Alice */}
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 text-white font-bold flex items-center justify-center shadow-sm">A</div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Alice</h3>
              <p className="text-sm text-gray-500 font-medium">Developer</p>
            </div>
          </div>

          {/* Bob */}
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold flex items-center justify-center shadow-sm">B</div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Bob</h3>
              <p className="text-sm text-gray-500 font-medium">Designer</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}