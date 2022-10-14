import { FlatList } from 'react-native';
import PictureDescriptionItem from './PictureDescriptionItem';
import { useCreateFloorStore } from '@/states/createFloorStore';

const PictureDescriptionList = () => {
  const { pictures, onChangeDescriptionByIdx } = useCreateFloorStore();
  return (
    <FlatList
      data={pictures}
      keyExtractor={(_, index) => `picture_${index}`}
      renderItem={({ item: { description, imageUri }, index }) => (
        <PictureDescriptionItem
          {...{ description, imageUri }}
          onChangeDescription={onChangeDescriptionByIdx(index)}
        />
      )}
    />
  );
};

export default PictureDescriptionList;
