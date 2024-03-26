import * as React from "react";
import { useState } from "react";
import LoginForm from "./LoginPage";
import RegisterForm from "./RegisterPage";
import FormToggleButtons from "../components/FormToggleButtons";
import SpinningGlobe from "../components/SpinningGlobe";

function AccountPage() {
  const [alignment, setAlignment] = useState('Login');

  return (
    <div className="h-screen w-screen bg-webBackground flex flex-col items-center">
      <header className="w-full p-2 py-3 bg-webTertiary">
        <h1 className="text-4xl font-bold text-webPrimary">Town Trekker</h1>
      </header>
      <header className="w-full p-2 pl-7 bg-webSecondary">
        <h2 className="text-2xl font-bold text-webTertiary">A Geography Guessing Game About Your Town!</h2>
      </header>
      <div className="flex flex-row w-full justify-around items-center flex-grow">
        <div className="w-1/2 h-full flex justify-center items-center">
          <SpinningGlobe />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <FormToggleButtons alignment={alignment} setAlignment={setAlignment} />
          <div id="forms" className="w-full p-4">
            {alignment === 'Login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;

