import { mount, createLocalVue } from "@vue/test-utils"
import ChampionshipAfterRace from "@/components/home/ChampionshipAfterRace.vue"
import { championship } from "@/services/f1"
import Vuex from 'vuex'
import Vuetify from 'vuetify'

const MOCK_CHAMPIONSHIP = [
  {
    position: "1",
    positionText: "1",
    points: "25",
    wins: "1",
    Driver: {
      driverId: "bottas",
      permanentNumber: "77",
      code: "BOT",
      url: "http://en.wikipedia.org/wiki/Valtteri_Bottas",
      givenName: "Valtteri",
      familyName: "Bottas",
      dateOfBirth: "1989-08-28",
      nationality: "Finnish"
    },
    Constructors: [
      {
        constructorId: "mercedes",
        url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
        name: "Mercedes",
        nationality: "German"
      }
    ]
  },
  {
    position: "2",
    positionText: "2",
    points: "18",
    wins: "0",
    Driver: {
      driverId: "leclerc",
      permanentNumber: "16",
      code: "LEC",
      url: "http://en.wikipedia.org/wiki/Charles_Leclerc",
      givenName: "Charles",
      familyName: "Leclerc",
      dateOfBirth: "1997-10-16",
      nationality: "Monegasque"
    },
    Constructors: [
      {
        constructorId: "ferrari",
        url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
        name: "Ferrari",
        nationality: "Italian"
      }
    ]
  },
  {
    position: "3",
    positionText: "3",
    points: "16",
    wins: "0",
    Driver: {
      driverId: "norris",
      permanentNumber: "4",
      code: "NOR",
      url: "http://en.wikipedia.org/wiki/Lando_Norris",
      givenName: "Lando",
      familyName: "Norris",
      dateOfBirth: "1999-11-13",
      nationality: "British"
    },
    Constructors: [
      {
        constructorId: "mclaren",
        url: "http://en.wikipedia.org/wiki/McLaren",
        name: "McLaren",
        nationality: "British"
      }
    ]
  },
]

jest.mock("@/services/f1", () => ({
  ...(jest.requireActual("@/services/f1")),
  championship: jest.fn(() => MOCK_CHAMPIONSHIP)
}))

const localVue = createLocalVue()

localVue.use(Vuex)

describe.only("ChampionshipAfterRace.vue", () => {
  let vuetify
  let getters
  let store
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()

    getters = {
      year: () => '',
      round: () => ''
    }

    store = new Vuex.Store({
      getters
    })

    wrapper = mount(ChampionshipAfterRace, {
      localVue,
      vuetify,
      store,
    })
  })

  describe("when api returns success", () => {
    beforeEach(() => {
      championship.mockImplementation(
        () => {
          return Promise.resolve(MOCK_CHAMPIONSHIP)
        }
      )
    })

    it("should have a table with items", async () => {
      const mockApi = championship

      expect(mockApi).toHaveBeenCalled()
      expect(mockApi).toHaveBeenCalledTimes(1)

      const table = wrapper.find('.v-data-table')

      await wrapper.vm.$forceUpdate()

      const items = table.props('items')

      expect(items).toStrictEqual(MOCK_CHAMPIONSHIP)
    })
  })
})