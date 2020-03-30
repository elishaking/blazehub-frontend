import moxios from "moxios";
import { testStore } from "../utils/testUtils";
import { signupUser } from "../../actions/authActions";
import { initialState as initialAuthState } from "../../reducers/authReducer";
import { UserSignupData } from "../../models/user";

describe("auth action creators", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("signupUser action creator", () => {
    it("should not update store for unsuccessful sign-up", async done => {
      const userData = {
        name: "King"
      };
      const store = testStore();

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 201,
          response: userData
        });
      });

      await store.dispatch(signupUser({} as UserSignupData, undefined));

      const newState = store.getState();
      expect(newState.auth).toEqual(initialAuthState);

      done();
    });

    it("should update store correctly (with errors)", async done => {
      const expectedErrorState = {
        name: "name is required"
      };
      const store = testStore();

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 400,
          response: expectedErrorState
        });
      });

      await store.dispatch(signupUser({} as UserSignupData, undefined));

      const newState = store.getState();
      expect(newState.auth.errors).toEqual(expectedErrorState);

      done();
    });
  });
});
