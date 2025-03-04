import EmailVerification from "@pages/email";
import NotFound from "@components/error/not-found";
import Dashboard from "@pages/home";
import Auth from "@pages/auth";

import { FaTachometerAlt } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { RiMailCheckLine } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import { ROUTE_NAMES } from "./labels";

export const AUTH_ROUTES = Object.freeze({
  AUTH: {
    TITLE: "Authenticate",
    PATH: "/",
    SHORT_TITLE: "Authenticate",
    COMPONENT: Auth,
    ICON: FiLogIn,
    META: <meta name="description" content="Login to access your dashboard." />,
  },
  VERIFY_EMAIL: {
    TITLE: "Verify Email",
    PATH: "/verify-email",
    SHORT_TITLE: "Verify Email",
    COMPONENT: EmailVerification,
    ICON: RiMailCheckLine,
    META: <meta name="description" content="Verify email verification code." />,
  },
});

export const MAIN_ROUTES = Object.freeze({
  [ROUTE_NAMES.DASHBOARD]: {
    TITLE: "Dashboard",
    PATH: "/dashboard",
    SHORT_TITLE: "Dashboard",
    NAV: { HEADER: true },
    COMPONENT: Dashboard,
    ICON: FaTachometerAlt,
    META: (
      <meta
        name="description"
        content="View your dashboard analytics and data."
      />
    ),
  },
  [ROUTE_NAMES.NOT_FOUND]: {
    TITLE: "404 - Not Found",
    PATH: "*",
    SHORT_TITLE: "404",
    NAV: { HEADER: false },
    COMPONENT: NotFound,
    ICON: BiError,
    META: <meta name="description" content="Page not found." />,
  },
});
