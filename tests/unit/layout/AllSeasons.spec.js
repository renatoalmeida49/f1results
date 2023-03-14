import { mount, createLocalVue } from '@vue/test-utils'
import { allSeasons } from "@/services/f1";
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import AllSeasons from "@/components/layout/AllSeasons.vue"
import Vuetify from 'vuetify'

jest.mock("@/services/f1", () => ({
  ...(jest.requireActual("@/services/f1")),
  allSeasons: jest.fn()
}))

const localVue = createLocalVue()

const MOCK_SEASONS = ['2021', '2022', '2023']

describe('AllSeasons.vue', () => {
  // VUEX
  let actions
  let getters
  let store

  //VUETIFY
  let vuetify
  
  localVue.use(Vuex)
  localVue.use(VueRouter)
  const router = new VueRouter()

  beforeEach(() => {
    vuetify = new Vuetify()

    actions = {
      newYear: jest.fn()
    }

    getters = {
      year: () => '',
    }

    store = new Vuex.Store({
      actions,
      getters
    })
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("when the api returns success", () => {
    beforeEach(async () => {
      allSeasons.mockImplementation(
        () => {
          return Promise.resolve(MOCK_SEASONS)
        }
      )
    })

    it("have a select with options", async () => {
      const wrapper = mount(AllSeasons, 
        {
          localVue,
          router,
          store,
          vuetify
        }
      )

      const mockApi = await allSeasons

      expect(mockApi).toHaveBeenCalled()
      expect(mockApi).toHaveBeenCalledTimes(1);

      expect(wrapper.find(".v-select").exists()).toBe(true)

      await wrapper.vm.$forceUpdate();

      const items = wrapper.find(".v-select").props('items')

      expect(items).toStrictEqual(MOCK_SEASONS)
    })
  })

  describe("when the api returns error", () => {
    beforeEach(async () => {
      allSeasons.mockImplementation(
        () => {
          return Promise.reject([])
        }
      )
    })

    it("have an empty select", async () => {
      const wrapper = mount(AllSeasons, 
        {
          localVue,
          router,
          store,
          vuetify
        }
      )

      const mockApi = await allSeasons

      expect(mockApi).toHaveBeenCalled()
      expect(mockApi).toHaveBeenCalledTimes(1);

      expect(wrapper.find(".v-select").exists()).toBe(true)

      await wrapper.vm.$forceUpdate();

      const items = wrapper.find(".v-select").props('items')

      expect(items).toStrictEqual([])
    })
  })
})