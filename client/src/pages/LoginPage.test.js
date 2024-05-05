import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

describe(LoginPage, () =>
{
    const LOGIN = process.env.TEST_LOGIN;
    const PASS = process.env.TEST_PASS;

    it("Logging in with test user", () =>
    {
        const { getByLabelText } = render(
            <BrowserRouter>
                <LoginPage/>
            </BrowserRouter>);
        const loginField = getByLabelText("Email address");
        const passField = getByLabelText("Password");
        
        expect(loginField).toBeVisible;
        expect(passField).toBeVisible;
    });
});