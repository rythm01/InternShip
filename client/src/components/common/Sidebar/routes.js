import {
  IoDocumentTextOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { ReactComponent as PeopleIcon } from "../../../assets/images/people.svg";

const routes = [
  {
    name: "Home",
    pathname: ["/home"],
    Icon: IoHomeOutline,
  },
  {
    name: "My Buddies",
    to: "my-buddies",
    pathname: ["/home/my-buddies"],
    Icon: PeopleIcon,
  },
  {
    name: "Passwords",
    to: "passwords",
    pathname: [
      "/home/passwords",
      "/home/password-type-form",
      "/home/password-type-form?form=2",
      "/home/password-type-form?form=3",
      "/home/password-type-form?form=4",
      "/home/password-type-form?form=5",
      "/home/password-type-form?form=6",
      "/home/password-type-form?form=7",
    ],
    Icon: RiLockPasswordLine,
  },
  {
    name: "Documents",
    to: "documents",
    pathname: ["/home/documents"],
    Icon: IoDocumentTextOutline,
  },
  {
    name: "Shared",
    to: "shared",
    pathname: ["/home/shared"],
    Icon: IoDocumentTextOutline,
  },
  {
    name: "About Us",
    to: "about",
    pathname: ["/home/about"],
    Icon: IoInformationCircleOutline,
  },
];

export default routes;
