import { OSHeaderDTO } from "@/src/domain/types/OSHeaderDTO";

export type HeaderState = {
    osHeaderList: OSHeaderDTO[],
  };
  
export type HeaderAction =
| { type: 'SET', payload: OSHeaderDTO[] }
  
export function osHeaderReducer(state: HeaderState, action: HeaderAction): HeaderState {
    switch (action.type) {
        case 'SET':
        return { osHeaderList: action.payload };
        default:
        return state;
    }
}