import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { MAIN_ROUTES } from "@utils/routes";

const Breadcrumbs = () => {
  const location = useLocation();
  const routesArray = Object.values(MAIN_ROUTES);

  const getBreadcrumbTrail = (currentRoute) => {
    const trail = [];
    while (currentRoute) {
      trail.unshift(currentRoute);
      currentRoute = MAIN_ROUTES[currentRoute.PARENT];
    }
    return trail;
  };

  const matchedRoute = routesArray.find(
    (route) => route.PATH === location.pathname
  );
  const breadcrumbTrail = matchedRoute ? getBreadcrumbTrail(matchedRoute) : [];

  // Theme-aware colors
  const textColor = useColorModeValue("gray.600", "gray.300");
  const separatorColor = useColorModeValue("gray.500", "gray.400");
  const activeColor = useColorModeValue("gray.800", "gray.200");

  // Responsive font size and visibility
  const fontSize = useBreakpointValue({ base: "xs", sm: "sm", md: "md" });
  const hideText = useBreakpointValue({ base: true, sm: false });

  return (
    <Breadcrumb
      spacing="6px"
      separator={<ChevronRightIcon color={separatorColor} />}
      fontSize={fontSize}
      mb={4}
      color={textColor}
    >
      {breadcrumbTrail.map((route, index) => (
        <BreadcrumbItem
          key={route.PATH}
          isCurrentPage={index === breadcrumbTrail.length - 1}
        >
          <BreadcrumbLink
            as={Link}
            to={route.PATH}
            fontWeight={
              index === breadcrumbTrail.length - 1 ? "bold" : "normal"
            }
            color={
              index === breadcrumbTrail.length - 1 ? activeColor : textColor
            }
            display="flex"
            alignItems="center"
          >
            {route.ICON && (
              <Icon as={route.ICON} boxSize={4} mr={hideText ? 0 : 1} />
            )}
            {!hideText && route.SHORT_TITLE}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
