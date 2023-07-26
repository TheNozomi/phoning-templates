import { Member } from './member';

export interface IChatAttachment {
  type: 'image' | 'video' | 'audio';
  url: string;
}

export interface IChatEntry {
  id: string;
  member: Member;
  timestamp: Date;
  content?: string;
  attachment?: IChatAttachment;
}
