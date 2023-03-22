import { test, describe, expect, vi } from "vitest";
import LoginPage from "../../../../src/components/login/LoginPage.vue";
import { mount } from "@vue/test-utils";

describe("Test LoginPage Component", () => {
    test("LoginPage: is a Vue instance", async () => {
        expect(LoginPage).toBeTruthy();
        const wrapper = mount(LoginPage, {
        props: {},
        });
        expect(wrapper.text()).toContain("Sign in to Pokemon App");

        const emailWithSpaces = "    email@email.com    ";
        await wrapper.find("input").setValue(emailWithSpaces);
        expect(wrapper.vm.email).toBe(emailWithSpaces.trim());
    });

    test("LoginPage: Computed: isEmailValid: should be false when user email is not valid", () => {
        const { isEmailValid } = LoginPage.computed;
        expect(isEmailValid.call({ email: "email@email.com" })).toBe(true);
        expect(isEmailValid.call({ email: "e@email.com" })).toBe(true);
        expect(isEmailValid.call({ email: "abc@" })).toBe(false);
        expect(isEmailValid.call({ email: null })).toBe(false);
        expect(isEmailValid.call({ email: undefined })).toBe(false);
        expect(isEmailValid.call({ email: 0 })).toBe(false);
        expect(isEmailValid.call({ email: 1 })).toBe(false);
    });

    test("LoginPage: Computed: isPasswordValid: should be false when user password is not valid", () => {
        const { isPasswordValid } = LoginPage.computed;
        expect(isPasswordValid.call({ password: "12345678" })).toBe(true);
        expect(isPasswordValid.call({ password: "abc123def456" })).toBe(true);
        expect(isPasswordValid.call({ password: "12" })).toBe(false);
        expect(isPasswordValid.call({ password: null })).toBe(false);
        expect(isPasswordValid.call({ password: undefined })).toBe(false);
        expect(isPasswordValid.call({ password: 0 })).toBe(false);
        expect(isPasswordValid.call({ password: 1 })).toBe(false);
    });

    test("LoginPage: Computed: isFormValid: should be false when user email or password is not valid", () => {
        const { isFormValid } = LoginPage.computed;
        expect(
        isFormValid.call({
            isEmailValid: () => true,
            isPasswordValid: () => true
        })()
        ).toBe(true);
        expect(
        isFormValid.call({
            isEmailValid: () => false,
            isPasswordValid: () => false
        })()
        ).toBe(false);
    });

    test("LoginPage: Methods: handleSubmit: should show error when user email or password is not valid", () => {
        const { handleSubmit } = LoginPage.methods;
        let localThis = {
        isError: null,
        isFormValid: false,
        localStorage: { setItem: () => null },
        $router: { push: vi.fn() },
        };
        handleSubmit.call(localThis);
        expect(localThis.isError).toBe(true);
        expect(localThis.$router.push).not.toHaveBeenCalled();

        localThis.isFormValid = true;
        handleSubmit.call(localThis);
        expect(localThis.isError).toBe(false);
        expect(localThis.$router.push).toHaveBeenCalledTimes(1);
    });
});
