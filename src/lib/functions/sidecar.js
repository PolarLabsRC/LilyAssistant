export const ask = async (prompt, /** @type {string} */ conversationId) => {
    const data = { prompt, conversationId };
    try {
        const response = await fetch('http://localhost:1111/chat/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Sidecar is not available');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};


export const newChat = async (/** @type {string} */ apiKey) => {
    try {
        const data = {apiKey}
        const response = await fetch('http://localhost:1111/chat/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Sidecar is not available');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};
