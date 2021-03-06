import app from "firebase/app";

import { testStore } from "../utils/testUtils";
import { getProfilePic, updateProfilePic } from "../../store/actions/profile";
import { initialState as initialProfileState } from "../../store/reducers/profile";
import { firebaseMock } from "../utils/mocks";

describe("profile action creators", () => {
  const profilePicData = {
    key: "avatar",
    dataUrl: "avatarDataUrl",
  };

  beforeEach(() => {
    // @ts-ignore
    app.database = firebaseMock(profilePicData.dataUrl);
  });

  describe("getProfilePic action creator", () => {
    it(`should update store with new ${profilePicData.key} profile pic`, async (done) => {
      const store = testStore();

      await store.dispatch(getProfilePic("", profilePicData.key));

      const newState = store.getState();
      const expectedProfileState = {
        ...initialProfileState,
        [profilePicData.key]: profilePicData.dataUrl,
      };
      expect(newState.profile).toEqual(expectedProfileState);

      done();
    });
  });

  describe("updateProfilePic action creator", () => {
    it(`should update existing ${profilePicData.key} profile pic in store`, async (done) => {
      const store = testStore();
      const currentProfileState = store.getState().profile;

      await store.dispatch(
        updateProfilePic("", profilePicData.key, profilePicData.dataUrl)
      );

      const newState = store.getState();
      expect(newState.profile).toEqual({
        ...currentProfileState,
        [profilePicData.key]: profilePicData.dataUrl,
      });

      done();
    });
  });
});
