import { v4 as uuid } from "uuid";
import bcyrpt from "bcryptjs";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: 100200300,
    name: "Moktarul anam",
    email: "moktarul@gmail.com",
    password: bcyrpt.hashSync("moktarul123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    name:"moktarul anam1",
    email: "moktarul1@gmail.com",
    password: bcyrpt.hashSync("moktarul123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
