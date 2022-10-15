import create from 'zustand';

export interface PictureInfo {
  imageUri: string;
  description: string;
  hashtags: string[];
}

interface CreateFloorStore {
  pictures: PictureInfo[];
  createPicturesByImageUris: (imageUrls: string[]) => void;
  onChangeDescriptionByIdx: (idx: number) => (description: string) => void;
  setHashtag: (imageIndex: number, hashtags: string[]) => void;
}

const createDefaultPictureInfo = (imageUri: string): PictureInfo => ({
  imageUri,
  description: '',
  hashtags: [],
});

export const useCreateFloorStore = create<CreateFloorStore>()((set) => ({
  pictures: [],
  createPicturesByImageUris: (imageUrls: string[]) => {
    set((state) => ({
      ...state,
      pictures: imageUrls.map((uri) => createDefaultPictureInfo(uri)),
    }));
  },
  onChangeDescriptionByIdx: (idx: number) => (description: string) => {
    set((state) => ({
      ...state,
      pictures: [
        ...state.pictures.slice(0, idx),
        { ...state.pictures[idx], description },
        ...state.pictures.slice(idx + 1),
      ],
    }));
  },
  setHashtag: (imageIndex, hashtags) => {
    set((state) => ({
      ...state,
      pictures: state.pictures.map((picture, index) => {
        if (index === imageIndex) {
          return { ...picture, hashtags };
        }
        return picture;
      }),
    }));
  },
}));
