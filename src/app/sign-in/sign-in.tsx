import { LucideEye } from "lucide-react";
import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Inputs } from "../../components/ui/input/input";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { ValidateSchema } from "../sign-up/sign-up";

interface ILogin {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const [login, setLogin] = React.useState<ILogin>({
    email: "",
    password: "",
  });
  const [loginErr, setLoginErr] = React.useState<ILogin>({
    email: "",
    password: "",
  });

  const validation = (field: keyof ILogin, value: string) => {
    const validationSchem: ValidateSchema = {
      email: {
        required: true,
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email is required.",
        alter_message: "Please check your email format.",
      },
      password: {
        required: true,
        message: "Password is required.",
        minLength: 6,
        alter_message: "Password must be minium 6 charter.",
      },
    };

    const checkValid = validationSchem[field];

    if (checkValid) {
      if (checkValid.required && !value) {
        return checkValid.message;
      }

      if (checkValid.minLength && checkValid.minLength > value.length) {
        return checkValid.alter_message;
      }
      if (checkValid.regex && !checkValid.regex.test(value)) {
        return checkValid.alter_message;
      }
    }

    return "";
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLogin((preve) => ({
      ...preve,
      [name]: value,
    }));
    const checkValidate = validation(name as keyof ILogin, value);
    console.log(checkValidate);
    setLoginErr((preve) => ({
      ...preve,
      [name]: checkValidate,
    }));
  };

  const handleInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setLoginErr((preve) => ({
      ...preve,
      [name]: "",
    }));
  };

  async function submitLogin(e: FormEvent) {
    e.preventDefault();

    const errObj: { [key in keyof ILogin]?: string } = {};

    (Object.keys(login) as (keyof ILogin)[]).forEach((key) => {
      const errorMessage = validation(key, login[key]);
      if (errorMessage) {
        errObj[key] = errorMessage;
      }
    });

    if (
      !Object.values(errObj).some((msg) => msg !== "") &&
      Object.values(login).every((val) => val)
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/sign-in`,
          {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error);
        }

        console.log(result);
        setLogin({
          email: "",
          password: "",
        });
        toast.success(result.message);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    } else {
      setLoginErr({
        email: errObj.email ?? "",
        password: errObj.password ?? "",
      });
    }
  }

  async function handleLoginWithGoogle(params: CredentialResponse) {
    try {
      const idToken = params.credential;
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
      <div className="max-w-full md:max-w-xl mx-auto w-full mt-10  md:px-12 py-0 px-0">
        <div className="bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-col rounded-lg px-4 py-14 ">
          <div className="text-center space-y-4">
            <div className="text-center">
              <p className="mb-3 text-2xl font-poppins font-semibold leading-5 text-slate-900 dark:text-gray-100">
                Login to your account
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600 dark:text-gray-100">
                You must be logged in to perform this action.
              </p>
            </div>
            {/* <button
              type="button"
              // onClick={handleAuthWithGoogle}
              className="inline-flex h-10 w-full items-center cursor-pointer justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium mb-2 text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-[18px] w-[18px] "
              />
              Continue with Google
            </button> */}
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
          <form
            className="space-y-5 w-full  mx-auto max-w-sm"
            noValidate
            autoComplete="off"
            onSubmit={submitLogin}
          >
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
                error={(loginErr.email as string) ?? ""}
                id="email"
                value={login.email}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                name="email"
                className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-2 py-2.5 font-poppins leading-5 tracking-wide text-sm"
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
                  type="text"
                  placeholder="******"
                  error={(loginErr.password as string) ?? ""}
                  id="password"
                  name="password"
                  value={login.password}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-2 py-2.5 font-poppins leading-5 tracking-wide text-sm"
                />
                <div className="absolute z-50 inset-y-0 top-2 right-2">
                  <button className="cursor-pointer p-2">
                    <LucideEye className="size-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full">
              <button
                className="w-full cursor-pointer rounded-md bg-black dark:text-black font-semibold dark:bg-white disabled:hover:cursor-not-allowed text-white hover:text-black hover:bg-transparent hover:ring-1 hover:ring-black transition-colors ease-in-out duration-500 text-sm font-poppins px-3 py-2.5"
                name="Sign up"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-6 text-center font-poppins text-sm dark:text-white/45 text-black">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-medium dark:text-white text-black"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
