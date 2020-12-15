/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Farms from "views/Farms.js";
import Users from "views/Users.js";
import Harvests from "views/Harvests.js";
import Agents from "views/Agents.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
  },
  {
    path: "/farms",
    name: "Farms",
    icon: "tim-icons icon-square-pin",
    component: Farms,
  },
  {
    path: "/users",
    name: "Users",
    icon: "tim-icons icon-single-02",
    component: Users,
  },

  {
    path: "/harvests",
    name: "Harvests",
    icon: "tim-icons icon-vector",
    component: Harvests,
  },

  {
    path: "/agents",
    name: "Agents",
    icon: "tim-icons icon-molecule-40",
    component: Agents,
  },
];
export default routes;
