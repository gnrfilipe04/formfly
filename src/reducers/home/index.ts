
import { useReducer } from "react";
import { HeaderState, osHeaderReducer } from "./header";
import { FertigationState, osFertigationReducer } from "./fertigation";
import { useFertigationOSStore } from "@/src/store/useFertigationOSStore";

export function useHomeReducers(){
    const fertigationStore = useFertigationOSStore()
    
    return {
        fertigationStore
    }
}