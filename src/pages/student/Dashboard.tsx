import StatCard from "../../components/StatCard";
import { Briefcase, ClipboardCheck, Trophy, Star } from "lucide-react";
import { jobs } from "../../data/jobs";

export default function StudentDashboard() {
  const applied = JSON.parse(localStorage.getItem("hireloop_applications") || "[]");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Student Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Applications" value={applied.length} icon={<Briefcase size={20} />} />
        <StatCard title="Interviews" value={1} icon={<ClipboardCheck size={20} />} color="bg-warning/10 text-warning" />
        <StatCard title="Offers" value={0} icon={<Trophy size={20} />} color="bg-success/10 text-success" />
        <StatCard title="Available Jobs" value={jobs.length} icon={<Star size={20} />} color="bg-accent text-accent-foreground" />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Recommended Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.slice(0, 4).map((job) => (
            <div key={job.id} className="bg-card rounded-xl border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{job.role}</h4>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">{job.type}</span>
              </div>
              <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                <span>{job.salary}</span>
                <span>{job.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
