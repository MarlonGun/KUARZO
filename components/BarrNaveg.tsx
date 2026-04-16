import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const BarrNaveg = () => {
  const pathname = usePathname();

  const tabs = [
    { id: "home", icon: "home", route: "/" },
    { id: "catalog", icon: "apps", route: "/catalogo" },
    { id: "cart", icon: "cart", route: "/cart" },
    { id: "profile", icon: "person", route: "/login" },
  ];

  const getActiveTab = () => {
    if (pathname === "/" || pathname === "/index") return "home";
    if (pathname.startsWith("/catalogo") || pathname.startsWith("/detalleProd"))
      return "catalog";
    if (pathname.startsWith("/cart") || pathname.startsWith("/checkout"))
      return "cart";
    if (pathname.startsWith("/login") || pathname.startsWith("/register"))
      return "profile";

    return "home";
  };

  const activeTab = getActiveTab();

  return (
    <View
      className="absolute bottom-4 self-center w-[90%] rounded-full flex-row justify-around items-center px-2 py-2 border-[1.5px] border-orange-500"
      style={{
        backgroundColor: "#FED20F",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const iconName = isActive ? tab.icon : `${tab.icon}-outline`;

        return (
          <Pressable
            key={tab.id}
            onPress={() => {
              if (pathname !== tab.route) {
                router.push(tab.route as any);
              }
            }}
            className={`p-3 rounded-full transition-all duration-200 ${isActive ? "bg-orange-100" : "bg-transparent"}`}
          >
            <Ionicons
              name={iconName as any}
              size={26}
              // Naranja vibrante para el activo, contorno negro para inactivos
              color={isActive ? "#f97316" : "#000000"}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default BarrNaveg;
