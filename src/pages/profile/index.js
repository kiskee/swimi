import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
  }
  console.log(user);

  if (!user) return <>Not</>;
  return (
    <>
      <div>
        <h1
          className="text-3xl font-semibold tracking-wide
            mt-6"
        >
          Profile
        </h1>
        <h1 className="font-medium text-gray-500 my-2">
          Username: {user.attributes.name}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Email: {user.attributes.email}
        </p>
        <button
          className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100  md:p-0 text-red-600"
          onClick={() => Auth.signOut()}
        >
          Signout
        </button>
      </div>
    </>
  );
}
export default withAuthenticator(Profile);
