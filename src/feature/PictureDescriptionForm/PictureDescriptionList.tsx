import { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PictureDescriptionItem from './PictureDescriptionItem';
import { Picture } from '@/types/picture';

interface Props {
  onHashtagPress: (id: number) => void;
  data: Picture[];
  changeDescriptionByIdx: (idx: number, description: string) => void;
}

const styles = StyleSheet.create({
  flatList: {
    height: '100%',
  },
});

const PictureDescriptionList = ({
  onHashtagPress,
  data,
  changeDescriptionByIdx,
}: Props) => {
  const createOnChangeDescription = useCallback(
    (idx: number) => (description: string) =>
      changeDescriptionByIdx(idx, description),
    [changeDescriptionByIdx],
  );
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => `picture_${index}`}
      renderItem={({ item, index }) => (
        <PictureDescriptionItem
          {...item}
          onChangeDescription={createOnChangeDescription(index)}
          onHashtagPress={() => {
            // TODO: DB 상의 id로 바꿔야 함
            onHashtagPress(index);
          }}
        />
      )}
      style={styles.flatList}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PictureDescriptionList;
