"use client";
import React, { useState } from "react";
import { createPost } from "./actions";

export default function SubmissionForm() {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        createPost(new FormData(e.target));
      }}
    >
      <label className="flex flex-col">
        {/* <span className="text-slate-400">Location</span> */}
        <input
          className="h-11 rounded-lg border border-gray-300 text-black"
          required
          type="text"
          id="location"
          name="location"
          placeholder="123 Street, ST 12345"
        />
      </label>
      <div className="flex flex-col g">
        {/* <span className="text-slate-400">Type</span> */}
        <div className="flex items-center">
          <label className="mr-4">
            <input
              required
              className="mr-1"
              type="radio"
              id="vehicle"
              name="type"
              value="vehicle"
              checked={type === "vehicle"}
              onChange={handleTypeChange}
            />
            Vehicle
          </label>
          <label>
            <input
              className="mr-1"
              type="radio"
              id="neighborhood"
              name="type"
              value="neighborhood"
              checked={type === "neighborhood"}
              onChange={handleTypeChange}
            />
            Neighborhood
          </label>
        </div>
      </div>
      <label className="flex flex-col">
        {/* <span className="text-slate-400">Description</span> */}
        <textarea
          className="h-48 p-3 rounded-lg border text-center border-gray-300 text-black"
          required
          style={{ resize: "none" }}
          id="description"
          name="description"
          placeholder="Tell us about what happened..."
        />
      </label>
      <label className="flex flex-col">
        {/* <span className="text-slate-400">Date of Incident</span> */}
        <input
          required
          className="h-11 rounded-lg border text-center border-gray-300 text-black"
          type="date"
          id="date"
          name="date"
        />
      </label>
      {type === "vehicle" && (
        <div>
          <label className="flex flex-col">
            {/* <span className="text-slate-400">License Plate</span> */}
            <input
              className="h-11 rounded-lg border text-center border-gray-300 text-black"
              placeholder="License Plate"
              required
              type="text"
              id="license"
              name="license"
            />
          </label>
        </div>
      )}
      {type === "neighborhood" && (
        <div>
          <label className="flex flex-col">
            <span className="text-slate-400">Category</span>
            <select
              className="h-11 rounded-lg border border-gray-300 text-black"
              required
              id="category"
              name="category"
            >
              <option value="">Select one</option>
              <option value="domestic-violence">Domestic Violence</option>
              <option value="vandalism">Vandalism</option>
              <option value="theft">Theft</option>
              <option value="burglary">Burglary</option>
              <option value="noise">Noise Complaint</option>
              <option value="animal">Animal Control</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-200 ease-in-out"
        disabled={loading}
        type="submit"
      >
        {loading ? "Loading..." : "Submit Form"}
      </button>
    </form>
  );
}
