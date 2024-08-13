import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Updated import
import { useState } from "react";
import { userAdded } from "./usersSlice";

export function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const usersAmount = useSelector((state) => state.users.entities.length);

  const handleClick = () => {
    if (name && email) {
      dispatch(
        userAdded({
          id: usersAmount + 1,
          name,
          email,
        })
      );

      setError(null);
      navigate("/"); // Replaced history.push with navigate
    } else {
      setError("Please fill in all fields.");
    }

    setName("");
    setEmail("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add User</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="John Doe"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label htmlFor="emailInput">Email</label>
          <input
            className="u-full-width"
            type="email"
            placeholder="johndoe@example.com"
            id="emailInput"
            onChange={handleEmail}
            value={email}
          />
          {error && <p>{error}</p>}
          <button onClick={handleClick} className="button-primary">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}
