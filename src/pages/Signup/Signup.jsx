import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();
  const handleSignUp = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast("This email is already in use. Please use a different email.");
        }
      });
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center">
      <div className="lg:w-1/2 ">
        <img src="https://i.ibb.co/vCrsrLgr/auth-Image.png" alt="" />
      </div>
      {/* form */}
      <div className="lg:w-1/2 max-w-md p-8 border rounded-lg shadow-lg bg-white">
        <form onSubmit={handleSubmit(handleSignUp)}>
          <h1 className="text-3xl font-bold text-center">SingUp</h1>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="name"
              className="input w-full"
              placeholder="name"
              {...register("name", { required: true })}
            />

            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
            {/* password field */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "pattern" && (
              <span className="text-red-600">
                {" "}
                Password must be strong with uppercase, lowercase, number and
                special character{" "}
              </span>
            )}

            <button className="btn btn-neutral mt-4">SignUp</button>
            <p>
              Already have an account?
              <Link to="/auth/login" className="link link-hover">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
        {/* Google */}
        <button className="btn bg-white w-full text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
