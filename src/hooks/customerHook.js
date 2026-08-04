import { useState, useEffect, useCallback } from "react"

export const useCustomerHook = () =>{
    const[loading, setLoadin] = useState(false);
    const[error, setError] = useState(null);
    
}