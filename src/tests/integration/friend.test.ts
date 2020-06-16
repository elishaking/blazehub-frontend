import moxios from "moxios";
import { firebaseMock } from "../utils/mocks";
import { getFriends, addFriend } from "../../actions/friend";
import { testStore } from "../utils/testUtils";
import app from "firebase/app";
import { Friend } from "../../models/friend";

describe("friend action creators", () => {
  const friends = {
    "friend-1": {
      name: "John",
    },
    "friend-2": {
      name: "James",
    },
  };

  beforeEach(() => {
    moxios.install();

    // @ts-ignore
    app.database = firebaseMock();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("getFriends action creator", () => {
    it("should update store with friends", async (done) => {
      const store = testStore();
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response: {
            data: friends,
          },
        });
      });

      await store.dispatch(getFriends());
      const newState = store.getState();
      expect(newState.friends).toEqual(friends);

      done();
    });
  });

  describe("addFriend action creator", () => {
    it("should update store with new friend", async (done) => {
      const initialState = { friends };
      const store = testStore(initialState);

      const newFriend = {
        "friend-3": { name: "Alexios" },
      };

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 201,
          response: {
            data: newFriend,
          },
        });
      });

      await store.dispatch(addFriend("", {} as Friend));
      const newState = store.getState();
      expect(newState.friends).toEqual({
        ...friends,
        ...newFriend,
      });

      done();
    });
  });
});
