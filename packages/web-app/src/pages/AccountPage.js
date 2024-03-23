import * as React from "react";
import { useState } from "react";
import LoginForm from "./LoginPage";
import RegisterForm from "./RegisterPage";
import FormToggleButtons from "../components/FormToggleButtons";
import SpinningGlobe from "../components/SpinningGlobe";

function AccountPage() {
  const [alignment, setAlignment] = useState('Login');

  return (
    <div className="h-screen w-screen bg-webBackground">
      <header className="h-14 w-full p-2 py-3 bg-webTertiary">
        <h1 className="text-4xl font-bold text-webPrimary">Town Trekker</h1>
      </header>
      <header className="h-12 w-full p-2 pl-7 bg-webSecondary">
        <h2 className="text-2xl font-bold text-webTertiary">A Geography Guessing Game About Your Town!</h2>
      </header>
      <div className="m-12 flex flex-col items-center justify-start rounded-3xl pb-52 opacity-75 bg-webTertiary">
        <div className="mt-6 mb-6"> {}
          <FormToggleButtons alignment={alignment} setAlignment={setAlignment} />
        </div>
        <div id="forms" className="w-full p-4 flex justify-center">
          <SpinningGlobe />
          {alignment === 'Login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
