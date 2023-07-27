import DefaultAvatar from '../assets/avatars/default.png';
import MinjiAvatar from '../assets/avatars/minji.png';
import HanniAvatar from '../assets/avatars/hanni.png';
import HaerinAvatar from '../assets/avatars/haerin.png';
import DanielleAvatar from '../assets/avatars/danielle.png';
import HyeinAvatar from '../assets/avatars/hyein.png';

export const getAvatar = (name: string) => {
  switch (name.toLowerCase()) {
    case 'minji':
      return MinjiAvatar;
    case 'hanni':
      return HanniAvatar;
    case 'haerin':
      return HaerinAvatar;
    case 'danielle':
      return DanielleAvatar;
    case 'hyein':
      return HyeinAvatar;
    default:
      return DefaultAvatar;
  }
};
