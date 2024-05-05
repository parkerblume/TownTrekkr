import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe(HomePage, () => 
{
    it("Towns Button is rendered properly", () => 
    {
        const { getByRole } = render(
        <BrowserRouter>
            <HomePage/>
        </BrowserRouter>);
        const townBttn = getByRole("button", { name: "Towns" });
        expect(townBttn).toBeVisible
    })

    it("Clicking \"Towns\" button navigates to the Towns page", () =>
    {
        const { getByRole } = render(
            <BrowserRouter>
                <HomePage/>
            </BrowserRouter>);
        const townBttn = getByRole("button", { name: "Towns" });

        fireEvent.click(townBttn);
        expect(window.location.href).toEqual("http://localhost/MyTowns")
    })
});