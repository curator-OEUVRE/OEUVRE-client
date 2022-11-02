import { FlatList, StyleSheet } from 'react-native';
import PictureDescriptionItem from './PictureDescriptionItem';
import { useCreateFloorStore } from '@/states/createFloorStore';

interface Props {
  onHashtagPress: (id: number) => void;
}

const styles = StyleSheet.create({
  flatList: {
    height: '100%',
  },
});

const PictureDescriptionList = ({ onHashtagPress }: Props) => {
  const { pictures, onChangeDescriptionByIdx, tempPictures, isEditMode } =
    useCreateFloorStore();
  const data = isEditMode ? tempPictures : pictures;
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => `picture_${index}`}
      renderItem={({ item, index }) => (
        <PictureDescriptionItem
          {...item}
          onChangeDescription={onChangeDescriptionByIdx(index)}
          onHashtagPress={() => {
            // TODO: DB 상의 id로 바꿔야 함
            onHashtagPress(index);
          }}
        />
      )}
      style={styles.flatList}
    />
  );
};

export default PictureDescriptionList;
