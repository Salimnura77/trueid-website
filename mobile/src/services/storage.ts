import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PilotState } from "../domain/model";
import { serializeState, restoreState } from "../domain/persistence";
const KEY = "trueid.pilot.v1";
let pendingWrite: Promise<void> = Promise.resolve();
export const demoStorage = {
  async load() {
    return restoreState(await AsyncStorage.getItem(KEY), Date.now());
  },
  save(state: PilotState) {
    const value = serializeState(state);
    const write = pendingWrite
      .catch(() => undefined)
      .then(() => AsyncStorage.setItem(KEY, value));
    pendingWrite = write;
    return write;
  },
};
