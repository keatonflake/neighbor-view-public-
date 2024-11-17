"use client";
import styles from "./styles/signup.module.css";
import React, { useState, useEffect, createRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { signupCaptcha } from "./actions";

export default function Signup({ inviteCode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const nameRef = createRef();

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
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [nameRef]);

  return (
    <div className="text-white" style={{ cursor: loading ? "wait" : "auto" }}>
      <form
        className="space-y-4" // Use Tailwind for spacing
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target);
          const name = formData.get("name")?.toString() || "";
          const username = formData.get("username")?.toString() || "";
          const email = formData.get("email")?.toString() || "";
          const password = formData.get("password")?.toString() || "";
          const recaptcha =
            formData.get("g-recaptcha-response")?.toString() || "";

          if (name && username && email && password && recaptcha) {
            setError("");
            setLoading(true);
            signupCaptcha(new FormData(e.target));
          } else {
            setError("Please fill out all fields");
          }
        }}
      >
        {error && <div className={`${styles.formError} mb-4`}>{error}</div>}

        <div className="flex flex-col">
          <label htmlFor="name" className="label mb-1">
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            name="name"
            id="name"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="username" className="label mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="label mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="label mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div
          className="g-recaptcha mb-4"
          data-theme="dark"
          data-sitekey="6LcntmUqAAAAAEwJeunKa_EqI2rL6mYEkRuSk4_h"
        ></div>

        <button
          className="submit bg-slate-900 text-white border-2 border-white py-2 rounded-md w-full hover:bg-yellow-600 transition"
          type="submit"
        >
          {loading ? "Loading..." : "Create Account"}
        </button>

        <Script
          src="https://www.google.com/recaptcha/api.js"
          async
          strategy="afterInteractive"
          defer
        ></Script>
      </form>
    </div>
  );
}
