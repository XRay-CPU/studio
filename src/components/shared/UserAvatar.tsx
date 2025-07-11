import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  src?: string | null;
  className?: string;
}

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

// Get initials from name
const getInitials = (name: string) => {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

// A simple generative SVG avatar
const GenerativeAvatar = ({ name, size = 100 }: { name: string, size?: number }) => {
  const bgColor = stringToColor(name);
  const patternColor = stringToColor(name.split("").reverse().join("")); // Different color for pattern
  const initials = getInitials(name);

  // A simple pattern based on the name's hash
  const hash = stringToHash(name);
  const shapes = [];
  for (let i = 0; i < 3; i++) {
    const shapeType = (hash >> (i*2)) & 1; // 0 for circle, 1 for rect
    const cx = ((hash >> (i * 4)) & 0xf) * (size / 16);
    const cy = ((hash >> (i * 8)) & 0xf) * (size / 16);
    const r = ((hash >> (i * 3)) & 0x7) + 5;
    if(shapeType === 0) {
        shapes.push(<circle key={i} cx={cx} cy={cy} r={r} fill={patternColor} opacity="0.3" />);
    } else {
        shapes.push(<rect key={i} x={cx-r} y={cy-r} width={r*2} height={r*2} fill={patternColor} opacity="0.3" transform={`rotate(${hash % 360} ${cx} ${cy})`} />);
    }
  }

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${bgColor}"/>
      ${shapes.map(s => s.props.dangerouslySetInnerHTML ? '' : `<${s.type} ${Object.entries(s.props).map(([k,v]) => `${k}="${v}"`).join(' ')} />`).join('')}
      <text x="50%" y="50%" fill="#FFFFFF" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="${size/2.5}" font-weight="bold">
        ${initials}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};


export function UserAvatar({ name, src, className }: UserAvatarProps) {
  const initials = getInitials(name);
  
  // Use provided image if it exists, otherwise generate one
  const avatarSrc = src || GenerativeAvatar({ name });

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
