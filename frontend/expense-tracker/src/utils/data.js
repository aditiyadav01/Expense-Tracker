import { BiDollarCircle } from "react-icons/bi";
import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
  LuClipboardList,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "05",
    label: "Transactions",
    icon: LuClipboardList,
    path: "/transactions",
  },
  {
    id: "06",
    label: "Budget",
    icon: BiDollarCircle,
    path: "/budget",
  },
  {
    id: "04",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];
