import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import queryString, { StringifiableRecord } from 'query-string';
import { DYNAMIC_LINK_BASE } from '@/constants/dynamicLinks';

export const buildDynamicLink = async (
  query?: StringifiableRecord,
  socialParams?: FirebaseDynamicLinksTypes.DynamicLinkSocialParameters,
) => {
  const url = queryString.stringifyUrl({ url: DYNAMIC_LINK_BASE, query });

  const dynamicLink = await dynamicLinks().buildShortLink({
    link: url,
    domainUriPrefix: DYNAMIC_LINK_BASE,
    navigation: {
      forcedRedirectEnabled: true,
    },
    social: socialParams,
  });

  return dynamicLink;
};
