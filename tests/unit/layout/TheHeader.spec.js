import { mount, createLocalVue } from '@vue/test-utils'
import TheHeader from "@/components/layout/TheHeader"
import Vuex from 'vuex'
import Vuetify from 'vuetify'

const localVue = createLocalVue()

localVue.use(Vuex)

describe("TheHeader.vue", () => {
  let vuetify
  let actions
  let store

  beforeEach(() => {
    vuetify = new Vuetify()

    actions = {
      newYear: jest.fn()
    }

    store = new Vuex.Store({
      actions,
    })
  })

  describe("has a reset button", () => {
    it("it should change router", async () =>  {
      const mockRouter = {
        push: jest.fn()
      }

      const wrapper = mount(TheHeader, {
        localVue,
        vuetify,
        store,
        mocks: {
          $router: mockRouter
        }
      })

      const button = wrapper.find('.v-btn')

      await button.trigger('click')

      expect(mockRouter.push).toHaveBeenCalledTimes(1)
      expect(mockRouter.push).toHaveBeenCalledWith('/')
    })
  })
})