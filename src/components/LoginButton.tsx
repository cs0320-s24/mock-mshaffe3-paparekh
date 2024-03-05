import { Dispatch, SetStateAction } from "react";

/**
 * Represents the properties required by the LoginButton component
 */
interface loginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

/**
 * A functional component to display a login/logout button based on the user's * authentication status
 * @param {LoginProps} props - The properties required by the component
 * @returns {JSX.Element} - The rendered login/logout button
 */
export function LoginButton(props: loginProps) {
  const authenticate = () => {
    const newValue = !props.isLoggedIn;
    props.setIsLoggedIn(newValue);
    return newValue;
  };

  if (props.isLoggedIn) {
    return (
      <button aria-label="Sign Out" onClick={authenticate}>
        Sign out
      </button>
    );
  } else {
    return (
      <button aria-label="Login" onClick={authenticate}>
        Login
      </button>
    );
  }
}
