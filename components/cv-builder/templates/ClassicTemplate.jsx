"use client";

export default function ClassicTemplate({ data }) {
  const {
    personal,
    experiences,
    education,
    skills,
    languages,
    projects,
    certifications,
  } = data;

  return (
    <div
      className="w-full bg-white text-gray-900 p-10 min-h-[297mm]"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-gray-900 pb-6 mb-6">
        <h1 className="text-4xl font-bold mb-1">
          {personal.fullName || "Your Name"}
        </h1>
        {personal.jobTitle && (
          <p className="text-lg text-gray-700 italic mb-3">
            {personal.jobTitle}
          </p>
        )}
        <div className="text-sm text-gray-600 space-x-3">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.city && <span>• {personal.city}</span>}
          {personal.linkedin && <span>• LinkedIn</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-3 pb-1">
            Work Experience
          </h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{exp.position}</h3>
                <span className="text-sm italic">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <p className="text-sm italic mb-1">
                {exp.company}
                {exp.location && `, ${exp.location}`}
              </p>
              {exp.description && (
                <p className="text-sm leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-3 pb-1">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">
                  {edu.degree} in {edu.field}
                </h3>
                <span className="text-sm italic">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-sm italic">
                {edu.school}
                {edu.location && `, ${edu.location}`}
              </p>
              {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2 pb-1">
            Skills
          </h2>
          <p className="text-sm">
            {skills.map((s) => `${s.name} (${s.level})`).join(" • ")}
          </p>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2 pb-1">
            Languages
          </h2>
          <p className="text-sm">
            {languages.map((l) => `${l.name} (${l.proficiency})`).join(" • ")}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-3 pb-1">
            Projects
          </h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <h3 className="font-bold">{proj.name}</h3>
              <p className="text-sm leading-relaxed">{proj.description}</p>
              {proj.technologies?.length > 0 && (
                <p className="text-xs italic mt-1">
                  Technologies: {proj.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-3 pb-1">
            Certifications
          </h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <p className="text-sm">
                <span className="font-bold">{cert.name}</span> — {cert.issuer},{" "}
                {cert.date}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
