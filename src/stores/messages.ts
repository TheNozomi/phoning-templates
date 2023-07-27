import { v4 as randomUUID } from 'uuid';
import { create } from 'zustand';
import { IChatEntry } from '../types';

interface MessageStore {
  messages: IChatEntry[];
  addMessage: (message: Omit<IChatEntry, 'id'>) => void;
  updateMessage: (message: IChatEntry) => void;
  patchMessage: (message: Partial<IChatEntry>) => void;
  deleteMessage: (id: string) => void;
}

export const useMessageStore = create<MessageStore>(
  (set) => ({
    messages: [],
    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          {
            ...message,
            id: randomUUID(),
          },
        ],
      })),
    updateMessage: (message: IChatEntry) =>
      set((state) => ({
        messages: state.messages.map((m) =>
          m.id === message.id ? message : m
        ),
      })),
    patchMessage: (message: Partial<IChatEntry>) =>
      set((state) => ({
        messages: state.messages.map((m) =>
          m.id === message.id ? { ...m, ...message } : m
        ),
      })),
    deleteMessage: (id: string) =>
      set((state) => ({
        messages: state.messages.filter((m) => m.id !== id),
      })),
  })
);
