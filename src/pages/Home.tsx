import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Link,
  ArrowUpRight,
} from "lucide-react";
import { cv } from "../cv";
import { Timeline } from "../components/Timeline";

function getProfileIcon(network: string) {
  const iconClass = "transition-transform group-hover:scale-110";
  switch (network.toLowerCase()) {
    case "github":
      return <Github size={18} className={iconClass} />;
    case "linkedin":
      return <Linkedin size={18} className={iconClass} />;
    case "twitter":
      return <Twitter size={18} className={iconClass} />;
    case "email":
      return <Mail size={18} className={iconClass} />;
    default:
      return <Link size={18} className={iconClass} />;
  }
}

export function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero Section */}
      <header className="mb-24 pt-8">
        {/* DO NOT REMOVE! MAYBE ACTIVATE IN THE FUTURE */}
        {/* <figure className="flex flex-col items-center mb-8">
        <img className="h-100" src={coverGif} alt="cover" />
        <figcaption className="text-sm text-gray-500 mt-2">
          "Nimit Shah is a man of focus, commitment and sheer f**king will" -
          someone, hopefully soon
          A quote from John Wick (2014)
        </figcaption>
      </figure> */}

        {/* Name with refined typography */}
        <h1 className="animate-on-load animate-fade-in-up font-serif text-4xl md:text-5xl text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
          {cv.basics.name}
        </h1>

        {/* Subtitle */}
        <p className="animate-on-load animate-fade-in-up delay-100 text-lg text-gray-600 dark:text-gray-300 mb-8 font-medium">
          {cv.basics.subtitle}
        </p>

        {/* Summary */}
        <p className="animate-on-load animate-fade-in-up delay-200 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
          {cv.basics.summary}
        </p>

        {/* Social Links */}
        <div className="animate-on-load animate-fade-in-up delay-300 flex gap-5">
          {cv.basics.profiles.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
              aria-label={item.network}
            >
              {getProfileIcon(item.network)}
              <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:inline">
                {item.network}
              </span>
            </a>
          ))}
        </div>
      </header>

      {/* Work Section */}
      {cv.work && (
        <section className="animate-on-load animate-fade-in-up delay-400 mb-20">
          <Timeline
            items={{ type: "work", items: cv.work }}
            title="experience"
          />
        </section>
      )}

      {/* Projects Section */}
      {cv.projects && (
        <section className="animate-on-load animate-fade-in-up delay-500 mb-20">
          <Timeline
            items={{ type: "projects", items: cv.projects }}
            title="projects"
          />
        </section>
      )}

      {/* Footer CTA */}
      <footer className="animate-on-load animate-fade-in delay-600 py-16 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
          Interested in working together?
        </p>
        <a
          href={`mailto:${cv.basics.email}`}
          className="group inline-flex items-center gap-2 text-gray-900 dark:text-gray-100 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Get in touch
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </footer>
    </div>
  );
}
