import React from "react";
import {IAppState} from "../model/IAppState";

export const AppContext = React.createContext<IAppState>({
    loaded: false,
    ingredients: [],
    selectedParts:[]
});