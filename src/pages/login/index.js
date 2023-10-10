import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Image from "next/image";
import svgLogo from "../../../public/final.png";
import { Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const components = {
  Header() {
    return (
      <div className="items-center mb-4 ">
        <Image alt="svgnatacion-logo" src={svgLogo} height={200} width={200} />
      </div>
    );
  },
};

function LoginPage() {
  const [signedInUser, setSignedInUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function authListener() {
      Hub.listen("auth", (data) => {
        switch (data.payload.event) {
          case "signIn":
            return setSignedInUser(true);
          case "signOut":
            setSignedInUser(false);
            setAdmin("");
            break;
        }
      });
    }
    authListener();
  }, [signedInUser]);

  if (signedInUser) {
    router.push("/");
  }

  async function getSession() {
    try {
      const resp = await Auth.currentSession();
      console.log();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Authenticator
      signUpAttributes={["birthdate", "email", "gender", "name"]}
      className="mt-12"
      components={components}
    ></Authenticator>
  );
}

export default LoginPage;
