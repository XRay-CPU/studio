import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  src?: string | null;
  className?: string;
}

// Get initials from name
const getInitials = (name: string) => {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

// Simple hash function to get a number from a string
const stringToHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Function to generate a color from a string
const stringToColor = (str: string) => {
  const hash = stringToHash(str);
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

export function UserAvatar({ name, src, className }: UserAvatarProps) {
  const initials = getInitials(name);
  
  // Use provided image if it exists, otherwise default to the logo.
  const avatarSrc = src || "/logo.png";

  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage src={avatarSrc} alt={name} />
      <AvatarFallback
        className="font-bold"
        style={{ backgroundColor: stringToColor(name), color: "#FFF" }}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
