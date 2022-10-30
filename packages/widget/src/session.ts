import { ChatPersistence, cuid, SessionOptions } from '@voiceflow/react-chat';

const VOICEFLOW_SESSION_KEY = 'voiceflow-session';

const getStorageSession = (storage: Storage): SessionOptions | null => {
  try {
    return JSON.parse(storage.getItem(VOICEFLOW_SESSION_KEY)!);
  } catch {
    return null;
  }
};

const setStorageSession = (storage: Storage, options: SessionOptions) => {
  storage.setItem(VOICEFLOW_SESSION_KEY, JSON.stringify(options));
  return options;
};

const resolveSession = (storage: Storage, userID?: string) => {
  const session = getStorageSession(storage);
  if (!session || (userID && session.userID !== userID)) {
    return setStorageSession(storage, { userID: userID || cuid() });
  }
  return session;
};

export const getSession = (persistence: ChatPersistence, userID?: string): SessionOptions => {
  switch (persistence) {
    case ChatPersistence.MEMORY:
      return { userID: userID || cuid() };
    case ChatPersistence.LOCAL_STORAGE:
      return resolveSession(localStorage, userID);
    case ChatPersistence.SESSION_STORAGE:
    default:
      return resolveSession(sessionStorage, userID);
  }
};

export const saveSession = (persistence: ChatPersistence, session: SessionOptions): void => {
  if (persistence === ChatPersistence.LOCAL_STORAGE) {
    setStorageSession(localStorage, session);
  } else if (persistence === ChatPersistence.SESSION_STORAGE) {
    setStorageSession(sessionStorage, session);
  }

  if (persistence !== ChatPersistence.LOCAL_STORAGE) {
    localStorage.removeItem(VOICEFLOW_SESSION_KEY);
  }
  if (persistence !== ChatPersistence.SESSION_STORAGE) {
    sessionStorage.removeItem(VOICEFLOW_SESSION_KEY);
  }
};
