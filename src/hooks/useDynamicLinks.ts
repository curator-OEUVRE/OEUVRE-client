import dynamicLinks, {
  type FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import queryString from 'query-string';
import { useEffect } from 'react';
import { DYNAMIC_LINK_BASE } from '@/constants/dynamicLinks';

export type OnDynamicLink = (
  params: Record<string, string | null | (string | null)[]>,
) => void;

const baseCallback = (
  link: FirebaseDynamicLinksTypes.DynamicLink | null,
  callback?: OnDynamicLink,
) => {
  if (link?.url.startsWith(DYNAMIC_LINK_BASE)) {
    const parsed = queryString.parseUrl(link.url);
    callback?.(parsed.query);
  }
};

const useDynamicLinks = (onLink?: OnDynamicLink) => {
  useEffect(() => {
    const links = dynamicLinks();
    const callback = (link: FirebaseDynamicLinksTypes.DynamicLink | null) =>
      baseCallback(link, onLink);

    links.getInitialLink().then(callback);
    const unsubscribe = links.onLink(callback);
    return () => {
      unsubscribe();
    };
  }, [onLink]);
};

export default useDynamicLinks;
