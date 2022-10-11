import { FlatList } from 'react-native';
import PictureDescriptionItem, {
  PictureDescriptionItemProps,
} from './PictureDescriptionItem';
import { useCreateFloorStore } from '@/states/createFloorStore';

const PictureDescriptionList = () => {
  const { pictures, onChangeDescriptionByIdx } = useCreateFloorStore();
  return (
    <FlatList
      data={pictures}
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
export { PictureDescriptionItemProps };
