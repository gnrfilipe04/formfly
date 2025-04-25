import { OSFertigationDTO } from "@/src/domain/types/OSFertigationDTO";

export type FertigationState = {
    osFertigationList: OSFertigationDTO[],
  };
  
export type FertigationAction =
| { type: 'SET', payload: OSFertigationDTO[] }
  
export function osFertigationReducer(state: FertigationState, action: FertigationAction): FertigationState {
    switch (action.type) {
        case 'SET':
        return { osFertigationList: action.payload };
        default:
        return state;
    }
}