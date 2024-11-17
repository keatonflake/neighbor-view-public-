"use client";
import React, { useState, useEffect, createRef } from "react";
import Script from "next/script";
import { useSearchParams, useRouter } from "next/navigation";
import { loginCaptcha } from "./actions";
import styles from "./styles/login.module.css";

export default function Login(style) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const emailRef = createRef();

  useEffect(() => {
    if (query.error === "invalid-credentials") {
      setError("Invalid credentials");
      setLoading(false);

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("error");
      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    } else if (query.error === "invalid-captcha") {
      setError("Invalid captcha");
      setLoading(false);
    }
  }, [query, router, searchParams]);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, [emailRef]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-white ${styles.main}`}
      style={{ ...style.style, cursor: loading ? "wait" : "auto" }}
    >
      <form
        className={`bg-gray-800 p-8 rounded-lg shadow-lg max-w-md`}
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target);
          const email = formData.get("email")?.toString() || "";
          const password = formData.get("password")?.toString() || "";
          const recaptcha =
            formData.get("g-recaptcha-response")?.toString() || "";

          if (email && password && recaptcha) {
            setError("");
            setLoading(true);
            loginCaptcha(new FormData(e.target));
          } else {
            setError("Please fill out all fields");
          }
        }}
      >
        {error && <div className={styles.formError}>{error}</div>}

        <span className="input-span mb-4">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            ref={emailRef}
            required
            type="email"
            name="email"
            id="email"
            className="mt-1 p-2 rounded-md border border-gray-300"
          />
        </span>

        <span className="input-span mb-4">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            className="mt-1 p-2 rounded-md border border-gray-300"
          />
        </span>

        <div
          className="g-recaptcha mb-4"
          data-theme="dark"
          data-sitekey="6LcntmUqAAAAAEwJeunKa_EqI2rL6mYEkRuSk4_h"
        ></div>

        <button
          className="submit border-2 border-white pt-2 pb-2 pl-4 pr-4 rounded-md w-full bg-blue-600 hover:bg-blue-700 transition duration-200"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <Script
        src="https://www.google.com/recaptcha/api.js"
        async
        strategy="afterInteractive"
        defer
      ></Script>
    </div>
  );
}
