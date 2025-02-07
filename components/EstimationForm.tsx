import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  id: string;
  level: string;
}

const EstimationForm: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/get-estimate",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setData(response.data.data);
        setError(null);
      } else {
        setData(null);
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching estimate:", error);
      setData(null);
      setError("Invalid Input");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Get an Estimate</h2>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label">
            Requirement ID:
            <input
              type="text"
              {...register("id", { required: "ID is required" })}
              className="form-input"
            />
            {errors.id && <p className="error-message">{errors.id.message}</p>}
          </label>

          <label className="form-label">
            Developer Level:
            <select
              {...register("level", { required: "Level is required" })}
              className="form-select"
            >
              <option value="">Select an option</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
              <option value="pro">Pro</option>
            </select>
            {errors.level && (
              <p className="error-message">{errors.level.message}</p>
            )}
          </label>

          <button type="submit" className="submit-button">
            {isLoading ? "Loading ..." : "Get Estimate"}
          </button>
        </form>

        <div>
          {data && (
            <div>
              <h3>Result</h3>
              <div> Complexity : {data?.Complexity || ""}</div>
              <br />
              <div> Risk : {data?.Risk || ""}</div>
              <br />
              <div>
                Estimated Story Points : {data?.Estimated_Story_Points || ""}
              </div>
              <br />
              <div>Description : {data?.Description || ""}</div>
            </div>
          )}
          {error && (
            <p style={{ color: "red", fontSize: 15, textAlign: "center" }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstimationForm;
