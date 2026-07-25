"use client";

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Award,
  Sparkles,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function ModernTemplate({ data }) {
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
      className="w-full bg-white text-gray-900 min-h-[297mm]"
      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-4xl font-black mb-1">
          {personal.fullName || "Your Name"}
        </h1>
        {personal.jobTitle && (
          <p className="text-xl text-blue-100 mb-4">{personal.jobTitle}</p>
        )}

        <div className="flex flex-wrap gap-4 text-sm">
          {personal.email && (
            <div className="flex items-center gap-1.5">
              <Mail size={14} />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={14} />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.city && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span>{personal.city}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-1.5">
              <Globe size={14} />
              <span>{personal.website}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center gap-1.5">
              <FaLinkedin size={14} />
              <span>LinkedIn</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 p-8">
        {/* Left Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-gray-500">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width:
                            skill.level === "Expert"
                              ? "100%"
                              : skill.level === "Advanced"
                                ? "80%"
                                : skill.level === "Intermediate"
                                  ? "60%"
                                  : "40%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
                Languages
              </h2>
              <div className="space-y-1.5">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-gray-600 text-xs">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-sm font-semibold">{cert.name}</p>
                    <p className="text-xs text-gray-600">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {personal.summary && (
            <div>
              <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
                About Me
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {personal.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-blue-600 font-semibold">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </p>
                        {exp.location && <p>{exp.location}</p>}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-sm text-blue-600">{edu.school}</p>
                        {edu.gpa && (
                          <p className="text-xs text-gray-600">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>
                          {edu.startDate} - {edu.endDate}
                        </p>
                        {edu.location && <p>{edu.location}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-sm">{proj.name}</h3>
                    <p className="text-sm text-gray-700 mt-0.5">
                      {proj.description}
                    </p>
                    {proj.technologies?.length > 0 && (
                      <p className="text-xs text-blue-600 mt-1">
                        {proj.technologies.join(" • ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
