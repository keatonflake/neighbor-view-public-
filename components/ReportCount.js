import { postCount } from "@/model/post-model";

const ReportCount = async () => {
  const count = await postCount();
  return (
    <div className="mt-16">
      <h1 className="text-5xl w-screen text-center">
        {count}+ <span className="text-3xl">Reports & counting</span>
      </h1>
    </div>
  );
};

export default ReportCount;
