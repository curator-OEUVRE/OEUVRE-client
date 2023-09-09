export enum HomeFloorFilter {
  FOLLOWING = 'following',
  LATEST = 'latest',
}

export interface HomeFloor {
  exhibitionName: string;
  floorName: string;
  floorNo: number;
  height: number;
  id: string;
  isMine: boolean;
  isNew: boolean;
  isUpdated: boolean;
  profileImageUrl: string;
  queue: number;
  thumbnailUrl: string;
  updateCount: number;
  updatedAt: string;
  userNo: number;
  width: number;
  floorDescription: string;
}

export interface GetHomeFeedParams {
  page: number;
  size: number;
  view: HomeFloorFilter;
}

export interface GetHomeFeedResponseDto {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    contents: HomeFloor[];
    isLastPage: boolean;
  };
  timestamp: string;
}