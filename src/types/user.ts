export interface UserProfile {
  backgroundImageUrl?: string;
  exhibitionName: string;
  followerCount: number;
  followingCount: number;
  id: string;
  introduceMessage: string;
  name: string;
  profileImageUrl: string;
}

export interface MyProfile extends UserProfile {
  isCommentAlarmOn: boolean;
  isGroupExhibitionAlarmOn: boolean;
  isLikeAlarmOn: boolean;
  isFollowAlarmOn: boolean;
}

export interface OtherUserProfile extends UserProfile {
  isFollower: boolean;
  isFollowing: boolean;
}
