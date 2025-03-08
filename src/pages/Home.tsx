import { Github, Link, Linkedin, Twitter, Mail } from "lucide-react";
import { cv } from "../cv";
import { Timeline } from "../components/Timeline";

export function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <header className="mb-16">
        <p className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-300 mb-4">
          {cv.basics.summary}
        </p>
        <div className="flex gap-4">
          {cv.basics.profiles.map((item, index) => {
            // Function to determine which icon to display based on network
            const getProfileIcon = (network: string) => {
              switch (network.toLowerCase()) {
                case "github":
                  return <Github size={18} />;
                case "linkedin":
                  return <Linkedin size={18} />;
                case "x / twitter":
                  return <Twitter size={18} />;
                case "email":
                  return <Mail size={18} />;
                default:
                  return <Link size={18} />;
              }
            };

            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {getProfileIcon(item.network)}
              </a>
            );
          })}
        </div>
      </header>
      {cv.work && (
        <Timeline items={{ type: "work", items: cv.work }} title="work" />
      )}
      {cv.projects && (
        <Timeline
          items={{ type: "projects", items: cv.projects }}
          title="projects"
        />
      )}
    </div>
  );
}
