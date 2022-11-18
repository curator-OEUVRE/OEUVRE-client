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
  isMessageAlarmOn: boolean;
  userNo: number;
}

export interface OtherUserProfile extends UserProfile {
  isFollower: boolean;
  isFollowing: boolean;
}

export interface UserMini {
  id: string;
  isFollowing: boolean;
  isFollower: boolean;
  isMe: boolean;
  name: string;
  profileImageUrl: string;
  userNo: number;
}
