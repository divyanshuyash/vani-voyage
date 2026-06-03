import {
  Award,
  BadgeCheck,
  BookOpenCheck,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Landmark,
  Link2,
  MessageCircleQuestion,
  Mic2,
  Presentation,
  Radio,
  TrendingUp,
  UsersRound,
  Video,
} from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

const iconMap: Record<string, ComponentType<LucideProps>> = {
  award: Award,
  badge: BadgeCheck,
  brain: Brain,
  calendar: CalendarDays,
  clipboard: ClipboardList,
  growth: TrendingUp,
  link: Link2,
  mic: Mic2,
  professional: BriefcaseBusiness,
  question: MessageCircleQuestion,
  radio: Radio,
  speaker: Presentation,
  student: GraduationCap,
  users: UsersRound,
  video: Video,
  bosch: Landmark,
  workshop: BookOpenCheck,
};

type DecorativeIconProps = {
  name?: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export function DecorativeIcon({
  name = "badge",
  className = "",
  size = 24,
  strokeWidth = 2,
}: DecorativeIconProps) {
  const Icon = iconMap[name] || BadgeCheck;

  return (
    <Icon
      aria-hidden="true"
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}
