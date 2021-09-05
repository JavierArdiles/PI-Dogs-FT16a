import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from "../actions";

export default function Home(){
    const dispatch = useDispatch(); // para usar esa constante para ir despachando mis acciones.
    const allDogs = useSelector((state) => state.dogs);
    
}
