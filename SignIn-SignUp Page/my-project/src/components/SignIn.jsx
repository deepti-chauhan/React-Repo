import React, { useState } from "react";
import { Check } from "./Check";
import { Uncheck } from "./Uncheck";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    e.preventDefault();

    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
    } else {
      setError(false);
    }
    console.log("Button Clicked");
  };

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const containSpecialCharacter = () => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(password);
  };

  const containUpperCase = () => {
    const regex = /[A-Z]/;
    return regex.test(password);
  };

  const calculateStrength = () => {
    const strength = password.length;

    const sc = containSpecialCharacter() ? 1 : 0;
    const uc = containUpperCase() ? 1 : 0;

    return strength + sc + uc;
  };

  const getBarColorClass = () => {
    const strength = calculateStrength();
    if (strength < 4) return "bg-red-500";
    if (strength < 6) return "bg-yellow-500";
    if (strength < 8) return "bg-orange-300";
    return "bg-green-600";
  };

  const isButtonDisabled = () => {
    return (
      !containSpecialCharacter() || !containUpperCase() || password.length < 8
    );
  };

  const handleError = () => {
    window.alert("All fields are required");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {error && handleError()}
      <div className="w-96 p-5 bg-white rounded-md shadow">
        <h2 className="text-2xl mb-4">SIGN UP</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="mt-1 p-2 border rounded-md w-full"
              onChange={onChange}
            />
          </div>
          <div className="mb-4 relative ">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <p
              className="absolute -right-0 mt-3 mr-3 underline cursor-pointer hover:text-blue-700"
              onClick={showPasswordHandler}
            >
              Show
            </p>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              className="mt-1 p-2 border rounded-md w-full"
              onChange={onChange}
            />
            <div className="mt-4 text-xs text-gray-500">
              <div>Password strength</div>
              <div className="flex justify-between items-center">
                <div
                  className={` ${getBarColorClass()} h-2 rounded-full mt-2 relative`}
                  style={{
                    width: `${(calculateStrength() / 12) * 100}%`,
                    minWidth: "10%",
                    maxWidth: "50%",
                  }}
                >
                  {" "}
                </div>
                <div className="mr-10">
                  {containSpecialCharacter() &&
                  containUpperCase() &&
                  password.length >= 8
                    ? "Excellent"
                    : password.length >= 6
                    ? "Better"
                    : password.length >= 4
                    ? "Weak"
                    : "very weak"}
                </div>
              </div>
              <ul className="mt-2 ">
                <p className="mb-2 text-gray-900 font-bold">
                  Must contain atleast 1
                </p>
                <li className="flex">
                  {password.length >= 8 ? <Check /> : <Uncheck />}8 characters
                </li>
                <li className="flex">
                  {containUpperCase() ? <Check /> : <Uncheck />}1 Upper case
                </li>
                <li className="flex">
                  {containSpecialCharacter() ? <Check /> : <Uncheck />}1 special
                  Character{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-4  flex items-center justify-center">
            <button
              className={`p-2 ${
                isButtonDisabled()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-purple-500 text-white"
              }
              rounded-md`}
              style={{ width: "100%" }}
              disabled={isButtonDisabled()}
            >
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
