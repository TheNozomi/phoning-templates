import { Member } from './member';

export interface IChatAttachment {
  type: 'image' | 'video' | 'audio';
  url: string;
}

export interface BaseChatEntry {
  member: Member;
  timestamp: Date;
}

export interface TextChatEntry extends BaseChatEntry {
  content: string;
  attachment?: never;
}

export interface AttachmentChatEntry extends BaseChatEntry {
  content?: never;
  attachment: IChatAttachment; // TODO: messages can have more than one attachment?
}

export type IChatEntry = TextChatEntry | AttachmentChatEntry;
