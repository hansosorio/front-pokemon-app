import LoginPage from "../../../../src/components/login/LoginPage.vue";


describe('Test LoginPage Component', () => {
    test('is a Vue instance', () => {
        const wrapper = shallowMount(LoginPage)
        expect(wrapper.vm).toBeTruthy()
    })

})
