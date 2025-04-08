import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      const userData = await axios.get(`http://localhost:3002/users/?email=${data.Email}`);
      const user = userData.data;

      if (user.length && user[0].password === data.Password) {
        const adminData = await axios.get(`http://localhost:3002/admins/${user[0].id}`);

        if (adminData.data) {
          data.Role === "admin"
            ? navigate("/dashboard")
            : navigate("/products")
        }
        setErrorMessage("Invalid email or password");
      }
      else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setErrorMessage("An error occurred while checking your details. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg space-y-6">

        <h2 className="text-center text-2xl font-semibold text-gray-800">Login</h2>

        <div>
          <input
            type="text"
            placeholder="Email"
            {...register("Email", {
              required: "Email is required",
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
          />
          {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("Password", {
              required: "Password is required",
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
          />
          {errors.Password && <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>}
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center text-gray-700">
            <input {...register("Role", { required: "Role selection is required" })} type="radio" value="admin" />
            <span className="ml-2">Admin</span>
          </label>
          <label className="flex items-center text-gray-700">
            <input {...register("Role", { required: "Role selection is required" })} type="radio" value="user" />
            <span className="ml-2">User</span>
          </label>
        </div>
        {errors.Role && <p className="text-red-500 text-sm mt-1">{errors.Role.message}</p>}

        {errorMessage && <p className="text-red-500 text-sm mt-2 font-semibold text-center">{errorMessage}</p>}

        <div>
          <button type="submit" className="cursor-pointer w-full bg-lime-500 text-white py-3 rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}
