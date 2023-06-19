import usersModel from "./users-model.js";

export function findAllUsers() {
  return usersModel.find();
}

export function findUserByUsername(username) {
  return usersModel.findOne({ username });
}

export const findUserByCredentials = (username, password) =>
  usersModel.findOne({ username, password });

export const findUserById = (userId) => usersModel.findById(userId);

export const deleteUser = (userId) => usersModel.deleteOne({ _id: userId });

export const createUser = (user) => usersModel.create(user);

export const updateUser = (userId, user) =>
  usersModel.updateOne({ _id: userId }, { $set: user });
