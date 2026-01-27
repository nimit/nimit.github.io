import { memo, useMemo } from "react";
import { Work, Project } from "../cvTypes";

interface TimelineProps {
  items: { type: string; items: Work[] | Project[] };
  title?: string;
}

interface GroupedWork {
  name: string;
  url: string;
  roles: Work[];
}

interface TimelineItemProps {
  item: GroupedWork | Project;
  type: "work" | "projects";
  index: number;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseDate(dateStr: string): Date {
  if (dateStr === "Present") return new Date();
  const parts = dateStr.split("-");
  const year = parseInt(parts[0]);
  const month = parts[1] ? parseInt(parts[1]) - 1 : 0;
  const day = parts[2] ? parseInt(parts[2]) : 1;
  return new Date(year, month, day);
}

function formatDate(dateStr: string): { label: string; date: Date } {
  if (dateStr === "Present") return { label: "Present", date: new Date() };
  const date = parseDate(dateStr);
  return {
    label: `${MONTHS[date.getMonth()]} ${date.getFullYear()}`,
    date
  };
}

function calculateDuration(start: Date, end: Date): string {
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth() + (years * 12) + 1; // inclusive
  
  const displayYears = Math.floor(months / 12);
  const displayMonths = months % 12;
  
  const parts = [];
  if (displayYears > 0) parts.push(`${displayYears} yr${displayYears > 1 ? "s" : ""}`);
  if (displayMonths > 0) parts.push(`${displayMonths} mo${displayMonths > 1 ? "s" : ""}`);
  
  return parts.join(" ") || "1 mo";
}

function formatDateRange(startDate: string, endDate: string, showDuration = false): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  
  if (start.label === end.label) {
    return start.label;
  }
  
  const range = `${start.label} — ${end.label}`;
  
  if (showDuration) {
    const duration = calculateDuration(start.date, end.date);
    return `${range} · ${duration}`;
  }
  
  return range;
}

const TimelineMarker = memo(function TimelineMarker({ isActive }: { isActive: boolean }) {
  return (
    <div className="absolute left-0 top-5 flex items-center justify-center">
      <div
        className={`
          w-2 h-2 rounded-full transition-all duration-300
          ${isActive 
            ? "bg-blue-500 dark:bg-blue-400 ring-4 ring-blue-100 dark:ring-blue-900/30" 
            : "bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500"
          }
        `}
      />
    </div>
  );
});

const StatusBadge = memo(function StatusBadge({ label }: { label: string }) {
  return (
    <span className="relative shrink-0 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded overflow-hidden">
      {label}
      <div className="absolute inset-0 w-3 h-full bg-white/40 dark:bg-white/10 skew-x-12 animate-shine" />
    </span>
  );
});

function WorkItem({ item }: { item: GroupedWork }) {
  const isAnyActive = item.roles.some(role => role.endDate === "Present");

  return (
    <div className="block p-5 -ml-1 rounded-xl transition-all duration-200 hover:bg-white dark:hover:bg-[#242424] hover:shadow-sm hover-lift">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5 min-w-0">
          {isAnyActive && <StatusBadge label="current" />}
          <a 
            href={item.url || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[15px] font-medium text-gray-900 dark:text-gray-100 truncate transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            {item.name}
          </a>
        </div>
      </div>

      {/* Roles */}
      <div className="space-y-8">
        {item.roles.map((role, idx) => (
          <div key={idx} className="relative">
            {/* Role Header */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <p className="text-[13px] font-medium text-gray-700 dark:text-gray-200">
                {role.position}
              </p>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-400 shrink-0 tabular-nums">
                {formatDateRange(role.startDate, role.endDate, true)}
              </span>
            </div>

            {/* Responsibilities */}
            <ul className="space-y-2">
              {role.responsibilities.slice(0, 3).map((responsibility, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  <span className="shrink-0 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mt-[0.65em]" />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectItem({ item }: { item: Project }) {
  const isActive = item.isActive;
  const url = item.url || item.github || "#";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 -ml-1 rounded-xl transition-all duration-200 hover:bg-white dark:hover:bg-[#242424] hover:shadow-sm hover-lift"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {isActive && <StatusBadge label="active" />}
          <h3 className="text-[15px] font-medium text-gray-900 dark:text-gray-100 truncate transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {item.name}
          </h3>
        </div>
        <span className="text-[11px] font-medium text-gray-700 dark:text-gray-400 shrink-0 tabular-nums">
          {formatDateRange(item.startDate, item.endDate)}
        </span>
      </div>

      {/* Stack */}
      {item.stack && item.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.stack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Highlights */}
      <ul className="space-y-2">
        {item.highlights.slice(0, 2).map((highlight, index) => (
          <li
            key={index}
            className="flex gap-3 text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <span className="shrink-0 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mt-[0.65em]" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </a>
  );
}

const TimelineItem = memo(function TimelineItem({ item, type, index }: TimelineItemProps) {
  const isActive = type === "work" 
    ? (item as GroupedWork).roles.some(role => role.endDate === "Present")
    : (item as Project).isActive;

  return (
    <div 
      className="group relative pl-8"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <TimelineMarker isActive={isActive || false} />
      {type === "work" ? (
        <WorkItem item={item as GroupedWork} />
      ) : (
        <ProjectItem item={item as Project} />
      )}
    </div>
  );
});

export function Timeline({ items: { type, items }, title }: TimelineProps) {
  const processedItems = useMemo(() => {
    if (type !== "work") return items;

    const workItems = items as Work[];
    const grouped: GroupedWork[] = [];
    
    workItems.forEach(item => {
      const lastGroup = grouped[grouped.length - 1];
      if (lastGroup && lastGroup.name === item.name) {
        lastGroup.roles.push(item);
      } else {
        grouped.push({
          name: item.name,
          url: item.url,
          roles: [item]
        });
      }
    });

    return grouped;
  }, [type, items]);

  return (
    <section>
      {/* Section Title */}
      <h2 className="text-sm font-medium uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-8">
        {title}
      </h2>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[3px] top-6 bottom-6 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent dark:from-gray-700 dark:via-gray-700" />

        {/* Items */}
        <div className="space-y-2">
          {processedItems.map((item, index) => (
            <TimelineItem
              key={index}
              item={item as any}
              type={type as "work" | "projects"}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
