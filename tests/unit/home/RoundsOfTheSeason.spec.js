import { mount, createLocalVue } from "@vue/test-utils"
import RoundsOfTheSeason from "@/components/home/RoundsOfTheSeason.vue"
import { racesOfTheSeason } from "@/services/f1";
import Vuex from 'vuex'
import Vuetify from 'vuetify'

jest.mock("@/services/f1", () => ({
  ...(jest.requireActual("@/services/f1")),
  racesOfTheSeason: jest.fn()
}))

const localVue = createLocalVue()

const MOCK_RACES = [
  {
    season: "2020",
    round: "1",
    raceName: "Austrian Grand Prix",
    Circuit: {
      Location: {
        country: "Austria"
      }
    },
    date: "2020-07-05",
    time: "13:10:00Z"
  },
  {
    season: "2020",
    round: "2",
    raceName: "Styrian Grand Prix",
    Circuit: {
      Location: {
        country: "Austria"
      }
    },
    date: "2020-07-05",
    time: "13:10:00Z"
  },
  {
    season: "2020",
    round: "3",
    raceName: "Hungarian Grand Prix",
    Circuit: {
      Location: {
        country: "Hungary"
      }
    },
    date: "2020-07-05",
    time: "13:10:00Z"
  },
]

localVue.use(Vuex)

describe("RoundsOfTheSeason.vue", () => {
  let vuetify
  let actions
  let getters
  let store

  beforeEach(() => {
    vuetify = new Vuetify()

    actions = {
      newRound: jest.fn()
    }

    getters = {
      year: () => ''
    }

    store = new Vuex.Store({
      actions,
      getters
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("when the api returns success", () => {
    beforeEach(async () => {
      racesOfTheSeason.mockImplementation(
        () => {
          return Promise.resolve(MOCK_RACES)
        }
      )
    })

    it("have tab with options", async () => {
      const wrapper = mount(RoundsOfTheSeason, {
        localVue,
        store,
        vuetify
      })

      const mockApi = await racesOfTheSeason

      expect(mockApi).toHaveBeenCalled()
      expect(mockApi).toHaveBeenCalledTimes(1);

      const tabsContainer = wrapper.find(".v-tabs")

      expect(tabsContainer.exists()).toBe(true)
      
      await wrapper.vm.$forceUpdate()

      const tabs = wrapper.findAll('.v-tab')

      expect(tabs).toHaveLength(3)
    })
  })

  describe("when the api returns error", () => {
    beforeEach(async () => {
      racesOfTheSeason.mockImplementation(
        () => {
          return Promise.reject([])
        }
      )
    })

    it("have an empty tab", async () => {
      const wrapper = mount(RoundsOfTheSeason, {
        localVue,
        store,
        vuetify
      })

      const mockApi = await racesOfTheSeason

      expect(mockApi).toHaveBeenCalled()
      expect(mockApi).toHaveBeenCalledTimes(1);

      const tabsContainer = wrapper.find(".v-tabs")

      expect(tabsContainer.exists()).toBe(true)
      
      await wrapper.vm.$forceUpdate()

      const tabs = wrapper.findAll('.v-tab')

      expect(tabs).toHaveLength(0)
    })
  })
})