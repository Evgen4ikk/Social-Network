/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Social Network API
 * OpenAPI spec version: 1.0
 */
import type { Friend } from './friend';

export interface FriendResponse {
  /** Пользователь */
  friend: Friend;
  /** ID пользователя */
  id: number;
  /** Статус дружбы */
  status: string;
}
