import { useSelector } from "react-redux";
import logo_light from "../logo/social_media_logo_light.png";
import logo_dark from "../logo/social_media_logo_dark.png";

export default function Logo({ classes = "size-12" }) {
  const isDark = useSelector((s) => s.user.isDark);

  return (
    <img alt="logo" src={isDark ? logo_light : logo_dark} className={classes} />
  );
}
