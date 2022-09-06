import type { SystemResponseProps } from '@/components/SystemResponse';
import type { UserResponseProps } from '@/components/UserResponse';

export enum TurnType {
  USER = 'user',
  SYSTEM = 'system',
}

export interface UserTurnProps extends UserResponseProps {
  type: TurnType.USER;
}

export interface SystemTurnProps extends Omit<SystemResponseProps, 'image'> {
  type: TurnType.SYSTEM;
  timestamp: Date;
}

export type TurnProps = UserTurnProps | SystemTurnProps;
