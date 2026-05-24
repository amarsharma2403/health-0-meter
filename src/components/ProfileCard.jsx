import { useState } from "react";

export default function ProfileCard() {

  const [name, setName] =
    useState("");

  const [age, setAge] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [goal, setGoal] =
    useState("");

  const saveProfile = () => {

    alert(
      "Profile Saved 🚀"
    );

  };

  return (

    <div className="bg-zinc-900 p-5 rounded-2xl mt-10">

      <h2 className="text-3xl font-bold mb-5">
        User Profile 👤
      </h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
        className="w-full p-3 rounded-xl bg-black text-white mb-4"
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) =>
          setAge(
            e.target.value
          )
        }
        className="w-full p-3 rounded-xl bg-black text-white mb-4"
      />

      <select
        value={gender}
        onChange={(e) =>
          setGender(
            e.target.value
          )
        }
        className="w-full p-3 rounded-xl bg-black text-white mb-4"
      >

        <option value="">
          Select Gender
        </option>

        <option value="Male">
          Male
        </option>

        <option value="Female">
          Female
        </option>

      </select>

      <input
        type="text"
        placeholder="Fitness Goal"
        value={goal}
        onChange={(e) =>
          setGoal(
            e.target.value
          )
        }
        className="w-full p-3 rounded-xl bg-black text-white mb-4"
      />

      <button
        onClick={saveProfile}
        className="w-full bg-purple-600 p-3 rounded-xl font-bold"
      >

        Save Profile

      </button>

    </div>

  );

}