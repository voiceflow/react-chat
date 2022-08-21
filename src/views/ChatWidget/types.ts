import { SystemResponseProps } from '@/components/SystemResponse';
import { UserResponseProps } from '@/components/UserResponse';

import { TurnType } from './constants';

export interface UserTurnProps extends UserResponseProps {
  type: TurnType.USER;
}

export interface SystemTurnProps extends SystemResponseProps {
  type: TurnType.SYSTEM;
}

export type TurnProps = UserTurnProps | SystemTurnProps;
