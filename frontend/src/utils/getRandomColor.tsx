import { BadgeColors } from "./globals";
import { BadgeResponse } from "../types";

function getRandomColor(): BadgeResponse {
  const randomIndex = (function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  })(BadgeColors.length);
  return BadgeColors[randomIndex];
}

export default getRandomColor;
