
import { useReducer } from "react";
import { HeaderState, osHeaderReducer } from "./header";
import { FertigationState, osFertigationReducer } from "./fertigation";



export function useHomeReducers(){
    const [ headerState, headerDispatch ] = useReducer(osHeaderReducer, { osHeaderList: [] } as HeaderState)
    const [ fertigationState, fertigationDispatch ] = useReducer(osFertigationReducer, { osFertigationList: [] } as FertigationState)
    
    return {
        headerState,
        headerDispatch,
        fertigationState,
        fertigationDispatch
    }
}