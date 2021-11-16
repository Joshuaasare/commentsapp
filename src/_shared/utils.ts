import { UserResult } from "./types";
import Faker from "faker";

export const generateRandomUser = (): UserResult => {
  const name = Faker.internet.userName();
  return {
    username: name,
    avatar: Faker.internet.avatar(),
  };
};
