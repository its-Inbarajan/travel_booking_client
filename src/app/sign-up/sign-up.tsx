import * as React from "react";
import { Inputs } from "../../components/ui/input/input";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import { Link, redirect } from "react-router-dom";
import { toast } from "sonner";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export interface Iuser {
  email: string;
  password: string;
  user_name: string;
  user_type: string;
}

interface ValidationRule {
  required: boolean;
  regex?: RegExp;
  minLength?: number;
  enum?: string[];
  message: string;
  alter_message?: string;
}

export type ValidateSchema = {
  [key: string]: ValidationRule;
};

const Signup = () => {
  const [user, setUser] = React.useState<Iuser>({
    email: "",
    password: "",
    user_name: "",
    user_type: "",
  });
  const [userErr, setUserErr] = React.useState<Iuser>({
    email: "",
    password: "",
    user_name: "",
    user_type: "",
  });
  const [toggle, setToggle] = React.useState<boolean>(false);
  const togglePassword = () => {
    setToggle((preve) => !preve);
  };
  const validation = (fields: keyof Iuser, value: string) => {
    const validateSchema: ValidateSchema = {
      email: {
        required: true,
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email is required.",
        alter_message: "Please check your email format.",
      },
      user_name: {
        required: true,
        minLength: 4,
        message: "User name is required.",
        alter_message: "User name should be minium four charter.",
      },
      user_type: {
        required: true,
        enum: ["admin", "user"],
        message: "User type is required.",
        alter_message: "Unknow user Type.",
      },
      password: {
        required: true,
        message: "Password is required.",
        alter_message: "Password must be minium 6 charter.",
        minLength: 6,
      },
    };

    const checkValid = validateSchema[fields];

    if (checkValid) {
      if (checkValid.required && !value) {
        return checkValid.message;
      }

      if (checkValid.minLength && checkValid.minLength < value.length) {
        return checkValid.alter_message;
      }
      if (checkValid.regex && !checkValid.regex.test(value)) {
        return checkValid.alter_message;
      }
      if (checkValid.enum && !checkValid.enum.includes(value)) {
        return checkValid.alter_message;
      }
    }

    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUser((preve) => ({
      ...preve,
      [name]: value,
    }));

    const checkValidate = validation(name as keyof Iuser, value);

    setUserErr((preve) => ({
      ...preve,
      [name]: checkValidate,
    }));
  };

  const handleInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setUserErr((preve) => ({
      ...preve,
      [name]: "",
    }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errObj: { [key in keyof Iuser]?: string } = {};

    (Object.keys(user) as (keyof Iuser)[]).forEach((key) => {
      const errorMessage = validation(key, user[key]);
      if (errorMessage) {
        errObj[key] = errorMessage;
      }
    });

    if (
      Object.values(errObj).some((msg) => msg !== "") &&
      Object.values(user).every((val) => val)
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/create-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }
        redirect("/");
        toast.success(result.message);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    } else {
      setUserErr({
        email: errObj.email ?? "",
        password: errObj.password ?? "",
        user_name: errObj.user_name ?? "",
        user_type: errObj.user_type ?? "",
      });
    }
  }

  const handleGoogleAuthErro = () => {
    console.log("errr");
  };
  async function handleAuthWithGoogle(credentialResponse: CredentialResponse) {
    const idToken = credentialResponse.credential;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(idToken),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      console.log(result);
      toast.success(result.medium);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }
  return (
    <section className="relative isolate">
      <div className="max-w-full md:max-w-xl mx-auto w-full md:px-12 py-0 px-0">
        <div className="bg-gray-200 dark:bg-gray-800 flex items-center  justify-center flex-col rounded-lg px-4 py-7 ">
          <div className="text-center space-y-4">
            <div className="text-center">
              <p className="mb-3 text-2xl font-poppins font-semibold leading-5 text-slate-900 dark:text-gray-100">
                Create your account
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600 dark:text-gray-100">
                You must be logged in to perform this action.
              </p>
            </div>
            {/* <button
              type="button"
              onClick={handleAuthWithGoogle}
              className="inline-flex h-10 w-full items-center cursor-pointer justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium mb-2 text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-[18px] w-[18px] "
              />
              Continue with Google
            </button> */}
            <div className="mb-2">
              <GoogleLogin
                onSuccess={handleAuthWithGoogle}
                onError={handleGoogleAuthErro}
              />
            </div>
          </div>
          <form
            className="space-y-3 w-full  mx-auto max-w-sm"
            noValidate
            autoComplete="off"
            onSubmit={submit}
          >
            <div className="w-full">
              <label
                htmlFor="user_name"
                className="font-poppins leading-6 tracking-wider text-sm font-medium text-black dark:text-white focus:outline-none placeholder:text-gray-500 placeholder:text-xs focus:placeholder:hidden transition-all duration-300 ease-in-out after:content-['*'] after:ml-1 after:font-bold after:text-red-500"
              >
                Username
              </label>
              <Inputs
                type="text"
                placeholder="john Doe"
                error={(userErr.user_name as string) ?? ""}
                id="user_name"
                name="user_name"
                value={user.user_name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="user_type"
                className="font-poppins leading-6 tracking-wider text-sm font-medium text-black dark:text-white focus:outline-none placeholder:text-gray-500 placeholder:text-xs focus:placeholder:hidden transition-all duration-300 ease-in-out after:content-['*'] after:ml-1 after:font-bold after:text-red-500"
              >
                User type
              </label>
              <select
                id="user_type"
                name="user_type"
                value={user.user_type}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="w-full ring-1 dark:bg-gray-800 bg-gray-50 capitalize ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
              >
                <option value="" hidden>
                  --Select User Type--
                </option>
                {["admin", "user"].map((item) => (
                  <option value={item} key={item} className="w-full capitalize">
                    {item.toString()}
                  </option>
                ))}
              </select>
              {userErr.user_type && (
                <span className="font-poppins leading-6 tracking-wide text-xs text-red-500 block text-start">
                  {userErr.user_type}
                </span>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="font-poppins leading-6 tracking-wider text-sm font-medium text-black dark:text-white focus:outline-none placeholder:text-gray-500 placeholder:text-xs focus:placeholder:hidden transition-all duration-300 ease-in-out after:content-['*'] after:ml-1 after:font-bold after:text-red-500"
              >
                Email
              </label>
              <Inputs
                type="text"
                placeholder="johnDoe@gmail.com"
                error={(userErr.email as string) ?? ""}
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="font-poppins leading-6  text-sm font-medium text-black dark:text-white focus:outline-none placeholder:text-gray-500 placeholder:text-xs focus:placeholder:hidden transition-all duration-300 ease-in-out after:content-['*'] after:ml-1 capitalize tracking-wider after:font-bold after:text-red-500"
              >
                password
              </label>
              <div className="relative">
                <Inputs
                  type={toggle ? "text" : "password"}
                  placeholder="******"
                  error={(userErr.password as string) ?? ""}
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
                />
                <div className="absolute z-50 inset-y-0 top-1 -translate-y-0 right-1">
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="cursor-pointer p-2"
                  >
                    {toggle ? (
                      <LucideEye className="size-5" />
                    ) : (
                      <LucideEyeClosed className="size-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full">
              <button
                className="w-full rounded-md bg-black dark:text-black font-semibold dark:bg-white disabled:hover:cursor-not-allowed text-white hover:text-black hover:bg-transparent hover:ring-1 hover:ring-black transition-colors ease-in-out duration-500 text-sm font-poppins px-3 py-2.5"
                name="Sign up"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="text-xs mt-1.5 font-normal text-center font-poppins leading-6 tracking-wide">
            Already have a account?{" "}
            <Link to={"/"} className="underline font-poppins text-sm">
              Sing in.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
