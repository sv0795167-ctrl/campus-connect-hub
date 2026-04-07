import { useState } from "react";
import { jobs } from "../../data/jobs";
import { Briefcase, MapPin, GraduationCap } from "lucide-react";

export default function JobListings() {
  const [applied, setApplied] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("hireloop_applications") || "[]");
  });

  const handleApply = (jobId: string) => {
    const updated = [...applied, jobId];
    setApplied(updated);
    localStorage.setItem("hireloop_applications", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Job Listings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {jobs.map((job) => {
          const hasApplied = applied.includes(job.id);
          return (
            <div key={job.id} className="bg-card rounded-xl border p-5 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Briefcase size={18} />
                </div>
                <span className="text-xs text-muted-foreground">{job.posted}</span>
              </div>

              <h3 className="font-semibold">{job.role}</h3>
              <p className="text-sm text-muted-foreground mb-3">{job.company}</p>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                <span className="flex items-center gap-1"><GraduationCap size={12} />Min CGPA: {job.cgpa}</span>
              </div>

              <div className="flex items-center justify-between mt-auto pt-3 border-t">
                <span className="font-medium text-sm">{job.salary}</span>
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={hasApplied}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    hasApplied
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {hasApplied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
