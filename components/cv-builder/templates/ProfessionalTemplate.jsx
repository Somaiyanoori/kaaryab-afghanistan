"use client";

import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function ProfessionalTemplate({ data }) {
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
      className="w-full bg-white text-gray-900 grid grid-cols-3 min-h-[297mm]"
      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
    >
      {/* Left Dark Sidebar */}
      <div className="col-span-1 bg-slate-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">
            {personal.fullName || "Your Name"}
          </h1>
          {personal.jobTitle && (
            <p className="text-sm text-yellow-400">{personal.jobTitle}</p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-xs font-black uppercase tracking-wider text-yellow-400 mb-3 border-b border-slate-700 pb-1">
            Contact
          </h2>
          <div className="space-y-2 text-xs">
            {personal.email && (
              <div className="flex items-start gap-2">
                <Mail size={12} className="mt-0.5 flex-shrink-0" />
                <span className="break-all">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-start gap-2">
                <Phone size={12} className="mt-0.5 flex-shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.city && (
              <div className="flex items-start gap-2">
                <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                <span>{personal.city}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-start gap-2">
                <Globe size={12} className="mt-0.5 flex-shrink-0" />
                <span className="break-all">{personal.website}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-start gap-2">
                <FaLinkedin size={12} className="mt-0.5 flex-shrink-0" />
                <span>LinkedIn</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-yellow-400 mb-3 border-b border-slate-700 pb-1">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-xs mb-1">{skill.name}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded ${
                          i <
                          (skill.level === "Expert"
                            ? 5
                            : skill.level === "Advanced"
                              ? 4
                              : skill.level === "Intermediate"
                                ? 3
                                : 2)
                            ? "bg-yellow-400"
                            : "bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-yellow-400 mb-3 border-b border-slate-700 pb-1">
              Languages
            </h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{lang.name}</span>
                    <span className="text-slate-400">{lang.proficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-yellow-400 mb-3 border-b border-slate-700 pb-1">
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-xs font-bold">{cert.name}</p>
                  <p className="text-xs text-slate-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="col-span-2 p-8">
        {/* Summary */}
        {personal.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2 pb-1 border-b-2 border-yellow-400">
              PROFILE
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-black text-slate-900 mb-3 pb-1 border-b-2 border-yellow-400">
              EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-4 border-l-2 border-yellow-400"
                >
                  <div className="absolute -left-1.5 top-1 w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base">{exp.position}</h3>
                      <p className="text-sm text-yellow-600 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">
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
          <section className="mb-6">
            <h2 className="text-lg font-black text-slate-900 mb-3 pb-1 border-b-2 border-yellow-400">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-sm text-yellow-600">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-black text-slate-900 mb-3 pb-1 border-b-2 border-yellow-400">
              PROJECTS
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-sm">{proj.name}</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    {proj.description}
                  </p>
                  {proj.technologies?.length > 0 && (
                    <p className="text-xs text-yellow-600 mt-1">
                      {proj.technologies.join(" • ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
