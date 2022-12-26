const tokenExists = () => {
  const token = localStorage.getItem("token");
  return token !== "";
};

export default tokenExists;
