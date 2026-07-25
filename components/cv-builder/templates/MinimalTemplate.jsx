"use client";

export default function MinimalTemplate({ data }) {
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
      className="w-full bg-white text-gray-900 p-12 min-h-[297mm]"
      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
    >
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-black mb-2">
          {personal.fullName || "Your Name"}
        </h1>
        {personal.jobTitle && (
          <p className="text-xl text-yellow-600 font-semibold mb-4">
            {personal.jobTitle}
          </p>
        )}
        <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.city && <span>{personal.city}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-8">
          <p className="text-base leading-relaxed text-gray-700">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-black tracking-[0.2em] text-yellow-600 mb-4 uppercase">
            Experience
          </h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{exp.position}</h3>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {exp.company}
                  {exp.location && ` · ${exp.location}`}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-black tracking-[0.2em] text-yellow-600 mb-4 uppercase">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Languages */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-black tracking-[0.2em] text-yellow-600 mb-3 uppercase">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-sm px-2 py-1 border border-gray-300 rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2 className="text-xs font-black tracking-[0.2em] text-yellow-600 mb-3 uppercase">
              Languages
            </h2>
            <div className="space-y-1">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-sm">
                  <span>{lang.name}</span>
                  <span className="text-gray-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-black tracking-[0.2em] text-yellow-600 mb-4 uppercase">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold">{proj.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-black tracking-[0.2em] text-yellow-600 mb-3 uppercase">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <p key={cert.id} className="text-sm">
                <span className="font-bold">{cert.name}</span> — {cert.issuer}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
