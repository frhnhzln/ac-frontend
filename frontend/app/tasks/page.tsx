import { AdminLayoutWrapper } from "../dashboard/layout";

export default function TasksPage() {
  return (
    <AdminLayoutWrapper>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Tasks</h1>
          <p className="text-gray-500 mt-1">Manage, track, and complete your assigned system tasks.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-3">
          {/* Task 1 */}
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-slate-50/50 transition duration-200">
            <div className="flex items-center gap-4">
              <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-semibold">01</div>
              <div>
                <h3 className="font-semibold text-gray-800">Task 1</h3>
                <p className="text-xs text-gray-400 mt-0.5">Updated 2 hours ago</p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600">Active</span>
          </div>

          {/* Task 2 */}
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-slate-50/50 transition duration-200">
            <div className="flex items-center gap-4">
              <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-semibold">02</div>
              <div>
                <h3 className="font-semibold text-gray-800">Task 2</h3>
                <p className="text-xs text-gray-400 mt-0.5">Updated yesterday</p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600">Completed</span>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}