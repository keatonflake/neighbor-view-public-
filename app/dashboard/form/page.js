import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SubmissionForm from "@/app/ui/submissionForm";

export default async function FormPage() {
  const session = await getSession();
  if (!session) return redirect("/login");

  return (
    <div className="flex items-center w-screen h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <div className="absolute left-5 top-5 flex flex-row">
        <svg
          height={"3em"}
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 423.33 275.64"
        >
          <path
            fill="white"
            d="M145.61,41.16c-.09.31-.48.45-.72.24-1.08-.92-9.08-7.3-11.09-10.02-5.06-6.84-10.32-15.99-17.33-18.08-4.82-1.44-15.28,5.88-18.82,11.87-24.86,42.14-48.63,84.92-70.54,123.67-.38.68.38,1.43,1.05,1.03,21.17-12.57,43.32-30.57,68.55-37.81,31.01-8.9,58.04,7.85,78.81,33.76.25.32.71.37,1.04.13,22.28-16.53,44.59-19.49,66.27-1.24.28.23.69.24.97,0,61.73-50.08,87.9-48.57,152.07,8.32.65.57,1.6-.19,1.17-.94-25.14-44.06-50.65-87.91-76.07-131.77-5.51-9.51-29.63,3.98-30.89,8.04-1.85,5.98-3.42,7.87-5.1,14.13-.12.45-.62.68-1.05.5-2.61-1.13-5.22-2.27-7.83-3.4-.39-.17-.56-.62-.39-1.01,5.2-11.51,8.02-28.5,16.6-32.2,10.05-4.33,32.44-.82,37.3,6.92,33.01,52.55,63.53,106.73,92.71,161.52,3.61,6.79-3.48,21.51-9.08,30.37-6.63,10.5-18.96,17.44-25.41,28.01-18.81,30.83-54.33,48.01-88.9,40.81-35.82-7.46-61.97-37.56-65.8-75.08-.81-7.96-1.17-17.43-5.66-23.12-4.18-5.3-9.89-10.9-19.96-8.66-10.3,2.29-16.58,17.08-17.85,26.89-6.78,52-40.7,86.23-88.75,79.61-20.69-2.85-42.04-16.37-58.38-30.49-13.91-12.03-17.35-34.16-38.26-42.76-4.38-1.8-6.13-22.74-1.76-30.96C29.51,118.66,58.51,68.92,87.03,18.95,95.73,3.7,109.18-4.65,126.05,2.71c16.33,7.12,24.71,20.25,19.55,38.44ZM104.43,263.94c36.77,1.47,70.86-30,73.33-67.69,2.46-37.59-30.38-73.17-68.98-74.73-36.84-1.49-70.84,29.9-73.29,67.66-2.43,37.6,30.41,73.22,68.94,74.75ZM386.81,191.93c-.55-37.33-33.32-69.98-70.67-70.41-38.11-.44-72.36,33.89-71.81,71.98.54,37.33,33.33,70.03,70.63,70.43,38.07.41,72.41-34,71.86-72Z"
          />
        </svg>
        <h1 className="text-3xl ml-3">NeighborView</h1>
      </div>
      {/* Center the submission form */}
      <div className="m-auto bg-slate-900 text-center rounded-md">
        {/* Container for the submission form */}
        <h1 className="text-5xl font-bold text-white p-3">Report Form</h1>
        <p className="text-center w-4/5 m-auto text-white">
          Please be aware that these form submissions are not public, and all
          data used is slightly modified to hide identity.
        </p>
        <SubmissionForm />
      </div>
    </div>
  );
}
