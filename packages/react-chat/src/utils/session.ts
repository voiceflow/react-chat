import cuid from 'cuid';

import type { SessionOptions } from '@/types';
import { ChatPersistence } from '@/types';

import { broadcast, BroadcastType } from './broadcast';

const VOICEFLOW_SESSION_KEY = 'voiceflow-session';

const getSessionKey = (projectID: string) => `${VOICEFLOW_SESSION_KEY}-${projectID}`;

const getStorageSession = (storage: Storage, projectID: string): SessionOptions | null => {
  try {
    return JSON.parse(storage.getItem(getSessionKey(projectID))!);
  } catch {
    return null;
  }
};

const setStorageSession = (storage: Storage, projectID: string, options: SessionOptions) => {
  storage.setItem(getSessionKey(projectID), JSON.stringify(options));

  return options;
};

//  we can't use function default param `userID = cuid()`, cause it'll break sessions for anonymous users (when the userID is not provided by app)
const resolveSession = (storage: Storage, projectID: string, userID?: string) => {
  const session = getStorageSession(storage, projectID);

  if (!session || (userID && session.userID !== userID)) {
    return setStorageSession(storage, projectID, { userID: userID || cuid() });
  }

  return session;
};

//  we can't use function default param `userID = cuid()`, cause it'll break sessions for anonymous users (when the userID is not provided by app)
export const getSession = (persistence: ChatPersistence, projectID: string, userID?: string): SessionOptions => {
  switch (persistence) {
    case ChatPersistence.MEMORY:
      return { userID: userID || cuid() };
    case ChatPersistence.LOCAL_STORAGE:
      return resolveSession(localStorage, projectID, userID);
    case ChatPersistence.SESSION_STORAGE:
    default:
      return resolveSession(sessionStorage, projectID, userID);
  }
};

export const saveSession = (persistence: ChatPersistence, projectID: string, session: SessionOptions): void => {
  broadcast({ type: BroadcastType.SAVE_SESSION, payload: session });

  if (persistence === ChatPersistence.LOCAL_STORAGE) {
    setStorageSession(localStorage, projectID, session);
  } else if (persistence === ChatPersistence.SESSION_STORAGE) {
    setStorageSession(sessionStorage, projectID, session);
  }

  if (persistence !== ChatPersistence.LOCAL_STORAGE) {
    localStorage.removeItem(getSessionKey(projectID));
  }
  if (persistence !== ChatPersistence.SESSION_STORAGE) {
    sessionStorage.removeItem(getSessionKey(projectID));
  }
};
