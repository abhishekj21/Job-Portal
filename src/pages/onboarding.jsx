import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        // agar role candidate hai toh /jobs pe le jayega aur agar recruiter hai toh /post-job pe le jayega
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((error) => {
        console.error("Error updating user metadata:", error);
      });
  };
  // if the user object exists and if it contains a role property within unsafeMetadata. If so, the code navigates the user to a specific route based on their role: /post-job for recruiters and /jobs for candidates.
  useEffect(() => {
    if (user?.unsafeMetadata.role) {
      // when i click at candidate button then role will be candidate and humko redirect kr diya jaye ga /post-job url pe nhi too /jobs
      navigate(
        user.unsafeMetadata.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  // clerk load check kr rha hai ki user load ho chuka hai ya nahi  agar nahi hua toh loader show karega
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
// 1:10:54
