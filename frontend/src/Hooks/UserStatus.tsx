import { useState } from "react";

export function useLoginStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return [isLoggedIn, setIsLoggedIn];
}