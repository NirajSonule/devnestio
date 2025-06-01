import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";

const ProfileForm = () => {
  const navigate = useNavigate();

  const { submitProfile } = useUser();
  const { addToast } = useToast();

  const [profileImage, setProfileImage] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [githubUsername, setGithubUsername] = useState("");

  const [experienceList, setExperienceList] = useState([
    { role: "", company: "", duration: "" },
  ]);

  const [educationList, setEducationList] = useState([
    { degree: "", institution: "", duration: "" },
  ]);

  const handleEducationChange = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
  };
  const addEducation = () => {
    setEducationList([
      ...educationList,
      { degree: "", institution: "", duration: "" },
    ]);
  };
  const removeEducation = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experienceList];
    updated[index][field] = value;
    setExperienceList(updated);
  };
  const addExperience = () => {
    setExperienceList([
      ...experienceList,
      { role: "", company: "", duration: "" },
    ]);
  };
  const removeExperience = (index) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const links = { github, linkedin, portfolio };
    const education = educationList;
    const experience = experienceList;

    // need to update
    setProfileImage("avatar1.jpg");
    setGithubUsername("John doe");

    try {
      const result = await submitProfile(
        profileImage,
        about,
        location,
        techStack,
        links,
        experience,
        education,
        githubUsername
      );

      if (result.success) {
        addToast({
          type: "primary",
          message: "Profile completed successfully",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        addToast({ type: "danger", message: result.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = async () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full py-12 bg-dark-bg font-Inter flex justify-center items-center">
      <div className="py-6 px-4 sm:px-12 bg-light-bg rounded-sm flex flex-col space-y-6">
        <h2 className="text-2xl text-gray-200 font-bold text-center">
          Welcome! Let’s Set Up Your Dev Profile
        </h2>
        <form className="p-2 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-5 sm:space-y-0 sm:space-x-5">
            <InputBox
              label="About"
              type="text"
              placeholder="Fullstack web developer..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <InputBox
              label="Location"
              type="text"
              placeholder="Mumbai"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <hr className="my-5 border border-gray-700" />

          <div className="flex items-center">
            <InputBox
              label="TechStack"
              type="text"
              placeholder="React, Java, Python"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />
          </div>

          <hr className="my-5 border border-gray-700" />

          <div className="flex flex-col sm:flex-row sm:items-center space-y-5 sm:space-y-0 sm:space-x-5">
            <InputBox
              label="Github"
              type="text"
              placeholder="https://github.com/JohnDoe"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
            <InputBox
              label="LinkedIn"
              type="text"
              placeholder="https://www.linkedin.com/in/johndoe"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <InputBox
              label="Portfolio"
              type="text"
              placeholder="https://www.portfolio.com"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </div>

          <hr className="my-5 border border-gray-700" />

          <div className="space-y-4">
            <label className="text-white font-semibold">Experience</label>
            {experienceList.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative"
              >
                <InputBox
                  label="Role"
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={exp.role}
                  onChange={(e) =>
                    handleExperienceChange(index, "role", e.target.value)
                  }
                />
                <InputBox
                  label="Company"
                  type="text"
                  placeholder="e.g. Google"
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                />
                <InputBox
                  label="Duration"
                  type="text"
                  placeholder="e.g. 2 years"
                  value={exp.duration}
                  onChange={(e) =>
                    handleExperienceChange(index, "duration", e.target.value)
                  }
                />
                {experienceList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="absolute -top-2 -right-2 text-red-400 text-sm hover:text-red-600 cursor-pointer"
                  >
                    &minus; remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
            >
              + Add More Experience
            </button>
          </div>

          <hr className="my-5 border border-gray-700" />

          <div className="space-y-4">
            <label className="text-white font-semibold">Education</label>
            {educationList.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative"
              >
                <InputBox
                  label="Degree"
                  type="text"
                  placeholder="e.g. B.Tech in CS"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                />
                <InputBox
                  label="Institution"
                  type="text"
                  placeholder="e.g. IIT Bombay"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                />
                <InputBox
                  label="Duration"
                  type="text"
                  placeholder="e.g. 2018 - 2022"
                  value={edu.duration}
                  onChange={(e) =>
                    handleEducationChange(index, "duration", e.target.value)
                  }
                />
                {educationList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="absolute -top-2 -right-2 text-red-400 text-sm hover:text-red-600 cursor-pointer"
                  >
                    &minus; remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
            >
              + Add More Education
            </button>
          </div>

          <hr className="my-5 border border-gray-700" />

          <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-y-0">
            <Button type="Submit" state="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button type="Submit" state="secondary" onClick={handleSkip}>
              Skip
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
