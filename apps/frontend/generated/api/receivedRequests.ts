/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Social Network API
 * OpenAPI spec version: 1.0
 */
import type { User } from './user';

export interface ReceivedRequests {
  /** ID запроса */
  id: number;
  /** Пользователь */
  requester: User;
  /** Статус дружбы */
  status: string;
}
