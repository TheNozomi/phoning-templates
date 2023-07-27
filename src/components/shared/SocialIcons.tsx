import { Flex, Text } from '@mantine/core';
import Image from 'next/image';
import InstagramIcon from '../../assets/icons/Instagram_icon.png';
import TwitterIcon from '../../assets/icons/Twitter-logo.svg';

export const SocialIcons = () => (
  <Flex align="center" justify="right" gap={8}>
    <Image width="24" src={InstagramIcon} alt="Instagram icon" />
    <Image width="24" src={TwitterIcon} alt="Twitter icon" />
    <Text align="right" size="lg" color="blue">
      @newjeansar
    </Text>
  </Flex>
);
