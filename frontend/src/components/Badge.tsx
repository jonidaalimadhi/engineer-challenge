import getRandomColor from "../utils/getRandomColor";
import { Status, BadgeResponse, BadgeProps } from "../types";

// randomizeColor=true for Members Badges
// text:string for Members Badges
const getBadgeColors = (status: Status): BadgeResponse => {
  const badgeColors: {
    [k in Status]: {
      textColor: string;
      backgroundColor: string;
    };
  } = {
    ACTIVE: { textColor: "tc-green-100", backgroundColor: "bg-green-100" },
    PENDING: { textColor: "tc-yellow-600", backgroundColor: "bg-yellow-100" },
    CANCELLED: { textColor: "tc-red-100", backgroundColor: "bg-red-100" },
    DROPPED_OUT: { textColor: "tc-red-100", backgroundColor: "bg-red-100" },
  };
  return badgeColors[status];
};

const Badge = ({ text, randomizeColor = false }: BadgeProps) => {
  let res: BadgeResponse;

  if (!randomizeColor) {
    res = getBadgeColors(text as Status);
  } else {
    res = getRandomColor();
  }

  const className = `inline-block rounded-full py-1 px-4 text-xs mr-2 ${res?.textColor} ${res?.backgroundColor}`;

  return (
    <p data-testid="badge-element" className={className}>
      {text}
    </p>
  );
};

export default Badge;
