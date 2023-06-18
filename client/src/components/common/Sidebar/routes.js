import {
  IoDocumentTextOutline,
  IoHomeOutline,
  IoInformationCircleOutline
} from "react-icons/io5"
import { RiLockPasswordLine } from 'react-icons/ri';
import { ReactComponent as PeopleIcon } from "../../../assets/images/people.svg"

const routes = [
  {
    name: "Home",
    pathname: "/",
    Icon: IoHomeOutline
  },
  {
    name: "My Buddies",
    to: "my-buddies",
    pathname: "/my-buddies",
    Icon: PeopleIcon
  },
  {
    name:"Passwords",
    to:"passwords",
    pathname:"/passwords",
    Icon: RiLockPasswordLine
  },
  {
    name: "Documents",
    to: "documents",
    pathname: "/documents",
    Icon: IoDocumentTextOutline
  },
  {
    name: "Shared",
    to: "shared",
    pathname: "/shared",
    Icon: IoDocumentTextOutline
  },
  {
    name: "About Us",
    to: "about",
    pathname: "/about",
    Icon: IoInformationCircleOutline
  }
]

export default routes
