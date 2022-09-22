import { Response } from "miragejs";
const jwt = require("jsonwebtoken");
import dayjs from "dayjs";

const USER_ID = 100200300;

export const requiresAuth = function (request) {

  return USER_ID;
};

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
