import { useState, useEffect } from 'react';
import statePilotSingleton from "../../statepilot/StatePilotInstance";

function useBlogEntries() {
    const [blogEntries, setBlogEntries] = useState([]);

    useEffect(() => {
        const statePilotInstance = statePilotSingleton.instance();
        const unsubscribe = statePilotInstance.subscribe("blogStore", ({ actionData }) =>
            setBlogEntries([...actionData])
        );
        return () => unsubscribe();
    }, []);

    return blogEntries;
}

export default useBlogEntries;