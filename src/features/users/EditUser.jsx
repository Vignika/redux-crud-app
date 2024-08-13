import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; // Updated imports
import { useState } from "react";
import { userUpdated } from "./usersSlice";

export function EditUser() {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) =>
    state.users.entities.find((user) => user.id === userId)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleClick = () => {
    if (name && email) {
      dispatch(
        userUpdated({
          id: userId,
          name,
          email,
        })
      );

      setError(null);
      navigate("/"); // Replaced history.push with navigate
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit User</h1>
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
          {error && <p>{error}</p>} {/* Wrapped error in a <p> tag */}
          <button onClick={handleClick} className="button-primary">
            Save User
          </button>
        </div>
      </div>
    </div>
  );
}
