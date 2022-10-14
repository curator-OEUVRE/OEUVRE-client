import create from 'zustand';

export interface PictureInfo {
  imageUri: string;
  description: string;
}

interface CreateFloorStore {
  pictures: PictureInfo[];
  createPicturesByImageUris: (imageUrls: string[]) => void;
  onChangeDescriptionByIdx: (idx: number) => (description: string) => void;
}

const createDefaultPictureInfo = (imageUri: string): PictureInfo => ({
  imageUri,
  description: '',
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
}));
