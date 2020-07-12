import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { createLogEntry } from "./Api";

const LogEntryForm = ({ location, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const onSubmit = async (data) => {
    setLoading(true);
    data.longitude = location.longitude;
    data.latitude = location.latitude;
    try {
      const created = await createLogEntry(data);
      console.log(created);

      onClose();
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };
  return (
    <form className="entryform" onSubmit={handleSubmit(onSubmit)}>
      <h5>Add new log entry</h5>
      <label className="label" htmlFor="title">
        Title
      </label>
      <input ref={register} name="title" required />
      <label className="label" htmlFor="comments">
        Comments
      </label>
      <textarea ref={register} name="comments"></textarea>
      <label className="label" htmlFor="description">
        Description
      </label>
      <textarea ref={register} name="description"></textarea>
      <label className="label" htmlFor="image">
        Image
      </label>
      <input ref={register} name="image" />
      <label className="label" htmlFor="visitDate" required>
        Visit Date
      </label>
      <input ref={register} name="visitDate" type="date" />
      {error ? <h5 className="error">{error}</h5> : null}
      <button disabled={loading}>
        {!loading ? "Create Entry" : "Loading..."}
      </button>
    </form>
  );
};

export default LogEntryForm;
