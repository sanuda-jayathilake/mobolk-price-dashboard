const accounts = [
  {
    username: "admin-chathuranga",
    password: "chathuranga@1234",
  },
  {
    username: "admin-jay",
    password: "sanuda25",
  },
  {
      username: "user@mail.com",
      password: "sanuda123"
  }
];
export const authenticateUser = (username, password) => {
  const filtered = accounts.find(
    (el) => el.username === username.email && el.password === password.password
  );
  return filtered
};
