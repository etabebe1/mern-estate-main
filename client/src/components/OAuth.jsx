import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

//POINT: OAuth functionality
//NOTE: The OAuth functionality returns button for using google authentication in the client side
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = result.user;

      const response = await axios.post(
        "http://localhost:8800/api/authentication/google",
        {
          displayName,
          email,
          photoURL,
        }
      );

      const { data } = response;

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 60);

      //* FIXME: httpOnly=false make it  "true" fro better security

      // removing existing cookie
      document.cookie = `accessToken= ${data.bearer.token}; expires = Tue, 01 jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;`;

      // set the token as a cookie with an expiration data of 60 days
      document.cookie = `accessToken=${
        data.bearer.token
      }; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=None;`;

      console.log(data);

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <button
      type="button"
      className="bg-red-900 py-2 px-2 rounded-lg uppercase text-slate-300 hover:opacity-90"
      onClick={handleClick}
    >
      Continue with google
    </button>
  );
}
