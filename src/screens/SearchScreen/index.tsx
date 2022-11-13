import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SearchScreenParams = {
  text: string;
};

const SearchScreen = () => (
  <SafeAreaView>
    <Text>SearchScreen</Text>
  </SafeAreaView>
);

export default SearchScreen;
