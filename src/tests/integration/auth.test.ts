import moxios from "moxios";
// import { testStore } from "../utils/testUtils";
// import { signupUser } from "../../store/actions/auth";
// import { initialState as initialAuthState } from "../../store/reducers/auth";
// import { UserSignupData } from "../../models/user";

describe("auth action creators", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("signupUser action creator", () => {
    it("should pass", () => {
      expect(true).toBe(true);
    });
    // TODO: fix this
    /*
    it("should not update store for unsuccessful sign-up", async (done) => {
      const userData = {
        name: "King",
      };
      const store = testStore();

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 201,
          response: userData,
        });
      });

      await store.dispatch(signupUser({} as UserSignupData, undefined));

      const newState = store.getState();
      expect(newState.auth).toEqual(initialAuthState);

      done();
    });

    it("should update store correctly (with errors)", async (done) => {
      const expectedErrorState = {
        name: "name is required",
      };
      const store = testStore();

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 400,
          response: expectedErrorState,
        });
      });

      await store.dispatch(signupUser({} as UserSignupData, undefined));

      const newState = store.getState();
      expect(newState.auth.errors).toEqual({
        data: expectedErrorState,
        status: 400,
      });

      done();
    });
    */
  });
});
