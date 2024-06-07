import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <span className="text-6xl flex w-full  justify-center ">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
    </span>
  );
}
