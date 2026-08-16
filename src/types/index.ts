// User types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  banner?: string;
  bio?: string;
  status: 'online' | 'idle' | 'dnd' | 'offline' | 'invisible';
  customStatus?: string;
  level: number;
  xp: number;
  profileColor: string;
  isVerified: boolean;
  isPremium: boolean;
  createdAt: Date;
}

// Community types
export interface Community {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  banner?: string;
  description?: string;
  category: string;
  isPublic: boolean;
  memberCount: number;
  onlineCount: number;
  ownerId: string;
  createdAt: Date;
}

// Room types
export interface Room {
  id: string;
  communityId: string;
  name: string;
  type: 'text' | 'voice' | 'media' | 'announcements';
  description?: string;
  isPrivate: boolean;
  createdAt: Date;
}

// Message types
export interface Message {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  communityId: string;
  roomId: string;
  replyToId?: string;
  replyTo?: Message;
  isEdited: boolean;
  reactions: Reaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: User[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
