import { useState } from "react";

export function useSignInStatus() {
    const [isSignedIn, setIsSignedIn] = useState(false)

    return [isSignedIn, setIsSignedIn];
}