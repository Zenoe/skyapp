import { useRoutes } from "react-router-dom";

// import LoginRoutes from './LoginRoutes'
// import { selectAuth } from '@/redux/auth/selectors'

// import { useSelector } from "react-redux";
import MainRoutes from "./MainRoutes";

export default function ThemeRoutes() {
  return useRoutes([MainRoutes]);
  // if (isLoggedIn) {
  //   // The route in MainRoutes overlaps with that in LoginRoutes.
  //   return useRoutes([MainRoutes, LoginRoutes])
  // } else {
  //   return useRoutes([LoginRoutes])
  // }
}
